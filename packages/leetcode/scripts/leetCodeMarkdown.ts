import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '2460. 对数组执行操作',
    url: 'https://leetcode.cn/problems/apply-operations-to-an-array/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个下标从 0 开始的数组 nums ，数组大小为 n ，且由 非负 整数组成。返回结果数组。`,
    solutions: [
        {
            script: Script.TS,
            time: 0,
            memory: 8.6,
            desc: '遍历',
            code: `class Solution {
public:
    vector<int> applyOperations(vector<int>& nums) {
        int n = nums.size(), start = 0;
        for (int i = 0; i < n - 1; i++) {
            if (nums[i] == nums[i + 1]) {
                nums[i] *= 2;
                nums[i + 1] = 0;
            }
            if (nums[i] != 0) nums[start++] = nums[i];
        }
        if (nums[n - 1]) nums[start++] = nums[n - 1];
        while (start < n) nums[start++] = 0;
        return nums;
    }
};`,
        },
        // {
        //     script: Script.CPP,
        //     time: 4,
        //     memory: 7.9,
        //     desc: '按字符统计数据',
        //     code: ``,
        // },
        // {
        //     script: Script.PY3,
        //     time: 100,
        //     memory: 18.1,
        //     desc: '同上',
        //     code: ``,
        // },
        //         {
        //             script: Script.RUST,
        //             time: 0,
        //             memory: 2.3,
        //             desc: '同上',
        //             code: ``,
        //         },
    ],
};

export default leetCodeMarkdown;
