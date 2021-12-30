import { leetcode, markdown, specStr } from './utils';
const { backquote } = specStr;
const { Script, Difficulty, Tag } = leetcode;
const { link } = markdown;
type Script = leetcode.Script;
type Difficulty = leetcode.Difficulty;
type Tag = leetcode.Tag;
type Solution = leetcode.Solution;
type Markdown = leetcode.Markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '329. 矩阵中的最长递增路径',
  url: 'https://leetcode-cn.com/problems/numbers-with-same-consecutive-differences/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.回溯],
  desc: `返回所有长度为 n 且满足其每两个连续位上的数字之间的差的绝对值为 k 的 非负整数 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 32,
      memory: 14.3,
      desc: '记忆化dfs',
      code: `class Solution {
   public:
    int dirs[4][2] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
    int dfs(int mmap[][200], vector<vector<int>>& matrix, int n, int m, int row,
            int col) {
        if (mmap[row][col]) return mmap[row][col];
        int num = matrix[row][col], ans = 1;
        for (int i = 0; i < 4; i++) {
            int nrow = row + dirs[i][0];
            int ncol = col + dirs[i][1];
            if (nrow < 0 || ncol < 0 || nrow >= n || ncol >= m ||
                matrix[nrow][ncol] <= num)
                continue;
            ans = max(ans, dfs(mmap, matrix, n, m, nrow, ncol) + 1);
        }
        return mmap[row][col] = ans;
    }
    int longestIncreasingPath(vector<vector<int>>& matrix) {
        int n = matrix.size(), m = matrix[0].size(), ans = 0, mmap[n][200];
        memset(mmap, 0, sizeof(int) * n * 200);
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                int tag = 1, num = matrix[i][j];
                for (int k = 0; k < 4; k++) {
                    int nrow = i + dirs[k][0];
                    int ncol = j + dirs[k][1];
                    if (nrow < 0 || ncol < 0 || nrow >= n || ncol >= m)
                        continue;
                    if (matrix[nrow][ncol] < num) {
                        tag = 0;
                        break;
                    }
                }
                if (tag) ans = max(ans, dfs(mmap, matrix, n, m, i, j));
            }
        }
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
