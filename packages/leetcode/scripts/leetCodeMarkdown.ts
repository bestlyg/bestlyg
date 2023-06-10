import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1170. 比较字符串最小字母出现频次',
    url: 'https://leetcode.cn/problems/compare-strings-by-frequency-of-the-smallest-character/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `定义一个函数 f(s)，统计 s  中（按字典序比较）最小字母的出现频次 ，其中 s 是一个非空字符串。请你返回一个整数数组 answer 作为答案，其中每个 answer[i] 是第 i 次查询的结果。`,
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
            memory: 11.4,
            desc: '排序后二分查找',
            code: `class Solution {
public:
    vector<int> numSmallerByFrequency(vector<string>& queries, vector<string>& words) {
        vector<int> ws;
        for (auto &w : words) ws.push_back(f(w));
        sort(ws.begin(), ws.end());
        vector<int> res;
        for (auto &q : queries) {
            int target = f(q), l = 0, r = words.size();
            while (l < r) {
                int m = (l + r) / 2;
                if (target < ws[m]) r = m;
                else l = m + 1;
            }
            res.push_back(words.size() - l);
        }
        return res;
    }
    int f(string &w) {
        int cnt = 0;
        char ch = 'z';
        for (auto &c : w) {
            if (c < ch) ch = c, cnt = 1;
            else if (c == ch) cnt++;
        }
        return cnt;
    }
};`,
        },
        {
            script: Script.PY3,
            time: 56,
            memory: 16.7,
            desc: '同上',
            code: `class Solution:
    def numSmallerByFrequency(self, queries: List[str], words: List[str]) -> List[int]:
        def f(w: str):
            cnt = 0
            ch = ord('z')
            for c in w:
                if ord(c) < ch:
                    ch = ord(c)
                    cnt = 1
                elif ord(c) == ch:
                    cnt += 1
            return cnt
        ws = [f(w) for w in words]
        ws.sort()

        def query(q: str):
            target = f(q)
            l = 0
            r = len(words)
            while l < r:
                m = (l + r)//2
                if target < ws[m]:
                    r = m
                else:
                    l = m + 1
            return len(words) - l

        return [query(q) for q in queries]`,
        },
        // {
        //     script: Script.RUST,
        //     time: 44,
        //     memory: 3,
        //     desc: '同上',
        //     code: ``,
        // },
    ],
};

export default leetCodeMarkdown;
