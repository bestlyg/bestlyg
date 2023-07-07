import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '2532. 过桥的时间',
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
            time: 188,
            memory: 20.5,
            desc: '模拟',
            code: `#define X first
#define Y second
class Solution {
public:
    typedef pair<int, int> pii;
    int findCrossingTime(int n, int k, vector<vector<int>>& time) {
        auto cmp = [&](int i1, int i2) {
            int v1 = time[i1][0] + time[i1][2], v2 = time[i2][0] + time[i2][2];
            return v1 < v2 || v1 == v2 && i1 < i2;
        };
        priority_queue<int, vector<int>, decltype(cmp)> ql(cmp), qr(cmp);
        for (int i = 0; i < k; i++) ql.push(i);

        auto cmpp = [&](pii i1, pii i2) {
            return i2.X < i1.X;
        };
        priority_queue<pii, vector<pii>, decltype(cmpp)> qpl(cmpp), qpr(cmpp);

        int res = 0;
        while (qr.size() || qpr.size() || n > 0) {
            // cout << "===> Loop: " 
            //      << "n = " << n
            //      << ", res = " << res
            //      << ", qpl = " << (qpl.size() ? (long long)qpl.top().X * 100 + qpl.top().Y : -1)
            //      << ", ql = " << (ql.size() ? ql.top() : -1)
            //      << ", qr = " << (qr.size() ? qr.top() : -1)
            //      << ", qpr = " << (qpr.size() ? (long long)qpr.top().X * 100 + qpr.top().Y : -1)
            //      << endl;

            if ((ql.empty() && qr.empty()) || qr.empty() && qpr.size() && n == 0) {
                res = max(
                    res,
                    min(
                        qpl.size() ? qpl.top().X : INT_MAX,
                        qpr.size() ? qpr.top().X : INT_MAX
                    )
                );
            }

            while (qpl.size() && qpl.top().X <= res) {
                auto cur = qpl.top();
                qpl.pop();
                ql.push(cur.Y);
            }
            while (qpr.size() && qpr.top().X <= res) {
                auto cur = qpr.top();
                qpr.pop();
                qr.push(cur.Y);
            }

            if (qr.size()) {
                auto cur = qr.top();
                qr.pop();
                res += time[cur][2];
                qpl.push(make_pair(res + time[cur][3], cur));
            } else if (ql.size() && n > 0) {
                n -= 1;
                auto cur = ql.top();
                ql.pop();
                res += time[cur][0];
                qpr.push(make_pair(res + time[cur][1], cur));
            }
        }

        return res;
    }
};`,
        },
//         {
//             script: Script.PY,
//             time: 624,
//             memory: 25.6,
//             desc: '同上',
//             code: `class Solution:
//     def maximumEvenSplit(self, finalSum: int) -> List[int]:
//         res = []
//         if finalSum % 2 != 0: return res
//         num = 2
//         while num <= finalSum:
//             res.append(num)
//             finalSum -= num
//             num += 2
//         res[-1] += finalSum
//         return res`,
//         },
//         {
//             script: Script.RUST,
//             time:40,
//             memory: 3.2,
//             desc: '同上',
//             code: `impl Solution {
//     pub fn maximum_even_split(mut final_sum: i64) -> Vec<i64> {
//         let mut res = vec![];
//         if final_sum % 2 == 0 {
//             let mut num = 2;
//             while num <= final_sum {
//                 res.push(num);
//                 final_sum -= num;
//                 num += 2;
//             }
//             *res.last_mut().unwrap() += final_sum;
//         }
//         res
//     }
// }`,
//         },
    ],
};

export default leetCodeMarkdown;
