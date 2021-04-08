# 剑指 Offer 11. 旋转数组的最小数字

> 链接：[剑指 Offer 11. 旋转数组的最小数字](https://leetcode-cn.com/problems/xuan-zhuan-shu-zu-de-zui-xiao-shu-zi-lcof/)  
> 难度：简单  
> 标签：二分查找  
> 简介：把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。输入一个递增排序的数组的一个旋转，输出旋转数组的最小元素。例如，数组  [3,4,5,1,2] 为 [1,2,3,4,5] 的一个旋转，该数组的最小值为 1。

## 题解 1 - typescript

- 编辑时间：2020.7.22
- 执行用时：76ms
- 内存消耗：37.9MB
- 编程语言：typescript
- 解法介绍：二分查找。

```typescript
function minArray(numbers: number[]): number {
  let last = numbers.length - 1;
  const firstNum = numbers[0];
  while (firstNum === numbers[last] && last !== 0) {
    numbers.pop();
    last--;
  }
  if (firstNum < numbers[last]) return firstNum;
  else if (last === 0) return firstNum;
  else return _find(0, last);
  function _find(l: number, r: number): number {
    // console.log(`[find],l=${l},r=${r}`);
    if (l === r) return numbers[l];
    const mid = (l + r) >> 1;
    const num = numbers[mid];
    return num >= firstNum ? _find(mid + 1, r) : _find(l, mid);
  }
}
```
