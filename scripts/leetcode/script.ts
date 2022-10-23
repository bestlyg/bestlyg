class NNode {
  constructor(public idx: number, public num: number, public cost: number) {}
  getCost(num: number) {
    return Math.abs(num - this.num) * this.cost;
  }
}
function comp(list: NNode[], num: number) {
  return list.reduce((sum, cur) => sum + cur.getCost(num), 0);
}
function minCost(nums: number[], cost: number[]): number {
  const n = nums.length;
  let sum = nums.reduce((sum, cur) => sum + cur, 0);
  sum = Math.floor(sum / n);
  const list = new Array(n)
    .fill(0)
    .map((_, i) => new NNode(i, nums[i], cost[i]))
    .sort((a, b) => Math.abs(a.num) - Math.abs(b.num));
  // .sort((a, b) => Math.abs(a.num - sum) - Math.abs(b.num - sum));
  // console.log(sum);
  // for (let i = 0; i < n; i++) {
  //   let v = 0;
  //   for (let j = 0; j < n; j++) {
  //     v += list[j].getCost(list[i].num);
  //   }
  //   console.log(i, list[i], v);
  // }
  let l = 0;
  let lcost = comp(list, list[l].num);
  let r = n - 1;
  let rcost = comp(list, list[r].num);
  while (l < r - n / 4) {
    let m = (l + r) >> 1;
    let mcost = comp(list, list[m].num);
    // console.log('=====');
    // console.log(`l = ${l}, lcost = ${lcost}`);
    // console.log(`r = ${r}, rcost = ${rcost}`);
    // console.log(`m = ${m}, mcost = ${mcost}`);
    if (lcost > mcost && mcost > rcost) {
      l = m;
      lcost = mcost;
    } else if (lcost < mcost && mcost < rcost) {
      r = m;
      lcost = mcost;
    } else if (lcost > rcost) {
      [l, lcost, r, rcost] = [m, mcost, r, rcost];
    } else {
      [l, lcost, r, rcost] = [l, lcost, m, mcost];
    }
  }

  // console.log('==');
  // console.log(`l = ${l}, lcost = ${lcost}`);
  // console.log(`r = ${r}, rcost = ${rcost}`);
  let ans = Infinity;
  for (let i = l; i <= r; i++) {
    let v = 0;
    for (let j = 0; j < n; j++) {
      v += list[j].getCost(list[i].num);
    }
    ans = Math.min(ans, v);
  }
  // return Math.min(lcost, rcost);
  return ans;
}

// console.log(minCost([1, 3, 5, 2], [2, 3, 1, 14]));
// console.log(minCost([2, 2, 2, 2, 2], [4, 2, 8, 1, 3]));
// console.log(
//   minCost(
//     [
//       735103, 366367, 132236, 133334, 808160, 113001, 49051, 735598, 686615, 665317, 999793, 426087,
//       587000, 649989, 509946, 743518,
//     ],
//     [
//       724182, 447415, 723725, 902336, 600863, 287644, 13836, 665183, 448859, 917248, 397790, 898215,
//       790754, 320604, 468575, 825614,
//     ]
//   )
// );
console.log(
  minCost(
    [
      576257, 268115, 512826, 523563, 927189, 39253, 720661, 35147, 552624, 847824, 354489, 760949,
      734966, 571013,
    ],
    [
      842872, 273313, 503060, 139143, 367612, 217125, 271272, 407727, 199063, 120280, 819193,
      935689, 624116, 453146,
    ]
  )
);
// function makeSimilar(nums: number[], target: number[]): number {

// };
console.log(Number.MAX_SAFE_INTEGER);
