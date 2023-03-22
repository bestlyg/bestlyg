import { Compute24, EPSILON, permutation, operation } from './utils';

export const compute24: Compute24 = (nums, ops, target): string[] => {
  const res: string[] = [];
  const lnums = permutation({ list: nums, same: false, pickSize: nums.length });
  const lops = permutation({ list: ops, same: true, pickSize: nums.length - 1 });
  for (const nums of lnums) {
    for (const ops of lops) {
      // console.log(`nums=${nums},ops=${ops},res=${compute(nums.slice(), ops.slice())}`)
      if (Math.abs(target - compute(nums.slice(), ops.slice())) <= EPSILON)
        res.push(stringify(nums, ops));
    }
  }
  return res;
};
function stringify(nums: Parameters<Compute24>['0'], ops: Parameters<Compute24>['1']): string {
  return nums.join(' ') + ' ' + ops.reverse().join(' ');
}
function compute(nums: Parameters<Compute24>['0'], ops: Parameters<Compute24>['1']): number {
  if (nums.length === 1) return nums[0];
  nums.push(operation(nums.pop()!, nums.pop()!, ops.pop()!));
  return compute(nums, ops);
}
