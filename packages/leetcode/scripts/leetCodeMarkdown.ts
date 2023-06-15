import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1177. 构建回文串检测',
    url: 'https://leetcode.cn/problems/can-make-palindrome-from-substring/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个字符串 s，请你对 s 的子串进行检测。每次检测，待检子串都可以表示为 queries[i] = [left, right, k]。我们可以 重新排列 子串 s[left], ..., s[right]，并从中选择 最多 k 项替换成任何小写英文字母。     如果在上述检测过程中，子串可以变成回文形式的字符串，那么检测结果为 true，否则结果为 false。    返回答案数组 answer[]，其中 answer[i] 是第 i 个待检子串 queries[i] 的检测结果。`,
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
            time: 284,
            memory: 92.6,
            desc: '因为可以重新排列，所以只需要考虑区间内的奇偶即可。',
            code: `class Solution {
public:
    vector<bool> canMakePaliQueries(string s, vector<vector<int>>& queries) {
        vector<int> list(1, 0);
        for (auto &c : s) list.push_back(list.back() ^ (1 << (c - 'a')));
        vector<bool> res;
        for (auto &q : queries) {
            int l = q[0], r = q[1], k = q[2], val = list[r + 1] ^ list[l], cnt = 0;
            for (int i = 0; i < 26; i++) 
                if (val & (1 << i)) cnt++;
            if ((r - l + 1) % 2 == 0) res.push_back(2 * k >= cnt);
            else res.push_back(2 * k >= cnt - 1);
        }
        return res;
    }
};`,
        },
                {
                    script: Script.PY3,
                    time: 588,
                    memory: 56.4,
                    desc: '同上',
                    code: `class Solution:
    def canMakePaliQueries(self, s: str, queries: List[List[int]]) -> List[bool]:
        list = [1]
        for c in s:
            list.append(list[-1] ^ (1 << (ord(c) - ord('a'))))

        def check(q: List[int]):
            l, r, k = q[0], q[1], q[2]
            val = list[r+1] ^ list[l]
            cnt = 0
            for i in range(26):
                if val & (1 << i):
                    cnt += 1
            if (r-l+1) % 2:
                return 2 * k >= cnt - 1
            else:
                return 2 * k >= cnt

        return [check(q) for q in queries]`,
                },
                {
                    script: Script.RUST,
                    time: 28,
                    memory: 9.5,
                    desc: '同上',
                    code: `impl Solution {
    pub fn can_make_pali_queries(s: String, queries: Vec<Vec<i32>>) -> Vec<bool> {
        let mut list = vec![0];
        for c in s.as_bytes() {
            list.push(list.last().unwrap() ^ (1 << (*c - b'a')));
        }
        let check = |q: Vec<i32>| -> bool {
            let l = q[0] as usize;
            let r = q[1] as usize;
            let k = q[2];
            let val = list[r + 1] ^ list[l];
            let mut cnt = 0;
            for i in 0..26 {
                if (val & (1 << i)) != 0 {
                    cnt += 1;
                }
            }
            if (r - l + 1) % 2 == 0 {
                2 * k >= cnt
            } else {
                2 * k >= cnt - 1
            }
        };
        queries.into_iter().map(|q| check(q)).collect()
    }
}`,
                },
    ],
};

export default leetCodeMarkdown;
