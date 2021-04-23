function largestDivisibleSubset(nums: number[]): number[] {
  nums.sort((a, b) => a - b);
  const len = nums.length;
  let maxSize = 1;
  let maxVal = nums[0];
  const dp = new Array(len).fill(1);
  for (let i = 1; i < len; i++) {
    const num = nums[i];
    for (let j = 0; j < i; j++) {
      if (num % nums[j] === 0) dp[i] = Math.max(dp[i], dp[j] + 1);
    }
    if (dp[i] > maxSize) {
      maxSize = dp[i];
      maxVal = num;
    }
  }
  const ans: number[] = [];
  for (let i = len - 1; i >= 0; i--) {
    const num = nums[i];
    if (dp[i] === maxSize && maxVal % num === 0) {
      ans.unshift(num);
      maxSize--;
      maxVal = num;
    }
  }
  return ans;
}
console.log(largestDivisibleSubset([1]));
