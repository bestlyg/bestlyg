const list: number[][] = [[0]];
const n = 7;
for (let i = 1; i <= n; i++) {
  const cur: number[] = [];
  for (const num of list[i - 1]) {
    if (num == 0) cur.push(0, 1);
    else cur.push(1, 0);
  }
  list.push(cur);
}
for (let i = 0; i < list.length; i++) {
  console.log(`line = ${i + 1}, data = ${list[i].join('')}`);
}
