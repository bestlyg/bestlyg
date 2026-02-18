function check(s: string) {
    for (let i = 0; i < s.length / 2; i++) {
        if (s[i] !== s[s.length - 1 - i]) return false;
    }
    return true;
}
function kMirror(k: number): number[] {
    const arr: number[] = [];
    for (let num = 1; arr.length < 30; num++) {
        if (check(num.toString()) && check(num.toString(k))) {
            arr.push(num);
        }
    }
    return arr;
}

const arr: any[] = [];
for (let k = 2; k <= 9; k++) {
    const res = kMirror(k);
    arr.push(res);
    console.log(res);
}
console.log(JSON.stringify(arr));
/**
 [
          1,         3,        5,         7,
          9,        33,       99,       313,
        585,       717,     7447,      9009,
      15351,     32223,    39993,     53235,
      53835,     73737,   585585,   1758571,
    1934391,   1979791,  3129213,   5071705,
    5259525,   5841485, 13500531, 719848917,
  910373019, 939474939
]
[
         1,        2,       4,       8,
       121,      151,     212,     242,
       484,      656,     757,   29092,
     48884,    74647,   75457,   76267,
     92929,    93739,  848848, 1521251,
   2985892,  4022204, 4219124, 4251524,
   4287824,  5737375, 7875787, 7949497,
  27711772, 83155138
]
 */
