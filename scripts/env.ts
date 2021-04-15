function rob(nums: number[]): number {
  const size = nums.length;
  if (size === 1) return nums[0];
  let max = 0;
  const dp: number[][] = new Array(size).fill(0).map(_ => new Array(2));
  const traversal = () => {
    for (let i = 1; i < size; i++) {
      dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1]);
      dp[i][1] = dp[i - 1][0] + nums[i];
    }
  };
  // 第一个不偷
  dp[0][0] = 0;
  dp[0][1] = 0;
  traversal();
  max = Math.max(dp[size - 1][0], dp[size - 1][1]);
  // 第一个偷
  dp[0][1] = nums[0];
  traversal();
  max = Math.max(max, dp[size - 1][0]);
  return max;
}
