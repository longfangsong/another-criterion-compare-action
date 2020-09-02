import * as GitHub from "@actions/github";
import * as Core from "@actions/core";
import * as Exec from "@actions/exec";
import * as fs from "fs";
import * as path from "path";

const context = GitHub.context;

interface BenchRecordFile {
    name: string,
    time: number,
}

const UNIT = ['ns', 'µs', 'ms', 's'];

function timeString(f: BenchRecordFile): string {
    let value = f.time;
    let unit = 0;
    while (unit < 3 && value >= 1000) {
        value /= 1000;
        unit += 1;
    }
    return value.toFixed(2) + UNIT[unit];
}

function diff(from: number, to: number): string {
    let result = (to - from) / from * 100;
    if (result > 0) return `+${result}%`;
    else return `${result}%`;
}

// code altered from https://gist.github.com/lovasoa/8691344
async function* find_bench(p: string) {
    for await (const entry of await fs.promises.opendir(p)) {
        if (entry.name == "master") {
            yield p;
        } else if (entry.isDirectory()) {
            yield* find_bench(path.join(p, entry.name));
        }
    }
}

function loadBenchRecordFile(p: string): BenchRecordFile {
    const meta = JSON.parse(fs.readFileSync(path.join(p, "benchmark.json"), 'utf8'));
    const result = JSON.parse(fs.readFileSync(path.join(p, "estimates.json"), 'utf-8'));
    return {
        name: meta.full_id,
        time: result.mean.point_estimate
    };
}

async function getRecords(): Promise<[Array<BenchRecordFile>, Array<BenchRecordFile>]> {
    let master = [];
    let change = [];

    for await (const dir of await find_bench("./target")) {
        master.push(loadBenchRecordFile(path.join(dir, "master")));
        change.push(loadBenchRecordFile(path.join(dir, "change")));
    }

    master.sort((a, b) => {
        if (a.name < b.name) return -1;
        else if (a.name > b.name) return 1;
        return 0;
    });

    change.sort((a, b) => {
        if (a.name < b.name) return -1;
        else if (a.name > b.name) return 1;
        return 0;
    });

    return [master, change];
}

function format(records: [Array<BenchRecordFile>, Array<BenchRecordFile>]): string {
    let result = "| name | master | current | regression |\n" +
        "| ---- | ------ | ------- | ---------- |\n";
    for (let i = 0; i < records[0].length; ++i) {
        result += `| ${records[0][i].name} | ${timeString(records[0][i])} | ${timeString(records[1][i])} | ${diff(records[0][i].time, records[1][i].time)} |\n`;
    }
    return result;
}

async function main() {
    await Exec.exec("cargo", ["bench", "--", "--save-baseline", "change"]);
    await Exec.exec("git", ["fetch", "origin", "master"]);
    await Exec.exec("git", ["checkout", "master"]);
    await Exec.exec("cargo", ["bench", "--", "--save-baseline", "master"]);
    const myToken = Core.getInput("token", {required: true});
    let octokit = GitHub.getOctokit(myToken);
    const contextObj = {...context.issue};

    await octokit.issues.createComment({
        owner: contextObj.owner,
        repo: contextObj.repo,
        issue_number: contextObj.number,
        body: format(await getRecords()),
    });
}

(async () => {
    try {
        await main();
    } catch (e) {
        console.error(e.stack);
        Core.setFailed(`Unhanded error:\n${e}`);
    }
})();