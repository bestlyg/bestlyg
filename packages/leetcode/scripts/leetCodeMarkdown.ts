import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '6366. 在网格图中访问一个格子的最少时间',
  url: 'https://leetcode.cn/problems/minimum-time-to-visit-a-cell-in-a-grid//',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `你从 最左上角 出发，出发时刻为 0 ，你必须一直移动到上下左右相邻四个格子中的 任意 一个格子（即不能停留在格子上）。每次移动都需要花费 1 单位时间。请你返回 最早 到达右下角格子的时间，如果你无法到达右下角的格子，请你返回 -1 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 384,
      memory: 46.2,
      desc: '优先队列，找最先可以触达的时间',
      code: `struct Node {
    int row, col, time;
    Node(int row, int col, int time): row(row), col(col), time(time) {}
};
vector<vector<int>> dirs = { {0, 1}, {0, -1}, {1, 0}, {-1, 0} };
class Solution {
public:
    int minimumTime(vector<vector<int>>& grid) {
        int n = grid.size(), m = grid[0].size();
        if (grid[0][1] > 1 && grid[1][0] > 1) return -1;
        auto cmp = [&](Node &x, Node &y) -> bool { return x.time > y.time; };
        priority_queue<Node, vector<Node>, decltype(cmp)> q(cmp);
        q.push(Node(0, 0, 0));
        bool cache[1005][1005] = {0};
        cache[0][0] = true;
        while (q.size()) {
            Node cur = q.top();
            if (cur.row == n - 1 && cur.col == m - 1) return cur.time;
            q.pop();
            for (auto &dir : dirs) {
                int nrow = cur.row + dir[0], ncol = cur.col + dir[1];
                if (nrow < 0 || nrow >= n || ncol < 0 || ncol >= m) continue;
                int time = cur.time + 1;
                if (grid[nrow][ncol] > time) {
                    int minus = (grid[nrow][ncol] - time + 1) / 2;
                    time = cur.time + minus * 2 + 1;
                }
                if (cache[nrow][ncol]) continue;
                cache[nrow][ncol] = true;
                q.push(Node(nrow, ncol, time));
            }
        }
        return -1;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 2076,
      memory: 37.1,
      desc: '同上',
      code: `dirs = [(0, 1), (1, 0), (0, -1), (-1, 0)]
    
    class Node:
        def __init__(self, row: int, col: int, time: int):
            self.row = row
            self.col = col
            self.time = time
    
        def __lt__(self, o: 'Node') -> bool:
            return self.time < o.time
    
    class Solution:
        def minimumTime(self, grid: List[List[int]]) -> int:
            n, m = len(grid), len(grid[0])
            if grid[0][1] > 1 and grid[1][0] > 1:
                return -1
            q = []
            heappush(q, Node(0, 0, 0))
            cache = [[0] * 1005 for _ in range(1005)]
            cache[0][0] = 1
            while True:
                cur: Node = heappop(q)
                if cur.row == n - 1 and cur.col == m - 1:
                    return cur.time
                for (i, j) in dirs:
                    nrow = cur.row + i
                    ncol = cur.col + j
                    if 0 <= nrow < n and 0 <= ncol < m:
                        time = cur.time + 1
                        if grid[nrow][ncol] > time:
                            minus = (grid[nrow][ncol] - time + 1) // 2
                            time = cur.time + minus * 2 + 1
                        if cache[nrow][ncol]:
                            continue
                        cache[nrow][ncol] = 1
                        heappush(q, Node(nrow, ncol, time))`,
    },
    {
      script: Script.RUST,
      time: 72,
      memory: 5.1,
      desc: '同上',
      code: `const dirs: [[i32; 2]; 4] = [[0, 1], [0, -1], [1, 0], [-1, 0]];
use std::cell::RefCell;
use std::collections::HashMap;
use std::rc::Rc;
#[derive(Clone, PartialEq, Eq, Ord)]
struct Node {
    row: usize,
    col: usize,
    time: i32,
}
impl Node {
    fn new(row: usize, col: usize, time: i32) -> Self {
        Node { row, col, time }
    }
}
impl PartialOrd for Node {
    fn partial_cmp(&self, o: &Self) -> Option<std::cmp::Ordering> {
        o.time.partial_cmp(&self.time)
    }
}

impl Solution {
    pub fn minimum_time(grid: Vec<Vec<i32>>) -> i32 {
        let n = grid.len();
        let m = grid[0].len();
        if grid[0][1] > 1 && grid[1][0] > 1 {
            -1
        } else {
            let mut q = std::collections::BinaryHeap::<Node>::new();
            q.push(Node::new(0, 0, 0));
            let mut cache = [[false; 1005]; 1005];
            cache[0][0] = true;
            loop {
                let cur = q.pop().unwrap();
                if cur.row == n - 1 && cur.col == m - 1 {
                    return cur.time;
                }
                for dir in dirs {
                    let nrow = cur.row as i32 + dir[0];
                    let ncol = cur.col as i32 + dir[1];
                    if nrow < 0 || nrow >= n as i32 || ncol < 0 || ncol >= m as i32 {
                        continue;
                    }
                    let mut time = cur.time + 1;
                    let nrow = nrow as usize;
                    let ncol = ncol as usize;
                    if grid[nrow][ncol] > time {
                        let minus = (grid[nrow][ncol] - time + 1) / 2;
                        time = cur.time + minus * 2 + 1;
                    }
                    if cache[nrow][ncol] {
                        continue;
                    }
                    cache[nrow][ncol] = true;
                    q.push(Node::new(nrow, ncol, time));
                }
            }
        }
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
