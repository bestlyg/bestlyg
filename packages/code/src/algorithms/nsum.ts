class Data {
    map = new Map<number, number>();
    constructor(data: [number, number][] = []) {
        this.map = new Map(data);
    }
    clone() {
        const data = new Data();
        for (const [k, v] of this.map) {
            data.map.set(k, v);
        }
        return data;
    }
    merge(data: Data) {
        for (const [k, v] of data.map) {
            if (this.map.has(k)) continue;
            this.map.set(k, v);
        }
        return this;
    }
    log() {
        return Array.from(this.map.entries())
            .sort(([a], [b]) => a - b)
            .map(([num, cnt]) => `${num} * ${cnt}`)
            .join(' + ');
    }
}
function nsum(list: number[], target: number) {
    const map = new Map<number, Data[]>([[0, [new Data([[0, 0]])]]]);
    for (const num of list) {
        for (let i = 1; i * num <= target; i++) {
            const currNum = num * i;
            for (const [k, v] of map.entries()) {
                if (k + currNum > target) continue;
                for (const data of v) {
                    if (data.map.has(num)) continue;
                    let arr = map.get(k + currNum);
                    if (!arr) map.set(k + currNum, (arr = []));
                    arr.push(new Data([[num, i]]).merge(data));
                }
            }
            let arr = map.get(currNum);
            if (!arr) map.set(currNum, (arr = []));
            arr.push(new Data([[num, i]]));
        }
    }
    // console.log(`===LOG===`);
    // for (const [k, v] of Array.from(map.entries()).sort(([a], [b]) => a - b)) {
    //   for (const data of v) {
    //     if (data.map.has(0) && data.map.get(0)! === 0) continue;
    //     console.log(`${k.toString().padEnd(target.toString().length)} === ${data.log()}`);
    //   }
    // }
    console.log('===RES===');
    for (const data of (map.get(target) ?? []).filter(
        (data) => !(data.map.has(0) && data.map.get(0)! === 0),
    )) {
        console.log(`${target} === ${data.log()}`);
    }
}

const list = [29, 49, 59, 60, 69, 75, 80, 89, 90, 98, 99, 100, 119, 120, 124, 129, 134, 139];
const target = 262;
nsum(list, target);
