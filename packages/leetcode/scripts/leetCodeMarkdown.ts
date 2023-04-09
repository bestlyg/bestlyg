import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '6353. 网格图中最少访问的格子数',
  url: 'https://leetcode.cn/problems/minimum-number-of-visited-cells-in-a-grid/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `请你返回到达 右下角 格子 (m - 1, n - 1) 需要经过的最少移动格子数，如果无法到达右下角格子，请你返回 -1 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 1312,
      memory: 340.1,
      desc: '平衡树',
      code: `#define X first
#define Y second
class Solution {
public:
    typedef pair<int, int> pii;
    int minimumVisitedCells(vector<vector<int>>& grid) {
        int n = grid.size(), m = grid[0].size();
        vector<set<int>> rows(n), cols(m);
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                rows[i].insert(j);
                cols[j].insert(i);
            }
        }
        queue<pii> q;
        q.push(make_pair(0, 0));
        int size = 1, step = 1;
        while (q.size()) {
            auto cur = q.front();
            q.pop();
            if (cur.X == n - 1 && cur.Y == m - 1) return step;
            int nmin = cur.Y + 1, nmax = grid[cur.X][cur.Y] + cur.Y;
            auto it = rows[cur.X].lower_bound(nmin);
            while (it != rows[cur.X].end() && *it <= nmax) {
                q.push(make_pair(cur.X, *it));
                it = rows[cur.X].erase(it);
            }
            nmin = cur.X + 1, nmax = grid[cur.X][cur.Y] + cur.X;
            it = cols[cur.Y].lower_bound(nmin);
            while (it != cols[cur.Y].end() && *it <= nmax) {
                q.push(make_pair(*it, cur.Y));
                it = cols[cur.Y].erase(it);
            }
            if (--size == 0) {
                size = q.size();
                step++;
            }
        }
        return -1;
    }
};`,
    },
  ],
};

export default leetCodeMarkdown;
