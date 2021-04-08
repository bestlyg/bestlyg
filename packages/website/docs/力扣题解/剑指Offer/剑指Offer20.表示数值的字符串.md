# 剑指 Offer 20. 表示数值的字符串

> 链接：[剑指 Offer 20. 表示数值的字符串](https://leetcode-cn.com/problems/predict-the-winner/)  
> 难度：中等  
> 标签：数学  
> 简介：请实现一个函数用来判断字符串是否表示数值（包括整数和小数）。

## 题解 1 - typescript

- 编辑时间：2020.9.2
- 执行用时：120ms
- 内存消耗：40.2mb
- 编程语言：typescript
- 解法介绍：直接利用正则判断。

```typescript
function isNumber(s: string): boolean {
  return /^[+-]?(\d+(\.\d*)?|(\.\d+))(e[+-]?\d+)?$/i.test(s.trim());
}
```
