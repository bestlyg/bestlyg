/**
 *
 * @param src
 * @param dist
 *
 * d : 当前是第几步
 * k : x - y的值
 * x + y == d, x - y == k
 */
// function myers(src: string, dist: string) {
//   const n = src.length + dist.length;
//   const trace: Record<number, Record<number, number>> = {};
//   let i = 0;
//   while (i < src.length && i < dist.length && src[i] == dist[i]) i++;
//   trace[0] = { 0: i };
//   const v: Record<number, number> = { 0: 1 };
//   loop: for (let d = 1; d <= n; d++) {
//     const v = new Map<number, number>();
//     trace[d] = {};
//     for (let k = -d; k <= d; k += 2) {
//       console.log(`=======\nd = ${d}, k = ${k}`);
//       const down = k === -d || (k !== d && v[k + 1] > v[k - 1]);
//       let x = down ? v[k + 1] : v[k - 1] + 1;
//       let y = x - k;
//       while (x < src.length && y < dist.length && src[x] === dist[y]) x++, y++;
//       v[k] = x;
//       trace[d][k] = x;
//       if (x === src.length && y === dist.length) console.log(`down = ${down}, x = ${x}, y = ${y}`);
//     }
//   }
//   console.log(trace);
// }
// const src = 'cbabc';
// const dist = 'abcabba';
// myers(src, dist);

type Fn = (...params: any) => any;

const EmptyResult = Symbol('EmptyResult');

class Trie {
  children = new Map<any, Trie>();
  result: any = EmptyResult;
  constructor(public val: any) {}
}

function memoize(fn: Fn): Fn {
  const root = new Trie(null);
  return function (...args: any[]) {
    let node = root;
    for (const arg of args) {
      let next = node.children.get(arg);
      if (!next) node.children.set(arg, (next = new Trie(arg)));
      node = next;
    }
    if (node.result !== EmptyResult) return node.result;
    return (node.result = fn(...args));
  };
}
