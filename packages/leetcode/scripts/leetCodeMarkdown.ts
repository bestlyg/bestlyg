import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1267. 统计参与通信的服务器',
    url: 'https://leetcode.cn/problems/count-servers-that-communicate',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你统计并返回能够与至少一台其他服务器进行通信的服务器的数量。`,
    solutions: [
        // {
        //     date: new Date('2020.04.26').getTime(),
        //     script: Script.JS,
        //     time: 384,
        //     memory: 44.78,
        //     desc: '归并排序',
        //     code: ``,
        // },
        // {
        //     date: new Date('2021.05.13').getTime(),
        //     script: Script.TS,
        //     time: 220,
        //     memory: 48.3,
        //     desc: '归并排序',
        //     code: ``,
        // },
        {
            script: Script.CPP,
            time: 40,
            memory: 21.36,
            desc: '两次遍历',
            code: `class Solution {
public:
    int countServers(vector<vector<int>>& grid) {
        int n = grid.size(), m = grid[0].size(), mmap[250][250] = {0};
        pair<int, int> prev = make_pair(-1, -1);
        for (int i = 0; i < n; i++) {
            prev = make_pair(-1, -1);
            for (int j = 0; j < m; j++) {
                if (grid[i][j] == 1) {
                    if (prev.first == -1) prev = make_pair(i, j);
                    else {
                        mmap[prev.first][prev.second] = true;
                        mmap[i][j] = true;
                    }
                }
            }
        }
        for (int j = 0; j < m; j++) {
            prev = make_pair(-1, -1);
            for (int i = 0; i < n; i++) {
                if (grid[i][j] == 1) {
                    if (prev.first == -1) prev = make_pair(i, j);
                    else {
                        mmap[prev.first][prev.second] = true;
                        mmap[i][j] = true;
                    }
                }
            }
        }
        int res = 0;
        for (int i = 0; i < n; i++)
            for (int j = 0; j < m; j++)
                if (mmap[i][j]) res += 1;
        return res;
    }
};`,
        },
        {
            script: Script.PY,
            time: 100,
            memory: 17.79,
            desc: '同上',
            code: `class Solution:
    def countServers(self, grid: List[List[int]]) -> int:
        n = len(grid)
        m = len(grid[0])
        mmap = [[0 for _ in range(m)] for _ in range(n)]
        prev = (-1, -1)
        for i in range(n):
            prev = (-1, -1)
            for j in range(m):
                if grid[i][j] == 1:
                    if prev[0] == -1:
                        prev = (i, j)
                    else:
                        mmap[prev[0]][prev[1]] = True
                        mmap[i][j] = True
        for j in range(m):
            prev = (-1, -1)
            for i in range(n):
                if grid[i][j] == 1:
                    if prev[0] == -1:
                        prev = (i, j)
                    else:
                        mmap[prev[0]][prev[1]] = True
                        mmap[i][j] = True
        res = 0
        for i in range(n):
            for j in range(m):
                if mmap[i][j]:
                    res += 1
        return res`,
        },
        {
            script: Script.RUST,
            time: 8,
            memory: 2.26,
            desc: '同上',
            code: `impl Solution {
    pub fn count_servers(grid: Vec<Vec<i32>>) -> i32 {
        let n = grid.len();
        let m = grid[0].len();
        let mut mmap = vec![vec![false; m]; n];
        let mut prev = (usize::MAX, usize::MAX);
        for i in 0..n {
            prev = (usize::MAX, usize::MAX);
            for j in 0..m {
                if grid[i][j] == 1 {
                    if prev.0 == usize::MAX {
                        prev = (i, j);
                    } else {
                        mmap[prev.0][prev.1] = true;
                        mmap[i][j] = true;
                    }
                }
            }
        }
        for j in 0..m {
            prev = (usize::MAX, usize::MAX);
            for i in 0..n {
                if grid[i][j] == 1 {
                    if prev.0 == usize::MAX {
                        prev = (i, j);
                    } else {
                        mmap[prev.0][prev.1] = true;
                        mmap[i][j] = true;
                    }
                }
            }
        }
        let mut res = 0;
        for i in 0..n {
            for j in 0..m {
                if mmap[i][j] {
                    res += 1;
                }
            }
        }
        res
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
