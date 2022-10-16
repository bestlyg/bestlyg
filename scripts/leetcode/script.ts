function countSubarrays(nums: number[], minK: number, maxK: number): number {
  const n = nums.length;
  const emptyList: number[] = [];
  for (let i = 0; i < n; i++) {
    if (nums[i] < minK || nums[i] > maxK) emptyList.push(i);
  }
  if (emptyList.length === 0) return check(0, n - 1);
  let ans = check(0, emptyList[0] - 1) + check(emptyList[emptyList.length - 1] + 1, n - 1);
  for (let i = 1; i < emptyList.length; i++) ans += check(emptyList[i - 1] + 1, emptyList[i] - 1);
  return ans;
  function check(l: number, r: number): number {
    if (l > r) return 0;
    const minList :number[]=[]
    const maxList :number[]=[]
    for (let i = l;i <= r;i++) {
        if (minK === nums[i]) minList++;
    }
    return ans;
  }
}

console.log(
  countSubarrays(
    [
      35054, 398719, 945315, 945315, 820417, 945315, 35054, 945315, 171832, 945315, 35054, 109750,
      790964, 441974, 552913,
    ],
    35054,
    945315
  )
);
console.log(countSubarrays([1, 3, 5, 2, 7, 5], 1, 5));
console.log(countSubarrays([1, 1, 1, 1], 1, 1));
