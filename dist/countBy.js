export default function countBy(arr) {
    return arr.reduce((acu, item) => {
        if (acu[item]) {
            acu[item] += 1;
        }
        else {
            acu[item] = 1;
        }
        return acu;
    }, {});
}
//# sourceMappingURL=countBy.js.map