import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '2611. 老鼠和奶酪',
    url: 'https://leetcode.cn/problems/equal-row-and-column-pairs/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个下标从 0 开始、大小为 n x n 的整数矩阵 grid ，返回满足 Ri 行和 Cj 列相等的行列对 (Ri, Cj) 的数目。`,
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
            time: 312,
            memory: 103.5,
            desc: '哈希存储',
            code: `#define SORT(list, fn) sort(list.begin(), list.end(), [&](auto &v1, auto &v2){ fn });
class Solution {
public:
    int miceAndCheese(vector<int>& reward1, vector<int>& reward2, int k) {
        int n = reward1.size(), res = 0;
        vector<int> idxs;
        for (int i = 0; i < n; i++) idxs.push_back(i);
        SORT(idxs, { return reward1[v1] - reward2[v1] < reward1[v2] - reward2[v2]; });
        for (int i = 0; i < n - k; i++) res += reward2[idxs[i]];
        for (int i = n - k; i < n; i++) res += reward1[idxs[i]];
        return res;
    }
};`,
        },
        {
            script: Script.PY3,
            time: 212,
            memory: 20.6,
            desc: '同上',
            code: ``,
        },
        {
            script: Script.RUST,
            time: 44,
            memory: 3,
            desc: '同上',
            code: ``,
        },
    ],
};

export default leetCodeMarkdown;
