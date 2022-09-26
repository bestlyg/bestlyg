class NNode {
  next = new Set<NNode>();
  constructor(public v: number, public idx: number) {}
}
function numberOfGoodPaths(vals: number[], edges: number[][]): number {
  const n = vals.length;
  const map: Record<number, number> = {};
  for (const v of vals) map[v] = (map[v] ?? 0) + 1;
  const nodes = new Array(n).fill(0).map((_, i) => new NNode(vals[i], i));
  for (const [a, b] of edges) {
    const node1 = nodes[a];
    const node2 = nodes[b];
    node1.next.add(node2);
    node2.next.add(node1);
  }
  const linkSet = new Set<NNode>();
  const set = new Set<string>();
  const cntList = new Array(n).fill(0);
  for (const node of nodes) {
    if (map[node.v] === 1) continue;
    linkSet.add(node);
    for (const next of node.next) {
      if (next.v <= node.v) {
        dfs(next, [node]);
      }
    }
    linkSet.delete(node);
  }
  return set.size / 2 + n;
  function dfs(node: NNode, list: NNode[]) {
    if (node.v === list[0].v) {
      const format1 = list[0].idx + ',' + node.idx;
      const format2 = node.idx + ',' + list[0].idx;
      set.add(format1);
      set.add(format2);
      cntList[list[0].idx]++;
      cntList[node.idx]++;
    }
    for (const item of node.next) {
      if (item.v > list[0].v || linkSet.has(item) || cntList[item.idx] === 2) continue;
      linkSet.add(item);
      list.push(item);
      dfs(item, list);
      list.pop();
      linkSet.delete(item);
    }
  }
}
