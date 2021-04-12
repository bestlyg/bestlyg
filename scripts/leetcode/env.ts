function largestNumber(nums: number[]): string {
  const getCount = (num: number): number => {
    if (num === 0) return 1;
    let c = 0;
    while (num) {
      num = ~~(num / 10);
      c++;
    }
    return c;
  };
  nums.sort((num1, num2) => {
    const count1 = getCount(num1);
    const count2 = getCount(num2);
    const left = num1 * 10 ** count2 + num2;
    const right = num2 * 10 ** count1 + num1;
    return right - left;
  });
  return nums[0] === 0 ? '0' : nums.join('');
}
// console.log(largestNumber([10, 2]));
console.log(largestNumber([0, 9, 8, 7, 6, 5, 4, 3, 2, 1]));
// console.log(largestNumber([1]));
// console.log(largestNumber([10]));
