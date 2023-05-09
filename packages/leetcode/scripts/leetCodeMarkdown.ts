import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '1263. 推箱子',
  url: 'https://leetcode.cn/problems/number-of-valid-clock-times/',
  difficulty: Difficulty.简单,
  tag: [],
  desc: `请你返回一个整数 answer ，将每一个 ? 都用 0 到 9 中一个数字替换后，可以得到的有效时间的数目。`,
  solutions: [
    //     {
    //       script: Script.TS,
    //       time: 184,
    //       memory: 48.3,
    //       desc: '遍历',
    //       code: `function isValid(s: string): boolean {
    //     while (s != "") {
    //         const n = s.replace("abc", "");
    //         if (n == s) return false;
    //         s = n;
    //     }
    //     return s == "";
    // };`,
    //     },
//     {
//       script: Script.CPP,
//       time: 0,
//       memory: 5.9,
//       desc: '枚举',
//       code: `class Solution {
// public:
//     int countTime(string time) {
//         vector<int> idxs;
//         for (int i = 0; i < time.size(); i++) {
//             if (time[i] == '?') idxs.push_back(i);
//         }
//         int res = 0;
//         if (idxs.empty()) {
//             return check(time) ? 1 : 0;
//         }
//         function<void(int, string)> dfs = [&](int idx, string time) {
//             if (idx == idxs.size()) {
//                 if (check(time)) res++;
//                 return;
//             }
//             for (int i = 0; i <= 9; i++) {
//                 time[idxs[idx]] = i + '0';
//                 dfs(idx + 1, time);
//             }
//         };
//         dfs(0, time);
//         return res;
//     }
//     bool check(string &time) {
//         int h = (time[0] - '0') * 10 + (time[1] - '0'), 
//             m = (time[3] - '0') * 10 + (time[4] - '0'); 
//         if (h >= 24 || m >= 60) return false;
//         return true;
//     }
// };`,
//     },
//     {
//       script: Script.PY3,
//       time: 2080,
//       memory: 16.5,
//       desc: '同上',
//       code: `dirs = [(0, 1), (1, 0), (0, -1), (-1, 0)]

// class UnionFind:
//     def __init__(self, n) -> None:
//         self.n = n
//         self.data = [i for i in range(0, n)]
//         self.cnt = [1] * n

//     def size(self, v: int) -> int:
//         return self.cnt[self.find(v)]

//     def find(self, v: int) -> int:
//         if self.data[v] != v:
//             self.data[v] = self.find(self.data[v])
//         return self.data[v]

//     def uni(self, v1: int, v2: int):
//         p1 = self.find(v1)
//         p2 = self.find(v2)
//         if p1 != p2:
//             self.cnt[p1] += self.cnt[p2]
//             self.data[p2] = p1

//     def same(self, v1: int, v2: int):
//         return self.find(v1) == self.find(v2)


// def pos2Idx(x: int, y: int, size: int):
//     return x * size + y


// def idx2pox(idx: int, size: int) -> Tuple[int,  int]:
//     return (idx // size, idx % size)

// class Node:
//     def __init__(self, p: Tuple[int, int], b: Tuple[int, int]) -> None:
//         self.p = p
//         self.b = b

// class Solution:
//     def minPushBox(self, grid: List[List[str]]) -> int:
//         t, p, b = (0, 0), (0, 0), (0, 0)
//         n = len(grid)
//         m = len(grid[0])
//         used = defaultdict(dict)

//         def is_valid(v: Tuple[int, int]) -> bool:
//             return 0 <= v[0] < n and 0 <= v[1] < m

//         def is_same(a: Tuple[int, int], b: Tuple[int, int]):
//             return a[0] == b[0] and a[1] == b[1]

//         def get_uf(cur: Node) -> UnionFind:
//             uf = UnionFind(n * m)
//             for i in range(n):
//                 for j in range(m):
//                     if grid[i][j] == '.' and not is_same(cur.b, (i, j)):
//                         for k in range(4):
//                             ni = i + dirs[k][0]
//                             nj = j + dirs[k][1]
//                             if is_valid((ni, nj)) and grid[ni][nj] == '.' and not is_same(cur.b, (ni, nj)):
//                                 uf.uni(pos2Idx(i, j, m), pos2Idx(ni, nj, m))
//             return uf
//         for i in range(n):
//             for j in range(m):
//                 if grid[i][j] == 'T':
//                     t = (i, j)
//                     grid[i][j] = '.'
//                 elif grid[i][j] == 'B':
//                     b = (i, j)
//                     grid[i][j] = '.'
//                 elif grid[i][j] == 'S':
//                     p = (i, j)
//                     grid[i][j] = '.'
//         q = deque()
//         q.append(Node(p, b))
//         size = 1
//         step = 0
//         while len(q):
//             cur: Node = q.popleft()
//             if is_same(cur.b, t):
//                 return step
//             uf = get_uf(cur)
//             for k in range(4):
//                 ni = cur.b[0] + dirs[k][0]
//                 nj = cur.b[1] + dirs[k][1]
//                 bi = cur.b[0] - dirs[k][0]
//                 bj = cur.b[1] - dirs[k][1]
//                 pidx = pos2Idx(cur.p[0], cur.p[1], m)
//                 bidx = pos2Idx(cur.b[0], cur.b[1], m)
//                 if is_valid((ni, nj)) and grid[ni][nj] == '.' and is_valid((bi, bj)) and grid[bi][bj] == '.' and uf.same(pidx, pos2Idx(bi, bj, m)) and pos2Idx(ni, nj, m) not in used[bidx]:
//                     q.append(Node(cur.b, (ni, nj)))
//                     used[bidx][pos2Idx(ni, nj, m)] = True
//             size -= 1
//             if size == 0:
//                 size = len(q)
//                 step += 1
//         return -1`,
//     },
    {
      script: Script.RUST,
      time: 16,
      memory: 2.2,
      desc: '同上',
      code: `pub use std::collections::HashMap;
pub use std::collections::VecDeque;
pub const dirs: [[i32; 2]; 4] = [[0, 1], [0, -1], [1, 0], [-1, 0]];
pub struct UnionFind {
    n: usize,
    data: Vec<usize>,
    cnt: Vec<usize>,
}
impl UnionFind {
    pub fn new(n: usize) -> Self {
        let mut data = vec![0; n];
        for i in 0..data.len() {
            data[i] = i;
        }
        Self {
            n,
            data,
            cnt: vec![0; n],
        }
    }
    pub fn size(&mut self, v: usize) -> usize {
        let idx = self.find(v);
        self.cnt[idx]
    }
    pub fn find(&mut self, v: usize) -> usize {
        if self.data[v] != v {
            self.data[v] = self.find(self.data[v]);
        }
        self.data[v]
    }
    pub fn uni(&mut self, v1: usize, v2: usize) {
        let p1 = self.find(v1);
        let p2 = self.find(v2);
        if p1 != p2 {
            self.cnt[p1] += self.cnt[p2];
            self.data[p2] = p1;
        }
    }
    pub fn same(&mut self, v1: usize, v2: usize) -> bool {
        self.find(v1) == self.find(v2)
    }
}
pub fn pos2Idx(x: usize, y: usize, size: usize) -> usize {
    x * size + y
}
pub fn idx2Pos(idx: usize, size: usize) -> (usize, usize) {
    (idx / size, idx % size)
}

type Position = (usize, usize);

#[derive(Clone, Copy, Debug)]
struct Node {
    p: Position,
    b: Position,
}
impl Node {
    fn new(p: Position, b: Position) -> Self {
        Self { p, b }
    }
}

impl Solution {
    pub fn min_push_box(mut grid: Vec<Vec<char>>) -> i32 {
        let mut p: Position = (0, 0);
        let mut b: Position = (0, 0);
        let mut t: Position = (0, 0);
        let n = grid.len();
        let m = grid[0].len();
        let mut used = HashMap::<usize, HashMap<usize, bool>>::new();
        let is_same = |a: Position, b: Position| a.0 == b.0 && a.1 == b.1;
        let is_valid = |v: (i32, i32)| 0 <= v.0 && v.0 < n as i32 && 0 <= v.1 && v.1 < m as i32;
        let get_uf = |grid: &Vec<Vec<char>>, cur: Node| {
            let mut uf = UnionFind::new(n * m);
            for i in 0..n {
                for j in 0..m {
                    if grid[i][j] == '.' && !is_same(cur.b, (i, j)) {
                        for k in 0..4 {
                            let ni = i as i32 + dirs[k][0];
                            let nj = j as i32 + dirs[k][1];
                            if is_valid((ni, nj))
                                && grid[ni as usize][nj as usize] == '.'
                                && !is_same(cur.b, (ni as usize, nj as usize))
                            {
                                uf.uni(pos2Idx(i, j, m), pos2Idx(ni as usize, nj as usize, m));
                            }
                        }
                    }
                }
            }
            uf
        };
        for i in 0..n {
            for j in 0..m {
                let t1 = grid[i][j] == 'T';
                let t2 = grid[i][j] == 'B';
                let t3 = grid[i][j] == 'S';
                if t1 {
                    t = (i, j);
                    grid[i][j] = '.';
                } else if t2 {
                    b = (i, j);
                    grid[i][j] = '.';
                } else if t3 {
                    p = (i, j);
                    grid[i][j] = '.';
                }
            }
        }
        let mut q = VecDeque::<Node>::new();
        q.push_back(Node::new(p, b));
        let mut size = 1;
        let mut step = 0;
        while let Some(cur) = q.pop_front() {
            if is_same(cur.b, t) {
                return step;
            }
            let mut uf = get_uf(&grid, cur);
            for k in 0..4 {
                let ni = cur.b.0 as i32 + dirs[k][0];
                let nj = cur.b.1 as i32 + dirs[k][1];
                let bi = cur.b.0 as i32 - dirs[k][0];
                let bj = cur.b.1 as i32 - dirs[k][1];
                let pidx = pos2Idx(cur.p.0, cur.p.1, m);
                let bidx = pos2Idx(cur.b.0, cur.b.1, m);
                if is_valid((ni, nj))
                    && grid[ni as usize][nj as usize] == '.'
                    && is_valid((bi, bj))
                    && grid[bi as usize][bj as usize] == '.'
                    && uf.same(pidx, pos2Idx(bi as usize, bj as usize, m))
                {
                    if used.contains_key(&bidx)
                        && used.get(&bidx).unwrap().contains_key(&pos2Idx(
                            ni as usize,
                            nj as usize,
                            m,
                        ))
                    {
                        continue;
                    }
                    let ni = ni as usize;
                    let nj = nj as usize;
                    q.push_back(Node::new(cur.b, (ni, nj)));
                    let item = used.entry(bidx).or_insert(HashMap::new());
                    *item.entry(pos2Idx(ni, nj, m)).or_insert(false) = true;
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
}`,
    },
  ],
};

export default leetCodeMarkdown;
