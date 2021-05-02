class UnionFind {
  constructor(size) {
    this.els = new Array(size).fill(0).map((_, i) => i);
  }
  find(i) {
    return this.els[i] === i ? i : (this.els[i] = this.find(this.els[i]));
  }
  union(i1, i2) {
    this.els[this.find(i1)] = this.find(i2);
  }
}
process.stdin.on('data', metaData => {
  const data = metaData
    .toString()
    .split('\n')
    .map(v => v.split(' ').map(v => +v));
  const [peopleCount, opCount] = data.shift();
  const uf = new UnionFind(peopleCount);
  for (let i = 0; i < opCount; i++) {
    const [op, p1, p2] = data[i];
    if (op === 1) {
      uf.union(p1 - 1, p2 - 1);
    }
    if (op === 2) {
      console.log(uf.find(p1 - 1) === uf.find(p2 - 1) ? 'Yes' : 'No');
    }
  }
});

const data = metaData
  .toString()
  .split('\n')
  .map(v => v.split(' ').map(v => +v));
const [peopleCount, opCount] = data.shift();
const uf = new UnionFind(peopleCount);
for (let i = 0; i < opCount; i++) {
  const [op, p1, p2] = data[i];
  if (op === 1) {
    uf.union(p1 - 1, p2 - 1);
  }
  if (op === 2) {
    console.log(uf.find(p1 - 1) === uf.find(p2 - 1) ? 'Yes' : 'No');
  }
}
