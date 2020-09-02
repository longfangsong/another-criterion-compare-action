"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __asyncDelegator = (this && this.__asyncDelegator) || function (o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
};
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
exports.__esModule = true;
var GitHub = require("@actions/github");
var Core = require("@actions/core");
var Exec = require("@actions/exec");
var fs = require("fs");
var path = require("path");
var context = GitHub.context;
var UNIT = ['ns', 'µs', 'ms', 's'];
function timeString(f) {
    var value = f.time;
    var unit = 0;
    while (unit < 3 && value >= 1000) {
        value /= 1000;
        unit += 1;
    }
    return value.toFixed(2) + UNIT[unit];
}
function diff(from, to) {
    var result = (to - from) / from * 100;
    if (result > 0)
        return "+" + result + "%";
    else
        return result + "%";
}
// code altered from https://gist.github.com/lovasoa/8691344
function find_bench(p) {
    return __asyncGenerator(this, arguments, function find_bench_1() {
        var _a, _b, entry, e_1_1;
        var e_1, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 11, 12, 17]);
                    return [4 /*yield*/, __await(fs.promises.opendir(p))];
                case 1:
                    _a = __asyncValues.apply(void 0, [_d.sent()]);
                    _d.label = 2;
                case 2: return [4 /*yield*/, __await(_a.next())];
                case 3:
                    if (!(_b = _d.sent(), !_b.done)) return [3 /*break*/, 10];
                    entry = _b.value;
                    if (!(entry.name == "master")) return [3 /*break*/, 6];
                    return [4 /*yield*/, __await(p)];
                case 4: return [4 /*yield*/, _d.sent()];
                case 5:
                    _d.sent();
                    return [3 /*break*/, 9];
                case 6:
                    if (!entry.isDirectory()) return [3 /*break*/, 9];
                    return [5 /*yield**/, __values(__asyncDelegator(__asyncValues(find_bench(path.join(p, entry.name)))))];
                case 7: return [4 /*yield*/, __await.apply(void 0, [_d.sent()])];
                case 8:
                    _d.sent();
                    _d.label = 9;
                case 9: return [3 /*break*/, 2];
                case 10: return [3 /*break*/, 17];
                case 11:
                    e_1_1 = _d.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 17];
                case 12:
                    _d.trys.push([12, , 15, 16]);
                    if (!(_b && !_b.done && (_c = _a["return"]))) return [3 /*break*/, 14];
                    return [4 /*yield*/, __await(_c.call(_a))];
                case 13:
                    _d.sent();
                    _d.label = 14;
                case 14: return [3 /*break*/, 16];
                case 15:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 16: return [7 /*endfinally*/];
                case 17: return [2 /*return*/];
            }
        });
    });
}
function loadBenchRecordFile(p) {
    var meta = JSON.parse(fs.readFileSync(path.join(p, "benchmark.json"), 'utf8'));
    var result = JSON.parse(fs.readFileSync(path.join(p, "estimates.json"), 'utf-8'));
    return {
        name: meta.full_id,
        time: result.mean.point_estimate
    };
}
function getRecords() {
    var e_2, _a;
    return __awaiter(this, void 0, void 0, function () {
        var master, change, _b, _c, dir, e_2_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    master = [];
                    change = [];
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 7, 8, 13]);
                    return [4 /*yield*/, find_bench("./target")];
                case 2:
                    _b = __asyncValues.apply(void 0, [_d.sent()]);
                    _d.label = 3;
                case 3: return [4 /*yield*/, _b.next()];
                case 4:
                    if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 6];
                    dir = _c.value;
                    master.push(loadBenchRecordFile(path.join(dir, "master")));
                    change.push(loadBenchRecordFile(path.join(dir, "change")));
                    _d.label = 5;
                case 5: return [3 /*break*/, 3];
                case 6: return [3 /*break*/, 13];
                case 7:
                    e_2_1 = _d.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 13];
                case 8:
                    _d.trys.push([8, , 11, 12]);
                    if (!(_c && !_c.done && (_a = _b["return"]))) return [3 /*break*/, 10];
                    return [4 /*yield*/, _a.call(_b)];
                case 9:
                    _d.sent();
                    _d.label = 10;
                case 10: return [3 /*break*/, 12];
                case 11:
                    if (e_2) throw e_2.error;
                    return [7 /*endfinally*/];
                case 12: return [7 /*endfinally*/];
                case 13:
                    master.sort(function (a, b) {
                        if (a.name < b.name)
                            return -1;
                        else if (a.name > b.name)
                            return 1;
                        return 0;
                    });
                    change.sort(function (a, b) {
                        if (a.name < b.name)
                            return -1;
                        else if (a.name > b.name)
                            return 1;
                        return 0;
                    });
                    return [2 /*return*/, [master, change]];
            }
        });
    });
}
function format(records) {
    var result = "| name | master | current | regression |\n" +
        "| ---- | ------ | ------- | ---------- |\n";
    for (var i = 0; i < records[0].length; ++i) {
        result += "| " + records[0][i].name + " | " + timeString(records[0][i]) + " | " + timeString(records[1][i]) + " | " + diff(records[0][i].time, records[1][i].time) + " |\n";
    }
    return result;
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var myToken, octokit, contextObj, _a, _b, _c;
        var _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0: return [4 /*yield*/, Exec.exec("cargo", ["bench", "--", "--save-baseline", "change"])];
                case 1:
                    _e.sent();
                    return [4 /*yield*/, Exec.exec("git", ["fetch", "origin", "master"])];
                case 2:
                    _e.sent();
                    return [4 /*yield*/, Exec.exec("git", ["checkout", "master"])];
                case 3:
                    _e.sent();
                    return [4 /*yield*/, Exec.exec("cargo", ["bench", "--", "--save-baseline", "master"])];
                case 4:
                    _e.sent();
                    myToken = Core.getInput("token", { required: true });
                    octokit = GitHub.getOctokit(myToken);
                    contextObj = __assign({}, context.issue);
                    _b = (_a = octokit.issues).createComment;
                    _d = {
                        owner: contextObj.owner,
                        repo: contextObj.repo,
                        issue_number: contextObj.number
                    };
                    _c = format;
                    return [4 /*yield*/, getRecords()];
                case 5: return [4 /*yield*/, _b.apply(_a, [(_d.body = _c.apply(void 0, [_e.sent()]),
                            _d)])];
                case 6:
                    _e.sent();
                    return [2 /*return*/];
            }
        });
    });
}
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, main()];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                e_3 = _a.sent();
                console.error(e_3.stack);
                Core.setFailed("Unhanded error:\n" + e_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); })();
