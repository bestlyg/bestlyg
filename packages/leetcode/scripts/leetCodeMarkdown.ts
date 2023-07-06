import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2178. 拆分成最多数目的正偶数之和',
    url: 'https://leetcode.cn/problems/maximum-split-of-positive-even-integers/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个整数 finalSum 。请你将它拆分成若干个 互不相同 的正偶数之和，且拆分出来的正偶数数目 最多 。`,
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
            time: 200,
            memory: 39.5,
            desc: '贪心',
            code: `class Solution {
public:
    vector<long long> maximumEvenSplit(long long finalSum) {
        vector<long long> res;
        if (finalSum % 2 != 0) return res;
        for (int num = 2; finalSum >= num; num += 2) {
            res.push_back(num);
            finalSum -= num;
        }
        res[res.size() - 1] += finalSum;
        return res;
    }
};`,
        },
        {
            script: Script.PY,
            time: 624,
            memory: 25.6,
            desc: '同上',
            code: `class Solution:
    def maximumEvenSplit(self, finalSum: int) -> List[int]:
        res = []
        if finalSum % 2 != 0: return res
        num = 2
        while num <= finalSum:
            res.append(num)
            finalSum -= num
            num += 2
        res[-1] += finalSum
        return res`,
        },
        {
            script: Script.RUST,
            time:40,
            memory: 3.2,
            desc: '同上',
            code: `impl Solution {
    pub fn maximum_even_split(mut final_sum: i64) -> Vec<i64> {
        let mut res = vec![];
        if final_sum % 2 == 0 {
            let mut num = 2;
            while num <= final_sum {
                res.push(num);
                final_sum -= num;
                num += 2;
            }
            *res.last_mut().unwrap() += final_sum;
        }
        res
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
