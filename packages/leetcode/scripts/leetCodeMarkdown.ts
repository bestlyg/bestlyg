import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1749. 任意子数组和的绝对值的最大值',
    url: 'https://leetcode.cn/problems/maximum-absolute-sum-of-any-subarray',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你找出 nums 中 和的绝对值 最大的任意子数组（可能为空），并返回该 最大值 。`,
    solutions: [
        // {
        //     date: new Date('2020/10/06').getTime(),
        //     script: Script.JS,
        //     time: 224,
        //     memory: 54.2,
        //     desc: 'dfs',
        //     code: ``,
        // },
        {
            script: Script.CPP,
            time: 76,
            memory: 39.4,
            desc: '遍历,统计最大值和最小值',
            code: `class Solution {
public:
    int maxAbsoluteSum(vector<int>& nums) {
        int nmin = 0, nmax = 0, res = 0;
        for (auto &num : nums) {
            nmin = min(num, nmin + num);
            nmax = max(0, nmax + num);
            res = max(res, max(abs(nmin), abs(nmax)));
        }
        return res;
    }
};`,
        },
        {
            script: Script.PY,
            time: 212,
            memory: 26.04,
            desc: '同上',
            code: `class Solution:
    def maxAbsoluteSum(self, nums: List[int]) -> int:
        nmin = nmax = res = 0
        for num in nums:
            nmin, nmax = min(num, nmin + num), max(0, nmax + num)
            res = max(res, max(abs(nmin), abs(nmax)))
        return res`,
        },
        {
            script: Script.RUST,
            time: 8,
            memory: 3.01,
            desc: '同上',
            code: `impl Solution {
    pub fn max_absolute_sum(nums: Vec<i32>) -> i32 {
        let (mut nmin, mut nmax, mut res) = (0, 0, 0);
        for num in nums {
            nmin = num.min(nmin + num);
            nmax = 0.max(nmax + num);
            res = res.max(nmin.abs()).max(nmax.abs())
        }
        res
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
