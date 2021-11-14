/**
 * 树状数组
 */
export class FenwickTree {
  private list: number[];
  constructor(private n: number) {
    this.list = new Array(n + 1).fill(0);
  }
  /**
   * 修改下标所在元素的值
   * @param idx 下标
   * @param num 值
   */
  add(idx: number, num: number): void {
    while (idx <= this.n) {
      this.list[idx] += num;
      idx += this.lowbit(idx);
    }
  }
  /**
   * 获取下标所在元素的值
   * @param idx
   * @returns
   */
  at(idx: number): number {
    return this.query(idx) - this.query(idx - 1);
  }
  /**
   * 查询下标所在元素的前缀和
   * @param idx 下标
   * @returns
   */
  query(idx: number): number {
    let sum = 0;
    while (idx) {
      sum += this.list[idx];
      idx -= this.lowbit(idx);
    }
    return sum;
  }
  /**
   * 获取数据的最低位1
   * @param num 值
   * @returns
   */
  private lowbit(num: number) {
    return num & -num;
  }
}
