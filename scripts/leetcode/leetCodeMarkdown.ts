import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1219. 黄金矿工',
  url: 'https://leetcode-cn.com/problems/path-with-maximum-gold/',
  difficulty: Difficulty.中等,
  tag: [Tag.数组, Tag.回溯, Tag.矩阵],
  desc: `要开发一座金矿，地质勘测学家已经探明了这座金矿中的资源分布，并用大小为 m * n 的网格 grid 进行了标注。每个单元格中的整数就表示这一单元格中的黄金数量；如果该单元格是空的，那么就是 0。`,
  solutions: [
    {
      script: Script.CPP,
      time: 580,
      memory: 169.2,
      desc: 'dfs',
      code: `int dirs[4][2] = {
    {0, 1},
    {0, -1},
    {1, 0},
    {-1, 0},
};

class Solution {
   public:
    int m, n, ans = 0;
    int getMaximumGold(vector<vector<int>>& grid) {
        m = grid.size();
        n = grid[0].size();
        vector<vector<int>> check(m, vector(n, 0));
        for (int row = 0; row < m; row++) {
            for (int col = 0; col < n; col++) {
                if (grid[row][col] == 0) continue;
                int cnt = 0;
                for (int i = 0; i < 4; i++) {
                    int nrow = row + dirs[i][0], ncol = col + dirs[i][1];
                    if (nrow >= 0 && nrow < m && ncol >= 0 && ncol < n &&
                        grid[nrow][ncol] != 0)
                        cnt++;
                }
                if (cnt < 3) dfs(grid, check, row, col, 0);
            }
        }
        return ans;
    }
    void dfs(vector<vector<int>>& grid, vector<vector<int>> check, int row,
             int col, int cur) {
        check[row][col] = 1;
        cur += grid[row][col];
        ans = max(ans, cur);
        for (int i = 0; i < 4; i++) {
            int nrow = row + dirs[i][0], ncol = col + dirs[i][1];
            if (nrow < 0 || nrow >= m || ncol < 0 || ncol >= n ||
                grid[nrow][ncol] == 0 || check[nrow][ncol] == 1)
                continue;
            dfs(grid, check, nrow, ncol, cur);
        }
        check[row][col] = 0;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
