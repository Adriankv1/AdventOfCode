"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.countSafeReports = countSafeReports;
function isValidDifference(a, b) {
    var diff = Math.abs(a - b);
    return diff >= 1 && diff <= 3;
}
function isSafeReport(report) {
    if (report.length < 2)
        return true;
    var shouldBeIncreasing = null;
    for (var i = 0; i < report.length - 1; i++) {
        var current = report[i];
        var next = report[i + 1];
        if (!isValidDifference(current, next)) {
            return false;
        }
        if (shouldBeIncreasing === null) {
            shouldBeIncreasing = next > current;
            continue;
        }
        if (shouldBeIncreasing && next <= current) {
            return false;
        }
        if (!shouldBeIncreasing && next >= current) {
            return false;
        }
    }
    return true;
}
function isSafeWithDampener(report) {
    // First check if it's safe without removing any number
    if (isSafeReport(report)) {
        return true;
    }
    // Try removing each number one at a time
    for (var i = 0; i < report.length; i++) {
        var modifiedReport = __spreadArray(__spreadArray([], report.slice(0, i), true), report.slice(i + 1), true);
        if (isSafeReport(modifiedReport)) {
            return true;
        }
    }
    return false;
}
function countSafeReports(input) {
    // Split input into lines and parse each line into numbers
    var reports = input
        .trim()
        .split('\n')
        .map(function (line) { return line.trim(); })
        .filter(function (line) { return line.length > 0; })
        .map(function (line) { return line.split(' ').map(Number); });
    // Count safe reports including those that can be made safe with the dampener
    return reports.filter(isSafeWithDampener).length;
}
