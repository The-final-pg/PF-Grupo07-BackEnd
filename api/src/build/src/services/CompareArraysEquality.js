"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareArrays = void 0;
function compareArrays(array1, array2) {
    if (array1.length != array2.length)
        return false;
    if (JSON.stringify(array1.sort()) !== JSON.stringify(array2.sort()))
        return false;
    return true;
}
exports.compareArrays = compareArrays;
