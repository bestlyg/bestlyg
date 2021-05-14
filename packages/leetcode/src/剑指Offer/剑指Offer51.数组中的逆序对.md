---
title: 剑指 Offer 51. 数组中的逆序对
order: NaN
nav:
  title: 力扣题解
  path: /leetcode
  order: 4
group:
  title: 剑指Offer
  path: /剑指Offer
  order: 200000
---

# 剑指 Offer 51. 数组中的逆序对
    
> 链接：[剑指 Offer 51. 数组中的逆序对](https://leetcode-cn.com/problems/shu-zu-zhong-de-ni-xu-dui-lcof/)  
> 难度：困难  
> 标签：  
> 简介：在数组中的两个数字，如果前面一个数字大于后面的数字，则这两个数字组成一个逆序对。输入一个数组，求出这个数组中的逆序对的总数。
      
## 题解 1 - typescript
- 编辑时间：2021.05.14
- 执行用时：160ms
- 内存消耗：50.7mb
- 编程语言：typescript
- 解法介绍：归并排序中途判断每个值的前部分的数量。
```typescript
function reversePairs(nums: number[]): number {
        const len = nums.length;
        if (len === 0) return 0;
        const mergeSort = (left: number, right: number): number => {
          if (left === right) return 0;
          const mid = (left + right) >> 1;
          let ans = mergeSort(left, mid) + mergeSort(mid + 1, right);
          const tempList = nums.slice(left, mid + 1);
          let p1 = 0;
          const end1 = mid - left;
          let p2 = mid + 1;
          let i = left;
          while (p1 <= end1) {
            if (p2 > right || tempList[p1] <= nums[p2]) {
              nums[i++] = tempList[p1++];
            } else {
              nums[i++] = nums[p2++];
              ans += end1 - p1 + 1;
            }
          }
          return ans;
        };
        return mergeSort(0, len - 1);
      }
```

      