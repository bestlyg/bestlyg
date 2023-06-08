import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1240. 铺瓷砖',
    url: 'https://leetcode.cn/problems/tiling-a-rectangle-with-the-fewest-squares/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `房子的客厅大小为 n x m，为保持极简的风格，需要使用尽可能少的 正方形 瓷砖来铺盖地面。假设正方形瓷砖的规格不限，边长都是整数。请你帮设计师计算一下，最少需要用到多少块方形瓷砖？`,
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
            memory: 6,
            desc: 'dfs，储存已经遍历过的点',
            code: `class Solution {
public:
    int tilingRectangle(int n, int m) {
        int res = INT_MAX, list[20] = {0};
        function<void(int, int, int)> dfs = [&](int i, int j, int cnt) {
            if (i == n) {
                res = min(res, cnt);
            } else if (j == m) {
                dfs(i + 1, 0, cnt);
            } else if (list[i] & (1 << j)) {
                dfs(i, j + 1, cnt);
            } else if (cnt < res) {
                int ncnt = 0, mcnt = 0;
                for (int p = i; p < n && !(list[p] & (1 << j)); p++) ncnt++;
                for (int p = j; p < m && !(list[i] & (1 << p)); p++) mcnt++;
                int nmcnt = min(ncnt, mcnt);
                for (int ccnt = nmcnt; ccnt >= 1; ccnt--) {
                    for (int p = i; p < i + ccnt; p++) list[p] |= (((1 << ccnt) - 1) << j);
                    dfs(i, j + ccnt, cnt + 1);
                    for (int p = i; p < i + ccnt; p++) list[p] &= ~(((1 << ccnt) - 1) << j);
                }
            }
        };
        dfs(0, 0, 0);
        return res;
    }
};`,
        },
        // {
        //     script: Script.PY3,
        //     time: 212,
        //     memory: 20.6,
        //     desc: '同上',
        //     code: ``,
        // },
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
