import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '面试题 16.19. 水域大小',
    url: 'https://leetcode.cn/problems/pond-sizes-lcci/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `你有一个用于表示一片土地的整数矩阵land，该矩阵中每个点的值代表对应地点的海拔高度。若值为0则表示水域。由垂直、水平或对角连接的水域为池塘。池塘的大小是指相连接的水域的个数。编写一个方法来计算矩阵中所有池塘的大小，返回值需要从小到大排序。`,
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
            memory: 11.4,
            desc: 'bfs',
            code: `#define X first
#define Y second
#define pii pair<int, int>

vector<vector<int>> dirs2 = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}, {1, 1}, {1, -1}, {-1, 1}, {-1, -1}};

class Solution {
public:
    vector<int> pondSizes(vector<vector<int>>& land) {
        int n = land.size(), m = land[0].size(), used[n][m];
        memset(used, 0, sizeof(used));
        vector<int> res;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (!used[i][j] && land[i][j] == 0) {
                    used[i][j] = 1;
                    queue<pii> q;
                    q.push(make_pair(i, j));
                    int cnt = 1;
                    while (q.size()) {
                        auto cur = q.front();
                        q.pop();
                        for (auto &dir : dirs2) {
                            int ni = cur.X + dir[0], nj = cur.Y + dir[1];
                            if (0 <= ni && ni < n && 0 <= nj && nj < m && land[ni][nj] == 0 && !used[ni][nj]) {
                                cnt += 1;
                                used[ni][nj] = 1;
                                q.push(make_pair(ni, nj));
                            }
                        }
                    }
                    res.push_back(cnt);
                }
            }
        }
        sort(res.begin(), res.end());
        return res;
    }
};`,
        },
        {
            script: Script.PY3,
            time: 204,
            memory: 27.5,
            desc: '同上',
            code: `dirs2 = [(0, 1), (0, -1), (1, 0), (-1, 0), (1, 1), (1, -1), (-1, 1), (-1, -1)]

    class Solution:
        def pondSizes(self, land: List[List[int]]) -> List[int]:
            n = len(land)
            m = len(land[0])
            used = [[False for _ in range(m)] for _ in range(n)]
            res = []
            for i in range(n):
                for j in range(m):
                    if not used[i][j] and land[i][j] == 0:
                        used[i][j] = True
                        q = deque()
                        q.append((i, j))
                        cnt = 1
                        while len(q):
                            cur = q.popleft()
                            for dir in dirs2:
                                ni = cur[0] + dir[0]
                                nj = cur[1] + dir[1]
                                if 0 <= ni < n and 0 <= nj < m and land[ni][nj] == 0 and not used[ni][nj]:
                                    cnt += 1
                                    used[ni][nj] = True
                                    q.append((ni, nj))
                        res.append(cnt)
            res.sort()
            return res`,
        },
        {
            script: Script.RUST,
            time: 16,
            memory: 4,
            desc: '同上',
            code: `pub const dirs2: [[i32; 2]; 8] = [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]];

impl Solution {
    pub fn pond_sizes(land: Vec<Vec<i32>>) -> Vec<i32> {
        let n = land.len();
        let m = land[0].len();
        let mut used = vec![vec![false; m]; n];
        let mut res = vec![];
        for i in 0..n {
            for j in 0..m {
                if !used[i][j] && land[i][j] == 0 {
                    used[i][j] = true;
                    let mut q = std::collections::VecDeque::<(usize, usize)>::new();
                    q.push_back((i, j));
                    let mut cnt = 1;
                    while !q.is_empty() {
                        let (i, j) = q.pop_front().unwrap();
                        for dir in dirs2 {
                            let ni = i as i32 + dir[0];
                            let nj = j as i32 + dir[1];
                            if 0 <= ni
                                && ni < n as i32
                                && 0 <= nj
                                && nj < m as i32
                                && land[ni as usize][nj as usize] == 0
                                && !used[ni as usize][nj as usize]
                            {
                                let ni = ni as usize;
                                let nj = nj as usize;
                                cnt += 1;
                                used[ni][nj] = true;
                                q.push_back((ni, nj));
                            }
                        }
                    }
                    res.push(cnt);
                }
            }
        }
        res.sort();
        res
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
