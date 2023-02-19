import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1792. 最大平均通过率',
  url: 'https://leetcode.cn/problems/maximum-average-pass-ratio/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `请你返回在安排这 extraStudents 个学生去对应班级后的 最大 平均通过率。`,
  solutions: [
    {
      script: Script.CPP,
      time: 844,
      memory: 85.8,
      desc: '堆，按增长幅度排序',
      code: `class Solution {
    public:
        typedef pair<int, int> node;
        double maxAverageRatio(vector<vector<int>>& classes, int extraStudents) {
            double ans = 0.0;
            auto cmp = [&](node x, node y) -> bool {
                double v1 = 1.0 * (x.first + 1) / (x.second + 1) - 1.0 * x.first / x.second,
                       v2 = 1.0 * (y.first + 1) / (y.second + 1) - 1.0 * y.first / y.second;
                return v1 < v2;
            };
            priority_queue<node, vector<node>, decltype(cmp)> q(cmp);
            for (auto &item : classes) q.push(make_pair(item[0], item[1]));
            while (extraStudents--) {
                node item = q.top(); q.pop();
                item.first += 1;
                item.second += 1;
                q.push(item);
            }
            while (q.size()) {
                node item = q.top(); q.pop();
                ans += 1.0 * item.first / item.second;
            }
            return ans / classes.size();
        }
    };`,
    },
    {
      script: Script.PY3,
      time: 8748,
      memory: 48.4,
      desc: '同上',
      code: `class Node:
    def __init__(self, x: int, y: int):
        self.x = x
        self.y = y

    def __lt__(self, o: 'Node') -> bool:
        v1 = (self.x + 1) / (self.y + 1) - self.x / self.y
        v2 = (o.x + 1) / (o.y + 1) - o.x / o.y
        return v1 > v2

class Solution:
    def maxAverageRatio(self, classes: List[List[int]], extraStudents: int) -> float:
        heap = [Node(item[0], item[1]) for item in classes]
        heapify(heap)
        for _ in range(extraStudents):
            heapreplace(heap, Node(heap[0].x + 1, heap[0].y + 1))
        return sum(item.x / item.y for item in heap) / len(classes)`,
    },
    {
      script: Script.RUST,
      time: 424,
      memory: 10,
      desc: '同上',
      code: `#[derive(Clone, PartialEq, Eq, Ord)]
struct Node {
    x: i32,
    y: i32,
}
impl Node {
    fn new(x: i32, y: i32) -> Self {
        Node { x, y }
    }
    fn inc_val(&self) -> f64 {
        ((self.x + 1) as f64) / ((self.y + 1) as f64) - (self.x as f64) / (self.y as f64)
    }
    fn val(&self) -> f64 {
        (self.x as f64) / (self.y as f64)
    }
}
impl PartialOrd for Node {
    fn partial_cmp(&self, o: &Self) -> Option<std::cmp::Ordering> {
        self.inc_val().partial_cmp(&o.inc_val())
    }
}
impl Solution {
    pub fn max_average_ratio(classes: Vec<Vec<i32>>, extra_students: i32) -> f64 {
        use std::collections::BinaryHeap;
        let mut heap = BinaryHeap::<Node>::new();
        for item in classes.iter() {
            heap.push(Node::new(item[0], item[1]));
        }
        for _ in 0..extra_students {
            let mut node = heap.pop().unwrap();
            node.x += 1;
            node.y += 1;
            heap.push(node);
        }
        let mut res: f64 = 0.0;
        while let Some(node) = heap.pop() {
            res += node.val();
        }
        res / classes.len() as f64
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;