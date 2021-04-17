function removeDuplicates(nums: number[]): number {
  const len = nums.length;
  if (len === 0 || len === 1) return len;
  let slow = 0;
  let fast = 1;
  while (fast < len) {
    if (nums[slow] !== nums[fast]) nums[++slow] = nums[fast];
    fast++;
  }
  return slow + 1;
}
const arr = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
console.log(removeDuplicates(arr));
console.log(arr);
