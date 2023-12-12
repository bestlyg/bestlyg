import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1631. 最小体力消耗路径',
    url: 'https://leetcode.cn/problems/path-with-minimum-effort/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `一条路径耗费的 体力值 是路径上相邻格子之间 高度差绝对值 的 最大值 决定的。请你返回从左上角走到右下角的最小 体力消耗值 。`,
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
        //     date: new Date('2021.01.29').getTime(),
        //     script: Script.TS,
        //     time: 352,
        //     memory: 46.7,
        //     desc: '二分',
        //     code: ``,
        // },

        {
            script: Script.PY,
            time: 260,
            memory: 29.27,
            desc: '两个单调栈',
            code: `class Solution:
    def secondGreaterElement(self, nums: List[int]) -> List[int]:
        s1, s2, s3 = [], [], []
        res = [-1] * len(nums)
        for i in range(len(nums)):
            while s2 and nums[s2[-1]] < nums[i]: res[s2.pop()] = nums[i]
            while s1 and nums[s1[-1]] < nums[i]: s3.append(s1.pop())
            while s3: s2.append(s3.pop())
            s1.append(i)
        return res`,
        },
        {
            script: Script.CPP,
            time: 120,
            memory: 89.23,
            desc: '同上',
            code: `class Solution {
public:
    vector<int> secondGreaterElement(vector<int>& nums) {
        vector<int> s1, s2, s3, res(nums.size(), -1);
        for (int i = 0; i < nums.size(); i++) {
            while (s2.size() && nums[s2.back()] < nums[i]) res[s2.back()] = nums[i], s2.pop_back();
            while (s1.size() && nums[s1.back()] < nums[i]) s3.push_back(s1.back()), s1.pop_back();
            while (s3.size()) s2.push_back(s3.back()), s3.pop_back();
            s1.push_back(i);
        }
        return res;
    }
};`,
        },
        {
            script: Script.RUST,
            time: 44,
            memory: 4.16,
            desc: '同上',
            code: `impl Solution {
    pub fn second_greater_element(nums: Vec<i32>) -> Vec<i32> {
        let mut s1 = vec![];
        let mut s2 = vec![];
        let mut s3 = vec![];
        let mut res = vec![-1; nums.len()];
        for i in 0..nums.len() {
            while !s2.is_empty() && nums[*s2.last().unwrap()] < nums[i] {
                res[s2.pop().unwrap()] = nums[i];
            }
            while !s1.is_empty() && nums[*s1.last().unwrap()] < nums[i] {
                s3.push(s1.pop().unwrap());
            }
            while !s3.is_empty() {
                s2.push(s3.pop().unwrap());
            }
            s1.push(i);
        }
        res
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
