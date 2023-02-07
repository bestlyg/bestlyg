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

import { TreeNode } from '@/structures';

function makeStringsEqual(s: string, target: string): boolean {
  const n = s.length;
  const set = new Set([s]);
  const q = [s];
  while (q.length) {
    const s = q.shift()!;
    if (s === target) return true;
    // console.log('========\n', s);
    for (let i = 0; i < n; i++) {
      const inum = +s[i];
      for (let j = i + 1; j < n; j++) {
        if (i === j) continue;
        const jnum = +s[j];
        let next =
          s.substring(0, i) +
          (inum | jnum) +
          s.substring(i + 1, j) +
          (inum ^ jnum) +
          s.substring(j + 1);
        if (!set.has(next)) {
          set.add(next);
          q.push(next);
        }
        next =
          s.substring(0, i) +
          (inum ^ jnum) +
          s.substring(i + 1, j) +
          (inum | jnum) +
          s.substring(j + 1);
        if (!set.has(next)) {
          set.add(next);
          q.push(next);
        }
      }
    }
  }
  return false;
}

function evaluateTree(root: TreeNode | null): boolean {
  function loop(root: TreeNode | null): boolean {
    if (!root) return true;
    if (!root.left) {
      return root.val === 1;
    }
    if (root.val == 2) return loop(root.left) || loop(root.right);
    else return loop(root.left) && loop(root.right);
  }
  return loop(root);
}
