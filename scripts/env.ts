function removeElement(nums: number[], val: number): number {
  const len = nums.length;
  if (len === 0 || val > 50) return len;
  let left = 0;
  let right = len - 1;
  while (left < right)
    if (nums[left] === val) nums[left] = nums[right--];
    else left++;
  return left + +!(nums[right] === val);
}
