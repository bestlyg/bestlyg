import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1210.穿过迷宫的最少移动次数',
  url: 'https://leetcode.cn/problems/minimum-moves-to-reach-target-with-rotations/',
  difficulty: Difficulty.困难,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `返回蛇抵达目的地所需的最少移动次数。`,
  solutions: [
    {
      script: Script.CPP,
      time: 24,
      memory: 12.9,
      desc: 'bfs',
      code: `struct Node {
    int x, y, dir;
    Node(int x, int y, int dir): x(x), y(y), dir(dir) {}
};
class Solution {
public:
    int minimumMoves(vector<vector<int>>& grid) {
        int n = grid.size();
        bool cache[n][n][2];
        memset(cache, false, sizeof(bool) * n * n * 2);
        cache[0][0][0] = true;
        queue<Node> q;
        q.push(Node(0, 0, 0));
        int step = 0, size = 1;
        while (q.size()) {
            Node node = q.front();
            q.pop();
            int x = node.x, y = node.y, dir = node.dir;
            if (x == n - 1 && y == n - 2 && dir == 0) return step;
            if (dir == 0 && y + 2 < n && grid[x][y + 2] == 0 && !cache[x][y + 1][0]) {
                q.push(Node(x, y + 1, 0));
                cache[x][y + 1][0] = true;
            }
            if (dir == 0 && x + 1 < n && grid[x + 1][y + 1] == 0 && grid[x + 1][y] == 0 && !cache[x][y][1]) {
                q.push(Node(x, y, 1));
                cache[x][y][1] = true;
            }
            if (dir == 0 && x + 1 < n && grid[x + 1][y] == 0 && grid[x + 1][y + 1] == 0 && !cache[x + 1][y][0]) {
                q.push(Node(x + 1, y, 0));
                cache[x + 1][y][0] = true;
            }

            if (dir == 1 && x + 2 < n && grid[x + 2][y] == 0 && !cache[x + 1][y][1]) {
                q.push(Node(x + 1, y, 1));
                cache[x + 1][y][1] = true;
            }
            if (dir == 1 && y + 1 < n && grid[x + 1][y + 1] == 0 && grid[x][y + 1] == 0 && !cache[x][y][0]) {
                q.push(Node(x, y, 0));
                cache[x][y][0] = true;
            }
            if (dir == 1 && y + 1 < n && grid[x + 1][y + 1] == 0 && grid[x][y + 1] == 0 && !cache[x][y + 1][1]) {
                q.push(Node(x, y + 1, 1));
                cache[x][y + 1][1] = true;
            }
            if (--size == 0) step += 1, size = q.size();
        }
        return -1;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 364,
      memory: 16.4,
      desc: '同上',
      code: `from queue import Queue
class Solution:
    def minimumMoves(self, grid: List[List[int]]) -> int:
        n = len(grid)
        cache = [[[False for _ in range(2)] for _ in range(n)] for _ in range(n)]
        cache[0][0][0] = True
        q = Queue()
        q.put((0, 0, 0))
        step, size = 0, 1
        while q.qsize():
            (x, y, d) = q.get()
            if x == n - 1 and y == n - 2 and d == 0:
                return step
            if d == 0 and y + 2 < n and grid[x][y + 2] == 0 and not cache[x][y + 1][0]:
                q.put((x, y + 1, 0))
                cache[x][y + 1][0] = True
            if d == 0 and x + 1 < n and grid[x + 1][y + 1] == 0 and grid[x + 1][y] == 0 and not cache[x][y][1]:
                q.put((x, y, 1))
                cache[x][y][1] = True
            if d == 0 and x + 1 < n and grid[x + 1][y] == 0 and grid[x + 1][y + 1] == 0 and not cache[x + 1][y][0]:
                q.put((x + 1, y, 0))
                cache[x + 1][y][0] = True
            if d == 1 and x + 2 < n and grid[x + 2][y] == 0 and not cache[x + 1][y][1]:
                q.put((x + 1, y, 1))
                cache[x + 1][y][1] = True
            if d == 1 and y + 1 < n and grid[x + 1][y + 1] == 0 and grid[x][y + 1] == 0 and not cache[x][y][0]:
                q.put((x, y, 0))
                cache[x][y][0] = True
            if d == 1 and y + 1 < n and grid[x + 1][y + 1] == 0 and grid[x][y + 1] == 0 and not cache[x][y + 1][1]:
                q.put((x, y + 1, 1))
                cache[x][y + 1][1] = True
            size -= 1
            if size == 0:
                 step += 1
                 size = q.qsize()
        return -1`,
    },
    {
      script: Script.RUST,
      time: 4,
      memory: 2.7,
      desc: '同上',
      code: `impl Solution {
    pub fn minimum_moves(grid: Vec<Vec<i32>>) -> i32 {
        use std::collections::VecDeque;
        let n = grid.len();
        let mut cache = vec![vec![vec![false; 2]; n]; n];
        cache[0][0][0] = true;
        let mut q = VecDeque::<(usize, usize, usize)>::new();
        q.push_back((0, 0, 0));
        let (mut step, mut size) = (0, 1);
        while !q.is_empty() {
            let (x, y, dir) = q.pop_front().unwrap();
            if x == n - 1 && y == n - 2 && dir == 0 {
                return step;
            }
            if dir == 0 && y + 2 < n && grid[x][y + 2] == 0 && !cache[x][y + 1][0] {
                q.push_back((x, y + 1, 0));
                cache[x][y + 1][0] = true;
            }
            if dir == 0
                && x + 1 < n
                && grid[x + 1][y + 1] == 0
                && grid[x + 1][y] == 0
                && !cache[x][y][1]
            {
                q.push_back((x, y, 1));
                cache[x][y][1] = true;
            }
            if dir == 0
                && x + 1 < n
                && grid[x + 1][y] == 0
                && grid[x + 1][y + 1] == 0
                && !cache[x + 1][y][0]
            {
                q.push_back((x + 1, y, 0));
                cache[x + 1][y][0] = true;
            }
            if dir == 1 && x + 2 < n && grid[x + 2][y] == 0 && !cache[x + 1][y][1] {
                q.push_back((x + 1, y, 1));
                cache[x + 1][y][1] = true;
            }
            if dir == 1
                && y + 1 < n
                && grid[x + 1][y + 1] == 0
                && grid[x][y + 1] == 0
                && !cache[x][y][0]
            {
                q.push_back((x, y, 0));
                cache[x][y][0] = true;
            }
            if dir == 1
                && y + 1 < n
                && grid[x + 1][y + 1] == 0
                && grid[x][y + 1] == 0
                && !cache[x][y + 1][1]
            {
                q.push_back((x, y + 1, 1));
                cache[x][y + 1][1] = true;
            }
            size -= 1;
            if size == 0 {
                step += 1;
                size = q.len();
            }
        }
        -1
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
