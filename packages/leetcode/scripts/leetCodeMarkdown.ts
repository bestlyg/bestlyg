import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2485. 找出中枢整数',
    url: 'https://leetcode.cn/problems/find-the-pivot-integer',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `返回中枢整数 x 。`,
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
            memory: 5.8,
            desc: '遍历',
            code: `class Solution {
                public:
                    int pivotInteger(int n) {
                        int sum = (1 + n) * n / 2;
                        int prev_sum = 0;
                        for (int i = 1; i <=n ; i++) {
                            int next_sum = sum - prev_sum;
                            prev_sum += i;
                            if (prev_sum == next_sum) return i;
                        }
                        return -1;
                    }
                };
                `,
            date: new Date('2022/11/27').getTime(),
        },
        {
            script: Script.CPP,
            time: 0,
            memory: 5.9,
            desc: '遍历',
            code: `class Solution {
public:
    int pivotInteger(int n) {
        int r = (1 + n) * n / 2, l = 0;
        for (int i = 1; i <= n; i++) {
            l += i;
            if (l == r) return i;
            r -= i;
        }
        return -1;
    }
};`,
            date: new Date('2022/11/27').getTime(),
        },
        {
            script: Script.CPP,
            time: 0,
            memory: 5.7,
            desc: '对于圆在矩形的四边和在四个远郊区都进行检测',
            code: `class Solution {
public:
    int pivotInteger(int n) {
        int r = (1 + n) * n / 2, l = 0;
        for (int i = 1; i <= n; i++) {
            l += i;
            if (l == r) return i;
            r -= i;
        }
        return -1;
    }
};`,
        },
        {
            script: Script.PY,
            time: 72,
            memory: 15.8,
            desc: '同上',
            code: `class Solution:
    def pivotInteger(self, n: int) -> int:
        l = 0
        r = sum(range(1, n + 1))
        for i in range(1, n + 1):
            l += i
            if l == r: return i
            r -= i
        return -1`,
        },
        {
            script: Script.RUST,
            time: 0,
            memory: 2,
            desc: '同上',
            code: `impl Solution {
    pub fn pivot_integer(n: i32) -> i32 {
        let mut l = 0;
        let mut r: i32 = (1..=n).sum();
        for i in 1..=n {
            l += i;
            if l == r {
                return i
            }
            r -= i;
        }
        -1
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
