/** 并查集数据结构，用于高效判断元素连通性。 */
export class UnionFind {
  elements: number[]
  constructor(public size: number) {
    this.elements = new Array(size).fill(0).map((_, i) => i)
  }

  /** 判断两个元素是否属于同一集合。 */
  same(v1: number, v2: number): boolean {
    return this.find(v1) === this.find(v2)
  }

  /** 查找元素所在集合根节点，并进行路径压缩。 */
  find(v: number): number {
    return v === this.elements[v] ? v : (this.elements[v] = this.find(this.elements[v]))
  }

  /** 合并两个元素所在集合。 */
  union(v1: number, v2: number): void {
    const e1 = this.find(v1)
    const e2 = this.find(v2)
    if (e1 !== e2) {
      this.elements[e1] = e2
      this.size--
    }
  }
}
