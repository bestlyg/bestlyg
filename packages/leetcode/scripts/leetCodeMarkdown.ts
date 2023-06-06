import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2352. 相等行列对',
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
            time: 224,
            memory: 43,
            desc: '哈希存储',
            code: `class Solution {
public:
    int equalPairs(vector<vector<int>>& grid) {
        unordered_map<string, int> rows;
        int res = 0, n = grid.size();
        for (int i = 0; i < n; i++) {
            string key = "";
            for (int j = 0; j < n; j++) key += to_string(grid[i][j]) + ",";
            rows[key]++;
        }
        for (int j = 0; j < n; j++) {
            string key = "";
            for (int i = 0; i < n; i++) key += to_string(grid[i][j]) + ",";
            res += rows[key];
        }
        return res;
    }
};`,
        },
        {
            script: Script.PY3,
            time: 212,
            memory: 20.6,
            desc: '同上',
            code: `class Solution:
    def equalPairs(self, grid: List[List[int]]) -> int:
        rows = Counter()
        res = 0
        n = len(grid)
        for i in range(n):
            key = ""
            for j in range(n):
                key += str(grid[i][j]) + ","
            rows[key] += 1
        for j in range(n):
            key = ""
            for i in range(n):
                key += str(grid[i][j]) + ","
            res += rows[key]
        return res`,
        },
        {
            script: Script.RUST,
            time: 44,
            memory: 3,
            desc: '同上',
            code: `impl Solution {
pub fn equal_pairs(grid: Vec<Vec<i32>>) -> i32 {
    let mut rows = std::collections::HashMap::<String, i32>::new();
    let mut res = 0;
    let n = grid.len();
    for i in 0..n {
        let mut key = String::new();
        for j in 0..n {
            key.push_str(&format!("{}", grid[i][j]));
            key.push(',');
        }
        *rows.entry(key).or_insert(0) += 1;
    }
    for j in 0..n {
        let mut key = String::new();
        for i in 0..n {
            key.push_str(&format!("{}", grid[i][j]));
            key.push(',');
        }
        res += *rows.entry(key).or_insert(0);
    }
    res
}
}`,
        },
    ],
};

export default leetCodeMarkdown;
