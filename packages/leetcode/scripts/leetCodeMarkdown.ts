import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '1. 两数之和',
    url: 'https://leetcode.cn/problems/reconstruct-a-2-row-binary-matrix/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个 2 行 n 列的二进制数组。你需要利用 upper，lower 和 colsum 来重构这个矩阵，并以二维整数数组的形式返回它。`,
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
//         {
//             script: Script.CPP,
//             time: 56,
//             memory: 60.9,
//             desc: '贪心，先填充2的列，再依次填充1的列',
//             code: `class Solution {
// public:
//     bool isCircularSentence(string sentence) {
//         int n = sentence.size();
//         for (int i = 0; i < n; i++) {
//             while (sentence[i] != ' ' && i < n) i++;
//             if (i < n - 1 && sentence[i - 1] != sentence[i + 1]) return false;
//         }
//         return sentence[n - 1] == sentence[0];
//     }
// };`,
//         },
//         {
//             script: Script.PY,
//             time: 40,
//             memory:16.1,
//             desc: '字符串分割',
//             code: `class Solution:
//     def isCircularSentence(self, sentence: str) -> bool:
//         l = sentence.split(' ')
//         for i in range(len(l)):
//             if l[i][-1] != l[(i + 1) % len(l)][0]:
//                 return False
//         return True`,
//         },
        {
            script: Script.RUST,
            time: 0,
            memory: 2.4,
            desc: '同上',
            code: `impl Solution {
    pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
        let mut m = std::collections::HashMap::<i32, usize>::new();
        for i in 0..nums.len() {
            match m.get_mut(&(target - nums[i])) {
                Some(prev) => return vec![*prev as i32, i as i32],
                None => {
                    m.insert(nums[i], i);
                }
            }
        }
        vec![]
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
