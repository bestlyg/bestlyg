import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1072. 按列翻转得到最大值等行数',
  url: 'https://leetcode.cn/problems/flip-columns-for-maximum-number-of-equal-rows/',
  difficulty: Difficulty.简单,
  tag: [],
  desc: `给定 m x n 矩阵 matrix 。你可以从中选出任意数量的列并翻转其上的 每个 单元格。（即翻转后，单元格的值从 0 变成 1，或者从 1 变为 0 。）返回 经过一些翻转后，行与行之间所有值都相等的最大行数 。`,
  solutions: [
    //     {
    //       script: Script.TS,
    //       time: 76,
    //       memory: 45.9,
    //       desc: '哈希存储',
    //       code: `function findMaxK(nums: number[]): number {
    //     const set1 = new Set<number>();
    //     const set2 = new Set<number>();
    //     for (const num of nums) {
    //         if (set1.has(-num)) set2.add(Math.abs(num));
    //         set1.add(num);
    //     }
    //     return [...set2].sort((a, b) => b - a)[0] ?? -1;
    // }`,
    //       date: new Date('2022/10/16').getTime(),
    //     },
    {
      script: Script.CPP,
      time: 352,
      memory:69,
      desc: '按照行首的值进行反转',
      code: `class Solution {
public:
    int maxEqualRowsAfterFlips(vector<vector<int>>& matrix) {
        unordered_map<string, int> m;
        for (auto &row : matrix) {
            string s = "";
            for (auto &v : row) {
                s += to_string(v ^ row[0]);
            }
            m[s]++;
        }
        int res = 0;
        for (auto &item : m) {
            res = max(res, item.second);
        }
        return res;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 248,
      memory: 18.6,
      desc: '同上',
      code: `class Solution:
    def maxEqualRowsAfterFlips(self, matrix: List[List[int]]) -> int:
        m = Counter()
        for row in matrix:
            s = ""
            for v in row:
                s += str(v ^ row[0])
            m[s] += 1
        res = 0
        for v in m.values():
            res = max(res, v)
        return res`,
    },
    {
      script: Script.RUST,
      time: 28,
      memory: 3.2,
      desc: '同上',
      code: `impl Solution {
    pub fn max_equal_rows_after_flips(matrix: Vec<Vec<i32>>) -> i32 {
        let mut m = std::collections::HashMap::<String, i32>::new();
        for row in matrix {
            let mut s = String::new();
            for v in &row {
                s.push(((*v ^ row[0]) as u8 + b'0') as char);
            }
            *m.entry(s).or_insert(0) += 1;
        }
        let mut res = 0;
        for (_, v) in m.into_iter() {
            res = res.max(v);
        }
        res
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
