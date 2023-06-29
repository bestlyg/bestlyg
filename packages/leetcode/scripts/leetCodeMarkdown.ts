import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1253. 重构 2 行二进制矩阵',
    url: 'https://leetcode.cn/problems/reconstruct-a-2-row-binary-matrix/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个 2 行 n 列的二进制数组。你需要利用 upper，lower 和 colsum 来重构这个矩阵，并以二维整数数组的形式返回它。`,
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
            time: 56,
            memory: 60.9,
            desc: '贪心，先填充2的列，再依次填充1的列',
            code: `class Solution {
public:
    vector<vector<int>> reconstructMatrix(int upper, int lower, vector<int>& colsum) {
        int n = colsum.size();
        vector<int> list1(n, 0), list2(n, 0);
        for (int i = 0; i < n; i++) {
            if (colsum[i] == 2) {
                list1[i] = list2[i] = 1;
                if (upper <= 0 || lower <= 0) return {};
                upper -= 1;
                lower -= 1;
            }
        }
        for (int i = 0; i < n; i++) {
            if (colsum[i] == 1) {
                if (upper > 0) {
                    list1[i] = 1;
                    upper--;
                } else if (lower > 0) {
                    list2[i] = 1;
                    lower--;
                } else {
                    return {};
                }
            }
        }
        if (upper > 0 || lower > 0) return {};
        return { list1, list2 };
    }
};`,
        },
        {
            script: Script.PY,
            time: 132,
            memory: 22.5,
            desc: '同上',
            code: `class Solution:
    def reconstructMatrix(self, upper: int, lower: int, colsum: List[int]) -> List[List[int]]:
        n = len(colsum)
        list1 = [0 for _ in range(n)]
        list2 = [0 for _ in range(n)]
        for i in range(n):
            if colsum[i] == 2:
                list1[i] = list2[i] = 1
                if upper <= 0 or lower <= 0:
                    return []
                upper -= 1
                lower -= 1
        for i in range(n):
            if colsum[i] == 1:
                if upper > 0:
                    list1[i] = 1
                    upper -= 1
                elif lower > 0:
                    list2[i] = 1
                    lower -= 1
                else:
                    return []
        return [list1, list2] if upper == 0 and lower == 0 else []`,
        },
        {
            script: Script.RUST,
            time: 28,
            memory: 3.6,
            desc: '同上',
            code: `impl Solution {
    pub fn reconstruct_matrix(mut upper: i32, mut lower: i32, colsum: Vec<i32>) -> Vec<Vec<i32>> {
        let n = colsum.len();
        let mut list1 = vec![0; n];
        let mut list2 = vec![0; n];
        for i in 0..n {
            if colsum[i] == 2 {
                list1[i] = 1;
                list2[i] = 1;
                if upper <= 0 || lower <= 0 {
                    return vec![];
                }
                upper -= 1;
                lower -= 1;
            }
        }
        for i in 0..n {
            if colsum[i] == 1 {
                if upper > 0 {
                    list1[i] = 1;
                    upper -= 1;
                } else if lower > 0 {
                    list2[i] = 1;
                    lower -= 1;
                } else {
                    return vec![];
                }
            }
        }
        if upper > 0 || lower > 0 {
            vec![]
        } else {
            vec![list1, list2]
        }
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
