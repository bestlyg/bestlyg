import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2496. 数组中字符串的最大值',
    url: 'https://leetcode.cn/problems/maximum-value-of-a-string-in-an-array/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个字符串数组 strs ，每个字符串都只由字母和数字组成，请你返回 strs 中字符串的 最大值 。`,
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
            time: 0,
            memory: 7.7,
            desc: '遍历',
            code: `class Solution {
public:
    int maximumValue(vector<string>& strs) {
        int res = 0;
        for (auto &s : strs) {
            int cur = 0;
            for (auto &c : s) {
                if (!isdigit(c)) {
                    cur = s.size();
                    break;
                } else {
                    cur = cur * 10 + c - '0';
                }
            }
            res = max(res, cur);
        }
        return res;
    }
};`,
        },
        {
            script: Script.PY3,
            time: 32,
            memory: 16.1,
            desc: '同上',
            code: `class Solution:
    def maximumValue(self, strs: List[str]) -> int:
        return max(
            len(s) if not s.isdigit() else int(s)
            for s in strs
        )`,
        },
        {
            script: Script.RUST,
            time: 0,
            memory: 2,
            desc: '同上',
            code: `impl Solution {
    pub fn maximum_value(strs: Vec<String>) -> i32 {
        strs.into_iter()
            .map(|s| s.parse().unwrap_or(s.len() as i32))
            .max()
            .unwrap()
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
