import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '980. 不同路径 III',
    url: 'https://leetcode.cn/problems/unique-paths-iii',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `返回在四个方向（上、下、左、右）上行走时，从起始方格到结束方格的不同路径的数目。`,
    solutions: [
        // {
        //     date: new Date('2020/10/06').getTime(),
        //     script: Script.JS,
        //     time: 224,
        //     memory: 54.2,
        //     desc: 'dfs',
        //     code: ``,
        // },
        {
            script: Script.CPP,
            time: 4,
            memory: 6.77,
            desc: 'dfs',
            code: `#define X first
#define Y second
#define pii pair<int, int>
vector<vector<int>> dirs = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
class Solution {
public:
    int uniquePathsIII(vector<vector<int>>& grid) {
        int res = 0, n = grid.size(), m = grid[0].size(), sum = n * m;
        pii start, end;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (grid[i][j] == 1) start = make_pair(i, j);
                else if (grid[i][j] == 2) end = make_pair(i, j);
                else if (grid[i][j] == -1) sum -= 1;
            }
        }
        vector<vector<bool>> used(n, vector<bool>(m, false));
        used[start.X][start.Y] = true;
        function<void(pii, int)> dfs = [&](pii cur, int cnt) {
            if (cur.X == end.X && cur.Y == end.Y) {
                if (cnt == sum) res += 1;
                return;
            }
            for (auto &dir : dirs) {
                int nx = cur.X + dir[0], ny = cur.Y + dir[1];
                if (0 <= nx && nx < n && 0 <= ny && ny < m && grid[nx][ny] != -1 && !used[nx][ny]) {
                    used[nx][ny] = true;
                    dfs(make_pair(nx, ny), cnt + 1);
                    used[nx][ny] = false;
                }
            }
        };
        dfs(start, 1);
        return res;
    }
};`,
        },
        {
            script: Script.PY,
            time: 68,
            memory: 15.83,
            desc: '同上',
            code: `dirs = [(0, 1), (1, 0), (0, -1), (-1, 0)]
class Solution:
    def uniquePathsIII(self, grid: List[List[int]]) -> int:
        res = 0
        n = len(grid)
        m = len(grid[0])
        sum = n * m
        start = end = (0, 0)
        for i in range(n):
            for j in range(m):
                if grid[i][j] == 1:
                    start = (i, j)
                elif grid[i][j] == 2:
                    end = (i, j)
                elif grid[i][j] == -1:
                    sum -= 1
        used = [[False for _ in range(m)] for _ in range(n)]
        used[start[0]][start[1]] = True
        def dfs(cur: Tuple[int, int], cnt: int):
            nonlocal res
            if cur[0] == end[0] and cur[1] == end[1]:
                if cnt == sum:
                    res += 1
                return
            for dir in dirs:
                nx = cur[0] + dir[0]
                ny = cur[1] + dir[1]
                if 0 <= nx < n and 0 <= ny < m and grid[nx][ny] != -1 and not used[nx][ny]:
                    used[nx][ny] = True
                    dfs((nx, ny), cnt + 1)
                    used[nx][ny] = False
        dfs(start, 1)
        return res`,
        },
        {
            script: Script.RUST,
            time: 4,
            memory: 1.86,
            desc: '同上',
            code: `pub const DIRS: [[i32; 2]; 4] = [[0, 1], [0, -1], [1, 0], [-1, 0]];
impl Solution {
    pub fn unique_paths_iii(grid: Vec<Vec<i32>>) -> i32 {
        let mut res = 0;
        let n = grid.len();
        let m = grid[0].len();
        let mut start = (0, 0);
        let mut end = (0, 0);
        let mut sum = n * m;
        for i in 0..n {
            for j in 0..m {
                if grid[i][j] == 1 {
                    start = (i, j);
                } else if grid[i][j] == 2 {
                    end = (i, j);
                } else if grid[i][j] == -1 {
                    sum -= 1;
                }
            }
        }
        let mut used: Vec<Vec<bool>> = vec![vec![false; m]; n];
        used[start.0][start.1] = true;
        fn dfs(
            res: &mut i32,
            sum: usize,
            grid: &Vec<Vec<i32>>,
            used: &mut Vec<Vec<bool>>,
            cur: (usize, usize),
            end: (usize, usize),
            cnt: usize,
        ) {
            if cur.0 == end.0 && cur.1 == end.1 {
                if cnt == sum {
                    *res += 1;
                }
            } else {
                for dir in DIRS {
                    let nx = (cur.0 as i32 + dir[0]) as usize;
                    let ny = (cur.1 as i32 + dir[1]) as usize;
                    if 0 <= nx
                        && nx < grid.len()
                        && 0 <= ny
                        && ny < grid[0].len()
                        && grid[nx][ny] != -1
                        && !used[nx][ny]
                    {
                        used[nx][ny] = true;
                        dfs(res, sum, grid, used, (nx, ny), end, cnt + 1);
                        used[nx][ny] = false;
                    }
                }
            }
        }
        dfs(&mut res, sum, &grid, &mut used, start, end, 1);
        res
    }
}
`,
        },
    ],
};

export default leetCodeMarkdown;
