import '@bestlyg/cli/globals';

const start = 1000;
const end = 1999;
let arr = [];
for (let i = start; i <= end; i++) {
    // console.log('=================', i.toString());
    const set = new Set();
    let ok = true;
    for (const c of i.toString()) {
        if (set.has(c)) {
            ok = false;
            break;
        }
        set.add(c);
    }
    if (ok) {
        arr.push(i);
    }
}

console.log(arr.length, arr);