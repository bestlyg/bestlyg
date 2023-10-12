import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2512. 奖励最顶尖的 K 名学生',
    url: 'https://leetcode.cn/problems/reward-top-k-students',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个整数 k ，请你返回按照得分 从高到低 最顶尖的 k 名学生。`,
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
        {
            script: Script.CPP,
            time: 4,
            memory: 9.2,
            desc: '双指针',
            code: `class Solution {
public:
    long long findTheArrayConcVal(vector<int>& nums) {
        long long i1 = 0, i2 = nums.size() - 1, res = 0;
        while (i1 < i2) {
            res += nums[i1] * pow(10, to_string(nums[i2]).size()) + nums[i2];
            i1 += 1;
            i2 -= 1;
        }
        if (i1 == i2) res += nums[i1];
        return res;
    }
};`,
        },
        {
            script: Script.PY,
            time: 56,
            memory: 15.47,
            desc: '同上',
            code: `class Solution:
    def findTheArrayConcVal(self, nums: List[int]) -> int:
        i1 = 0
        i2 = len(nums) - 1
        res = 0
        while i1 < i2:
            res += nums[i1] * 10 ** len(str(nums[i2])) + nums[i2]
            i1 += 1
            i2 -= 1
        if i1 == i2: res += nums[i1]
        return res`,
        },
        {
            script: Script.RUST,
            time: 0,
            memory: 2.12,
            desc: '同上',
            code: `impl Solution {
    pub fn find_the_array_conc_val(nums: Vec<i32>) -> i64 {
        let mut i1 = 0;
        let mut i2 = nums.len() - 1;
        let mut res = 0i64;
        while i1 < i2 {
            res += (nums[i1] as i64) * 10i64.pow(nums[i2].to_string().len() as u32)
                + (nums[i2] as i64);
            i1 += 1;
            i2 -= 1;
        }
        if i1 == i2 {
            res += nums[i1] as i64;
        }
        res
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
