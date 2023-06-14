import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1375. 二进制字符串前缀一致的次数',
    url: 'https://leetcode.cn/problems/number-of-times-binary-string-is-prefix-aligned/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `返回二进制字符串在翻转过程中 前缀一致 的次数。`,
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
            time: 40,
            memory: 37.6,
            desc: '遍历，记录当前反转的最大值',
            code: `class Solution {
public:
    int numTimesAllBlue(vector<int>& flips) {
        int nmax = 0, res = 0;
        for (int i = 0; i < flips.size(); i++) {
            nmax = max(nmax, flips[i]);
            if (nmax == i + 1) res++;
        }
        return res;
    }
};`,
        },
                {
                    script: Script.PY3,
                    time: 80,
                    memory: 21.4,
                    desc: '同上',
                    code: `class Solution:
    def numTimesAllBlue(self, flips: List[int]) -> int:
        nmax = res = 0
        for i in range(len(flips)):
            nmax = max(nmax, flips[i])
            if nmax == i + 1: res += 1
        return res`,
                },
                {
                    script: Script.RUST,
                    time: 4,
                    memory: 2.3,
                    desc: '同上',
                    code: `impl Solution {
    pub fn num_times_all_blue(flips: Vec<i32>) -> i32 {
        let (mut nmax, mut res) = (0, 0);
        for i in 0..flips.len() {
            nmax = nmax.max(flips[i]);
            if nmax as usize == i + 1 {
                res += 1
            }
        }
        res
    }
}`,
                },
    ],
};

export default leetCodeMarkdown;
