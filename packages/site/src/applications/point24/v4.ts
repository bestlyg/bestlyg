import { Compute24, EPSILON, permutation, operation } from './utils';

export const compute24: Compute24 = (nums, ops, target): string[] => {
    const n = nums.length;
    const dp = new Array(n)
        .fill(0)
        .map(_ => new Array(n).fill(0).map(_ => ({}) as Record<number, string[][]>));
    for (let i = 0; i < n; i++) {
        dp[i][i][nums[i]].push([]);
        for (let j = i - 1; j >= 0; j--) {}
    }
    return Object.values(dp[0][n - 1]).map(v => `[ ${v.join(' -> ')} ]`);
};
