import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '1091. 二进制矩阵中的最短路径',
  url: 'https://leetcode.cn/problems/differences-between-two-objects/',
  difficulty: Difficulty.简单,
  tag: [],
  desc: `请你编写一个函数，它接收两个深度嵌套的对象或数组 obj1 和 obj2 ，并返回一个新对象表示它们之间差异。`,
  solutions: [
//     {
//       script: Script.TS,
//       time: 76,
//       memory: 45.3,
//       desc: 'dfs',
//       code: `// 特殊标识符，在左右相等时返回
// const same = Symbol('same');
// // 存储所有已经存在的key
// function mergeKey(key1: string[], key2: string[]) {
//     const set1 = new Set(key1);
//     const set2 = new Set(key2);
//     const res = new Set<string>();
//     for (const k of set1) {
//         if (set2.has(k)) res.add(k);
//     }
//     return res;
// }

// function objDiff(obj1: any, obj2: any, topLevel = true): any {
//     const t1 = typeof obj1;
//     const t2 = typeof obj2;
//     // 类型不等，肯定不等
//     if (t1 !== t2) return [obj1, obj2];
//     // 如果不是对象，直接判断是否相等
//     if (t1 !== 'object') return obj1 === obj2 ? same : [obj1, obj2];
//     // 如果是null或undefined，直接判断防止下面出错
//     if (obj1 === null || obj1 === undefined || obj2 === null || obj2 === undefined) return same;
//     // 如果一个是数组一个不是数组，那就不等
//     if (
//         (!Array.isArray(obj1) && Array.isArray(obj2)) ||
//         (Array.isArray(obj1) && !Array.isArray(obj2))
//     )
//         return [obj1, obj2];
//     // 此时肯定是对象或数组
//     // 拿所有共存的key
//     const keys = mergeKey(Object.keys(obj1), Object.keys(obj2));
//     const res = {};
//     // 遍历obj1中所有的kv
//     for (const [k, v] of Object.entries(obj1).filter(([k]) => keys.has(k))) {
//         // 递归比较，利用topLevel记录是不是顶层
//         const diff = objDiff(v, obj2[k], false);
//         // 如果不同就存储
//         if (diff != same) res[k] = diff;
//     }
//     // 如果是空的，但是是顶层的，那就返回相等
//     if (Object.keys(res).length === 0 && !topLevel) return same;
//     // 否则顶层要返回控对象
//     return res;
// }`,
//     },
        {
          script: Script.CPP,
          time: 68,
          memory: 19.2,
          desc: 'bfs',
          code: `#define X first
#define Y second
#define pii pair<int, int>

vector<vector<int>> dirs2 = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}, {1, 1}, {1, -1}, {-1, 1}, {-1, -1}};

class Solution {
    public:
    int shortestPathBinaryMatrix(vector<vector<int>> &grid) {
        if (grid[0][0] == 1) return -1;
        queue<pii> q;
        q.push(make_pair(0, 0));
        int n = grid.size(), size = 1, step = 1;
        vector<vector<bool>> used(n, vector<bool>(n, false));
        while (q.size()) {
            auto cur = q.front();
            q.pop();
            if (cur.X == n - 1 && cur.Y == n - 1) return step;
            for (auto &dir : dirs2) {
                int nx = cur.X + dir[0], ny = cur.Y + dir[1];
                if (nx >= 0 && nx < n && ny >= 0 && ny < n && grid[nx][ny] == 0 && !used[nx][ny]) {
                    used[nx][ny] = true;
                    q.push(make_pair(nx, ny));
                }
            }
            if (--size == 0) {
                size = q.size();
                step += 1;
            }
        }
        return -1;
    }
};`,
        },
        {
          script: Script.PY3,
          time: 256,
          memory:16.6,
          desc: '同上',
          code: `dirs2 = [(0, 1), (0, -1), (1, 0), (-1, 0), (1, 1), (1, -1), (-1, 1), (-1, -1)]
    class Solution:
        def shortestPathBinaryMatrix(self, grid: List[List[int]]) -> int:
            if grid[0][0] == 1:
                return -1
            q = deque()
            q.append((0, 0))
            n = len(grid)
            step = size = 1
            used = [[False for _ in range(n)] for _ in range(n)]
            while len(q):
                (x, y) = q.popleft()
                if x == n - 1 and y == n - 1:
                    return step
                for dir in dirs2:
                    nx = x + dir[0]
                    ny = y + dir[1]
                    if nx >= 0 and nx < n and ny >= 0 and ny < n and grid[nx][ny] == 0 and not used[nx][ny]:
                        used[nx][ny] = True
                        q.append((nx, ny))
                size -= 1
                if size == 0:
                    size = len(q)
                    step += 1
            return -1`,
        },
        {
          script: Script.RUST,
          time: 16,
          memory: 2.1,
          desc: '同上',
          code: `pub const dirs2: [[i32; 2]; 8] = [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]];
impl Solution {
    pub fn shortest_path_binary_matrix(grid: Vec<Vec<i32>>) -> i32 {
        if grid[0][0] == 1 {
            -1
        } else {
            let mut q = std::collections::VecDeque::<(i32, i32)>::new();
            q.push_back((0, 0));
            let n = grid.len() as i32;
            let mut size = 1;
            let mut step = 1;
            let mut used = vec![vec![false; n as usize]; n as usize];
            while let Some((x, y)) = q.pop_front() {
                if x == n - 1 && y == n - 1 {
                    return step;
                }
                for dir in dirs2 {
                    let nx = x + dir[0];
                    let ny = y + dir[1];
                    if nx >= 0
                        && nx < n
                        && ny >= 0
                        && ny < n
                        && grid[nx as usize][ny as usize] == 0
                        && !used[nx as usize][ny as usize]
                    {
                        used[nx as usize][ny as usize] = true;
                        q.push_back((nx, ny));
                    }
                }
                size -= 1;
                if size == 0 {
                    size = q.len();
                    step += 1;
                }
            }
            -1
        }
    }
}`,
        },
  ],
};

export default leetCodeMarkdown;
