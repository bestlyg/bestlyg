import { log } from '../utils';
import { HashMap, toHash } from '@bestlyg/data-structures/src';
import { sequence } from '@bestlyg/algorithms/src';
import {
  fill,
  find,
  first,
  merge,
  min,
  random,
  reverse,
  size,
  takeWhile,
  upperFirst,
} from 'lodash';
// type TrieNode = structures.TrieNode;
// type Trie = structures.Trie;

/*
6 abcw baz foo bar xtfn abcdef
 */
/*
function ex_gcd(
  a: number,
  b: number
): {
  ans: number;
  x: number;
  y: number;
} {
  if (b === 0) return { ans: a, x: 1, y: 0 };
  const res = ex_gcd(b, a % b);
  [res.x, res.y] = [res.y, res.x - Math.floor(a / b) * res.y];
  return res;
}
function phi(n: number) {
  let ans = n;
  for (let i = 2; i ** 2 < n; i++) {
    if (n % i === 0) ans = ans * (1 - 1 / i);
    while (n % i === 0) n /= i;
  }
  if (n !== 1) ans = ans * (1 - 1 / n);
  return ans;
}
function pow(x: bigint, y: bigint): bigint {
  let ans = 1n;
  while (y--) ans *= x;
  return ans;
}
function formual(a: number, b: number, c: number): string {
  const debug = (...args: any[]) => false && console.log(...args);
  const error = (str: string) => `ERROR : ${str}`;
  const { ans: gcd, x, y } = ex_gcd(a, b);
  if (gcd !== 1) return error('AB互质');
  if (c >= b) return error('c < b');
  debug(`phi(${b}) = ${phi(b)}`);
  debug(`gcd(${a}, ${b}) = gcd:${gcd}, x:${x}, y:${y}`);
  const formula2Str = (a: bigint, b: bigint, c: bigint, x: bigint) =>
    `${a} ^ ${x} mod ${b} === ${c}`;
  const a_big = BigInt(a);
  const b_big = BigInt(b);
  const c_big = BigInt(c);
  for (let x = 0n; x < phi(b); x++) {
    debug(formula2Str(a_big, b_big, pow(a_big, x) % b_big, x));
  }
  for (let x = 0n; x < phi(b); x++) {
    if (pow(a_big, x) % b_big === c_big) {
      return `${a} ^ ${x} mod ${b} === ${c}`;
    }
  }
  return error('NOT FOUND');
}
*/

/**

[]
[0,0]
[999999,999999]
[[0,1],[1,0]]
[0,0]
[0,2]
[[691938,300406],[710196,624190],[858790,609485],[268029,225806],[200010,188664],[132599,612099],[329444,633495],[196657,757958],[628509,883388]]
[655988,180910]
[267728,840949]
[[419893,55778],[273187,99758],[717892,450294],[708088,481024],[576581,281428],[673502,35618],[761127,941602],[440312,903165],[131489,887659],[519661,559196],[608811,675228],[425641,365937],[842754,531655],[316187,587598],[51561,991459],[238261,211117],[890595,369481],[771312,66857],[587706,917241],[914885,993538],[535163,832595],[883316,72605],[912184,621663],[480641,772098],[107524,375877],[358066,962396],[699514,573077],[116819,230013],[132087,677569],[449650,351319],[381660,571870],[807331,714948],[994573,242727],[351932,209342],[164084,113850],[567386,535080],[860094,341720],[990235,204291],[669917,386729],[685026,448826],[126212,108918],[631319,235095],[862574,388974],[617636,873035],[290456,331169],[178233,461994],[432643,537288],[957512,888044],[430899,473083]]
[803314,571961]
[69769,128238]
 */
const format = (row: number, col: number) => `${row}:${col}`;
const dirs: number[][] = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];
const MAX = 10 ** 6;
const MAX_CNT = 200 * 200;
function check(blocked: Set<string>, source: number[], target: number[]): boolean {
  const set = new Set<string>();
  const queue: number[][] = [[source[0], source[1]]];
  let cnt = MAX_CNT;
  while (queue.length) {
    const [row, col] = queue.shift()!;
    for (const [addrow, addcol] of dirs) {
      const nrow = row + addrow;
      const ncol = col + addcol;
      const str = format(nrow, ncol);
      if (nrow < 0 || nrow >= MAX || ncol < 0 || ncol >= MAX || blocked.has(str) || set.has(str))
        continue;
      if (--cnt == 0 || (nrow === target[0] && ncol === target[1])) return true;
      set.add(str);
      queue.push([nrow, ncol]);
    }
  }
  return false;
}
function isEscapePossible(blocked: number[][], source: number[], target: number[]): boolean {
  if (blocked.length <= 1) return true;
  const blocked_set = new Set(blocked.map(([row, col]) => format(row, col)));
  return check(blocked_set, source, target) && check(blocked_set, target, source);
}
log([
  isEscapePossible(
    [
      [0, 199],
      [1, 198],
      [2, 197],
      [3, 196],
      [4, 195],
      [5, 194],
      [6, 193],
      [7, 192],
      [8, 191],
      [9, 190],
      [10, 189],
      [11, 188],
      [12, 187],
      [13, 186],
      [14, 185],
      [15, 184],
      [16, 183],
      [17, 182],
      [18, 181],
      [19, 180],
      [20, 179],
      [21, 178],
      [22, 177],
      [23, 176],
      [24, 175],
      [25, 174],
      [26, 173],
      [27, 172],
      [28, 171],
      [29, 170],
      [30, 169],
      [31, 168],
      [32, 167],
      [33, 166],
      [34, 165],
      [35, 164],
      [36, 163],
      [37, 162],
      [38, 161],
      [39, 160],
      [40, 159],
      [41, 158],
      [42, 157],
      [43, 156],
      [44, 155],
      [45, 154],
      [46, 153],
      [47, 152],
      [48, 151],
      [49, 150],
      [50, 149],
      [51, 148],
      [52, 147],
      [53, 146],
      [54, 145],
      [55, 144],
      [56, 143],
      [57, 142],
      [58, 141],
      [59, 140],
      [60, 139],
      [61, 138],
      [62, 137],
      [63, 136],
      [64, 135],
      [65, 134],
      [66, 133],
      [67, 132],
      [68, 131],
      [69, 130],
      [70, 129],
      [71, 128],
      [72, 127],
      [73, 126],
      [74, 125],
      [75, 124],
      [76, 123],
      [77, 122],
      [78, 121],
      [79, 120],
      [80, 119],
      [81, 118],
      [82, 117],
      [83, 116],
      [84, 115],
      [85, 114],
      [86, 113],
      [87, 112],
      [88, 111],
      [89, 110],
      [90, 109],
      [91, 108],
      [92, 107],
      [93, 106],
      [94, 105],
      [95, 104],
      [96, 103],
      [97, 102],
      [98, 101],
      [99, 100],
      [100, 99],
      [101, 98],
      [102, 97],
      [103, 96],
      [104, 95],
      [105, 94],
      [106, 93],
      [107, 92],
      [108, 91],
      [109, 90],
      [110, 89],
      [111, 88],
      [112, 87],
      [113, 86],
      [114, 85],
      [115, 84],
      [116, 83],
      [117, 82],
      [118, 81],
      [119, 80],
      [120, 79],
      [121, 78],
      [122, 77],
      [123, 76],
      [124, 75],
      [125, 74],
      [126, 73],
      [127, 72],
      [128, 71],
      [129, 70],
      [130, 69],
      [131, 68],
      [132, 67],
      [133, 66],
      [134, 65],
      [135, 64],
      [136, 63],
      [137, 62],
      [138, 61],
      [139, 60],
      [140, 59],
      [141, 58],
      [142, 57],
      [143, 56],
      [144, 55],
      [145, 54],
      [146, 53],
      [147, 52],
      [148, 51],
      [149, 50],
      [150, 49],
      [151, 48],
      [152, 47],
      [153, 46],
      [154, 45],
      [155, 44],
      [156, 43],
      [157, 42],
      [158, 41],
      [159, 40],
      [160, 39],
      [161, 38],
      [162, 37],
      [163, 36],
      [164, 35],
      [165, 34],
      [166, 33],
      [167, 32],
      [168, 31],
      [169, 30],
      [170, 29],
      [171, 28],
      [172, 27],
      [173, 26],
      [174, 25],
      [175, 24],
      [176, 23],
      [177, 22],
      [178, 21],
      [179, 20],
      [180, 19],
      [181, 18],
      [182, 17],
      [183, 16],
      [184, 15],
      [185, 14],
      [186, 13],
      [187, 12],
      [188, 11],
      [189, 10],
      [190, 9],
      [191, 8],
      [192, 7],
      [193, 6],
      [194, 5],
      [195, 4],
      [196, 3],
      [197, 2],
      [198, 1],
      [199, 0],
    ],
    [0, 0],
    [200, 200]
  ),
]);
