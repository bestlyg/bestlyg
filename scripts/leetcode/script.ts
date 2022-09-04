// class TicTacToe {
//   arr: number[][];
//   constructor(public n: number) {
//     this.arr = new Array(n).fill(0).map(_ => new Array(n).fill(0));
//   }
//   move(row: number, col: number, player: number): number {
//     this.arr[row][col] = player;
//     return this.check(row, col);
//   }
//   check(row: number, col: number): number {
//     const player = this.arr[row][col];
//     let check1 = true;
//     let check2 = true;
//     for (let i = 0; i < this.n; i++) {
//       if (this.arr[i][col] !== player) check1 = false;
//       if (this.arr[row][i] !== player) check2 = false;
//     }
//     console.log(check1, check2, this.checkX1(row, col) === 1, this.checkX2(row, col) === 1);
//     if (check1 || check2 || this.checkX1(row, col) === 1 || this.checkX2(row, col) === 1) return 1;
//     return 0;
//   }
//   checkX1(row: number, col: number) {
//     const player = this.arr[row][col];
//     let nrow = 0;
//     let ncol = 0;
//     for (; nrow < this.n && ncol < this.n && this.arr[nrow][ncol] === player; nrow++, col++) {}
//     return nrow === this.n && ncol === this.n ? 1 : 0;
//   }
//   checkX2(row: number, col: number) {
//     const player = this.arr[row][col];
//     let nrow = 0;
//     let ncol = this.n - 1;
//     for (; nrow < this.n && ncol >= 0 && this.arr[nrow][ncol] === player; nrow++, col++) {}
//     return nrow === this.n && ncol === -1 ? 1 : 0;
//   }
// }
// const obj = new TicTacToe(3);
// console.log(obj.move(0, 0, 1));

function findMissingRanges(nums: number[], lower: number, upper: number): string[] {
  if (nums.length === 0) return [];
  const ans: string[] = [];
  if (nums[0] !== lower) {
    if (nums[0] - 1 === lower) ans.push(`${lower}`);
    else ans.push(`${lower}->${nums[0] - 1}`);
  }
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] - 1 === nums[i - 1]) continue;
    add(nums[i - 1], nums[i]);
  }
  if (nums[nums.length - 1] !== upper) {
    if (nums[nums.length - 1] + 1 === lower) ans.push(`${upper}`);
    else ans.push(`${nums[nums.length - 1] + 1}->${upper}`);
  }
  return ans;
  function add(before: number, after: number) {
    if (before + 1 === after - 1) ans.push(`${before + 1}`);
    else ans.push(`${before + 1}->${after - 1}`);
  }
}
