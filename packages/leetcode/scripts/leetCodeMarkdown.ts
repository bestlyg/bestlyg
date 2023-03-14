import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1605. 给定行和列的和求可行矩阵',
  url: 'https://leetcode.cn/problems/find-valid-matrix-given-row-and-column-sums//',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `请找到大小为 rowSum.length x colSum.length 的任意 非负整数 矩阵，且该矩阵满足 rowSum 和 colSum 的要求。`,
  solutions: [
    {
      script: Script.CPP,
      time: 48,
      memory: 32.6,
      desc: '遍历',
      code: `class Solution {
public:
    vector<vector<int>> restoreMatrix(vector<int>& rowSum, vector<int>& colSum) {
        int n = rowSum.size(), m = colSum.size();
        vector<vector<int>> res(n, vector<int>(m, 0));
        for (int i = 0, j = 0; i < n && j < m;) {
            int v = min(rowSum[i], colSum[j]);
            res[i][j] = v;
            rowSum[i] -= v;
            colSum[j] -= v;
            if (rowSum[i] == 0) i++;
            if (colSum[j] == 0) j++;
        }
        return res;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 64,
      memory: 19.5,
      desc: '遍历',
      code: `class Solution:
    def restoreMatrix(self, rowSum: List[int], colSum: List[int]) -> List[List[int]]:
        n, m = len(rowSum), len(colSum)
        res = [[0] * m for _ in range(n)]
        i, j = 0, 0
        while i < n and j < m:
            v = min(rowSum[i], colSum[j])
            res[i][j] = v
            rowSum[i] -= v
            colSum[j] -= v
            if not rowSum[i]:
                i += 1
            if not colSum[j]:
                j += 1
        return res`,
    },
    {
      script: Script.RUST,
      time: 60,
      memory: 3.5,
      desc: '同上',
      code: `impl Solution {
    pub fn restore_matrix(mut row_sum: Vec<i32>, mut col_sum: Vec<i32>) -> Vec<Vec<i32>> {
        let (n, m) = (row_sum.len(), col_sum.len());
        let mut res = vec![vec![0; m]; n];
        let (mut i, mut j) = (0, 0);
        while i < n && j < m {
            let v = row_sum[i].min(col_sum[j]);
            res[i][j] = v;
            row_sum[i] -= v;
            col_sum[j] -= v;
            if row_sum[i] == 0 {
                i += 1;
            }
            if col_sum[j] == 0 {
                j += 1;
            }
        }
        res
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
