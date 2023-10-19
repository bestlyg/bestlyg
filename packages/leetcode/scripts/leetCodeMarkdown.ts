import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1726. 同积元组',
    url: 'https://leetcode.cn/problems/tuple-with-same-product',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个由 不同 正整数组成的数组 nums ，请你返回满足 a * b = c * d 的元组 (a, b, c, d) 的数量。其中 a、b、c 和 d 都是 nums 中的元素，且 a != b != c != d 。`,
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
        //     script: Script.CPP,
        //     time: 4,
        //     memory: 9.2,
        //     desc: '双指针',
        //     code: ``,
        // },
        {
            script: Script.PY,
            time: 716,
            memory: 43.15,
            desc: '遍历后计数',
            code: `class Solution:
    def tupleSameProduct(self, nums: List[int]) -> int:
        n = len(nums)
        map = Counter()
        for i in range(n):
            for j in range(i + 1, n):
                map[nums[i] * nums[j]] += 1
        return sum(v * (v - 1) * 4 for v in map.values())
`,
        },
        // {
        //     script: Script.RUST,
        //     time: 0,
        //     memory: 2.12,
        //     desc: '同上',
        //     code: ``,
        // },
    ],
};

export default leetCodeMarkdown;
