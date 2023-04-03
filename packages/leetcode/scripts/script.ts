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

function minReverseOperations(n: number, p: number, banned: number[], k: number): number[] {
  let res = new Array(n).fill(-1);
  res[p] = 0;
  if (k == 0 || k == 1) return res;

  const used = new Array(n).fill(false);
  used[p] = true;
  const banlist = new Array(n).fill(false);
  for (const i of banned) {
    banlist[i] = true;
  }
  const q: number[] = [];
  let size = 1;
  let cnt = 1;
  q.push(p);
  while (q.length) {
    const p = q.shift()!;
    for (let i = p; i + 1 - k <= p && i < n; i++) {
      if (i + 1 - k < 0) continue;
      let start = i + 1 - k,
        end = i,
        revp = end - start + 1 - 1 - (p - start) + start;
      if (banlist[revp] || used[revp]) continue;
      used[revp] = true;
      q.push(revp);
      res[revp] = cnt;
    }
    if (--size === 0) {
      cnt++;
      size = q.length;
    }
  }
  return res;
}
