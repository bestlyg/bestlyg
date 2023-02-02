import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1129. 颜色交替的最短路径',
  url: 'https://leetcode.cn/problems/shortest-path-with-alternating-colors/',
  difficulty: Difficulty.困难,
  tag: [Tag.广度优先搜索, Tag.图],
  desc: `返回长度为 n 的数组 answer，其中 answer[X] 是从节点 0 到节点 X 的红色边和蓝色边交替出现的最短路径的长度。`,
  solutions: [
    {
      script: Script.CPP,
      time: 24,
      memory: 14.2,
      desc: 'bfs',
      code: `struct Node {
    vector<int> next[2];
};
typedef pair<int, int> pii;
class Solution {
public:
    vector<int> shortestAlternatingPaths(int n, vector<vector<int>>& redEdges, vector<vector<int>>& blueEdges) {
        vector<int> ans(n, -1);
        ans[0] = 0;
        vector<vector<bool>> cache(2, vector<bool>(n, false));
        vector<Node> list(n);
        for (auto &item : redEdges) list[item[0]].next[0].push_back(item[1]);
        for (auto &item : blueEdges) list[item[0]].next[1].push_back(item[1]);
        queue<pii> q;
        q.push(make_pair(0, -1));
        int l = 0, size = 1;
        while (q.size()) {
            pii cur = q.front();
            q.pop();
            for (int i = 0; i < 2; i++) {
                if (cur.second == i) continue;
                for (auto &next : list[cur.first].next[i]) {
                    if (cache[i][next]) continue;
                    cache[i][next] = true;
                    if (ans[next] == -1) ans[next] = l + 1;
                    q.push(make_pair(next, i));
                }
            }
            if (--size == 0) size = q.size(), l++;
        }
        return ans;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 52,
      memory: 15.2,
      desc: '同上',
      code: `from queue import Queue
class Node:
    def __init__(self) -> None:
        self.next = [[] for _ in range(2)]
class Solution:
    def shortestAlternatingPaths(self, n: int, redEdges: List[List[int]], blueEdges: List[List[int]]) -> List[int]:
        ans = [-1] * n
        ans[0] = 0
        cache = [[False] * n for _ in range(2)]
        list = [Node() for _ in range(n)]
        for [v1, v2] in redEdges:
            list[v1].next[0].append(v2)
        for [v1, v2] in blueEdges:
            list[v1].next[1].append(v2)
        q = Queue()
        q.put((0, -1))
        l, size = 0, 1
        while not q.empty():
            (node, color) = q.get()
            size -= 1
            for i in range(2):
                if color == i:
                    continue
                for val in list[node].next[i]:
                    if cache[i][val]:
                        continue
                    cache[i][val] = True
                    if ans[val] == -1:
                        ans[val] = l + 1
                    q.put((val, i))
            if size == 0:
                size = q.qsize()
                l += 1
        return ans`,
    },
    {
      script: Script.RUST,
      time: 4,
      memory: 2.3,
      desc: '同上',
      code: `#[derive(Clone)]
struct Node {
    next: Vec<Vec<i32>>,
}
impl Node {
    fn new() -> Self {
        Self {
            next: vec![vec![]; 2],
        }
    }
}

impl Solution {
    pub fn shortest_alternating_paths(
        n: i32,
        red_edges: Vec<Vec<i32>>,
        blue_edges: Vec<Vec<i32>>,
    ) -> Vec<i32> {
        let n = n as usize;
        let mut ans = vec![-1; n];
        ans[0] = 0;
        let mut cache = vec![vec![false; n]; 2];
        let mut list = vec![Node::new(); n];
        for item in red_edges {
            list[item[0] as usize].next[0].push(item[1]);
        }
        for item in blue_edges {
            list[item[0] as usize].next[1].push(item[1]);
        }
        use std::collections::VecDeque;
        let mut q = VecDeque::<(usize, usize)>::new();
        q.push_back((0, 2));
        let (mut l, mut size) = (0, 1);
        while !q.is_empty() {
            let (node, color) = q.pop_front().unwrap();
            for i in 0..2 {
                if color == i {
                    continue;
                }
                for next in list[node].next[i].iter() {
                    let next = *next as usize;
                    if cache[i][next] {
                        continue;
                    }
                    cache[i][next] = true;
                    if ans[next] == -1 {
                        ans[next] = l + 1;
                    }
                    q.push_back((next, i));
                }
            }
            size -= 1;
            if size == 0 {
                size = q.len();
                l += 1
            }
        }
        ans
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
