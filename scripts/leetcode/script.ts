/**
 * 
 * @param src 
 * @param dist 
 * 
 * d : 当前是第几步
 * k : x - y的值
 */
function Myers(src: string, dist: string) {
  const n = src.length + dist.length;
  const trace = new Map<number, Map<number, number>>();
  for (let d = 0; d <= n; d++) {
    const v = new Map<number, number>();
    trace.set(d, v);
    for (let k = -d; k <= d; k += 2) {
      const down = k === -d || k !== d && v.get(k + 1)!
    }
  }
}
