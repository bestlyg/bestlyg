function combinationSum4(nums: number[], target: number): number {
  nums.sort((a, b) => a - b);
  const dp = new Array(target + 1).fill(0);
  dp[0] = 1;
  for (let i = 1; i <= target; i++) {
    for (const num of nums) {
      if (i < num) break;
      dp[i] += dp[i - num];
    }
  }
  return dp[target];
}
