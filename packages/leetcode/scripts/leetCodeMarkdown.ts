import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '307. 区域和检索 - 数组可修改',
    url: 'https://leetcode.cn/problems/range-sum-query-mutable',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个数组 nums ，请你完成两类查询。其中一类查询要求 更新 数组 nums 下标对应的值，另一类查询要求返回数组 nums 中索引 left 和索引 right 之间（ 包含 ）的nums元素的 和 ，其中 left <= right。`,
    solutions: [
        // {
        //     date: new Date('2020.04.26').getTime(),
        //     script: Script.JS,
        //     time: 384,
        //     memory: 44.78,
        //     desc: '归并排序',
        //     code: ``,
        // },
        // {
        //     date: new Date('2020.12.28').getTime(),
        //     script: Script.TS,
        //     time: 120,
        //     memory: 44.6,
        //     desc: 'dp',
        //     code: ``,
        // },
        // {
        //     date: new Date('2022.06.20').getTime(),
        //     script: Script.CPP,
        //     time: 200,
        //     memory: 66.95,
        //     desc: '有序集合',
        //     code: ``,
        // },
        {
            script: Script.PY,
            time: 1216,
            memory: 33.27,
            desc: '树状数组',
            code: `class FenwickTree:
    def __init__(self, n: int):
        self.n = n
        self.arr = [0] * (n + 1)

    def add(self, idx: int, num: int):
        while idx <= self.n:
            self.arr[idx] += num
            idx += self.lowbit(idx)
    
    def query(self, idx: int) -> int:
        sum = 0
        while idx > 0:
            sum += self.arr[idx]
            idx -= self.lowbit(idx)
        return sum
    
    def at(self, idx: int) -> int:
        return self.query(idx) - self.query(idx - 1)

    def range(self, left: int, right: int) -> int:
        return self.query(right) - self.query(left - 1)

    def lowbit(self, num: int) -> int:
        return num & -num

class NumArray:

    def __init__(self, nums: List[int]):
        self.tree = FenwickTree(len(nums))
        self.nums = nums
        for i, num in enumerate(nums): self.tree.add(i + 1, num)

    def update(self, index: int, val: int) -> None:
        self.tree.add(index + 1, val - self.nums[index])
        self.nums[index] = val

    def sumRange(self, left: int, right: int) -> int:
        return self.tree.range(left + 1, right + 1)`,
        },
        // {
        //     script: Script.RUST,
        //     time: 564,
        //     memory: 85,
        //     desc: '同上',
        //     code: ``,
        // },
    ],
};

export default leetCodeMarkdown;
