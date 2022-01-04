export class UnionFind {
  elements: number[];
  constructor(public size: number) {
    this.elements = new Array(size).fill(0).map((_, i) => i);
  }
  same(v1: number, v2: number): boolean {
    return this.find(v1) === this.find(v2);
  }
  find(v: number): number {
    return v === this.elements[v] ? v : (this.elements[v] = this.find(this.elements[v]));
  }
  union(v1: number, v2: number): void {
    const e1 = this.find(v1);
    const e2 = this.find(v2);
    if (e1 !== e2) {
      this.elements[e1] = e2;
      this.size--;
    }
  }
}
