import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '2600. K 件物品的最大和',
    url: 'https://leetcode.cn/problems/sum-in-a-matrix/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个下标从 0 开始的二维整数数组 nums 。请你返回最后的 分数 。`,
    solutions: [
        //         {
        //             script: Script.TS,
        //             time: 156,
        //             memory: 69,
        //             desc: '对于每个是对象的value，进行dfs',
        //             code: `type Obj = Record<any, any>;

        // function compactObject(obj: Obj): Obj {
        //     const res: any = Array.isArray(obj) ? [] : {};
        //     for (const [k, v] of Object.entries(obj)) {
        //         if (Boolean(v)) {
        //             const newv = typeof v === 'object' ? compactObject(v) : v;
        //             if (Array.isArray(obj)) res.push(newv);
        //             else res[k] = newv;
        //         }
        //     }
        //     return res;
        // };`,
        // },
        {
            script: Script.CPP,
            time: 8,
            memory: 5.9,
            desc: '贪心',
            code: `class Solution {
public:
    int kItemsWithMaximumSum(int numOnes, int numZeros, int numNegOnes, int k) {
        int res = 0;
        if (k && numOnes) {
            res += min(k, numOnes);
            k -= min(k, numOnes);
        }
        if (k && numZeros) {
            k -= min(k, numZeros);
        }
        if (k && numNegOnes) {
            res -= min(k, numNegOnes);
            k -= min(k, numNegOnes);
        }
        return res;
    }
};`,
        },
//         {
//             script: Script.PY,
//             time: 132,
//             memory: 33.6,
//             desc: '同上',
//             code: `class Solution:
//     def matrixSum(self, nums: List[List[int]]) -> int:
//         for l in nums:
//             l.sort()
//         res = 0
//         for j in range(len(nums[0]) - 1, -1, -1):
//             val = 0
//             for i in range(len(nums)):
//                 val = max(val, nums[i][j])
//             res += val
//         return res`,
//         },
//         {
//             script: Script.RUST,
//             time: 20,
//             memory: 3.6,
//             desc: '同上',
//             code: `impl Solution {
//     pub fn matrix_sum(mut nums: Vec<Vec<i32>>) -> i32 {
//         let mut res = 0;
//         for row in &mut nums {
//             row.sort()
//         }
//         for j in (0..nums[0].len()).rev() {
//             let mut val = 0;
//             for i in 0..nums.len() {
//                 val = val.max(nums[i][j]);
//             }
//             res += val;
//         }
//         res
//     }
// }`,
//         },
    ],
};

export default leetCodeMarkdown;
