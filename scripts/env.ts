function containsNearbyAlmostDuplicate(nums: number[], k: number, t: number): boolean {
  if (k === 0) return false;
  const map = new Map<number, number[]>();
  for (let i = 0, len = nums.length; i < len; i++) {
    const num = nums[i];
    let arr = map.get(num);
    if (!arr) map.set(num, (arr = []));
    arr.push(i);
  }
  const data = [...map.entries()].sort(([num1], [num2]) => num1 - num2);
  const check = (arr1: number[], arr2: number[]) =>
    (arr1[arr1.length] < arr2[0] && Math.abs(arr1[arr1.length] - arr2[0]) <= k) ||
    (arr2[arr2.length] < arr1[0] && Math.abs(arr2[arr2.length] - arr1[0]) <= k) ||
    arr1.some(i1 => arr2.some(i2 => Math.abs(i1 - i2) <= k));
  for (let i = 0, l = data.length; i < l; i++) {
    const arr1 = data[i][1];
    if (arr1.some((v, i, arr) => (i === 0 ? false : v - arr[i - 1] <= k))) return true;
    let index = i - 1;
    while (index >= 0 && data[i][0] - data[index][0] <= t)
      if (check(arr1, data[index--][1])) return true;
  }
  return false;
}
