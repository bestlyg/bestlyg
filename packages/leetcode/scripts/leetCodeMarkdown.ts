import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1054. 距离相等的条形码',
  url: 'https://leetcode.cn/problems/distant-barcodes/',
  difficulty: Difficulty.简单,
  tag: [],
  desc: `在一个仓库里，有一排条形码，其中第 i 个条形码为 barcodes[i]。请你重新排列这些条形码，使其中任意两个相邻的条形码不能相等。 你可以返回任何满足该要求的答案，此题保证存在答案。`,
  solutions: [
    //     {
    //       script: Script.TS,
    //       time: 76,
    //       memory: 45.9,
    //       desc: '哈希存储',
    //       code: `function findMaxK(nums: number[]): number {
    //     const set1 = new Set<number>();
    //     const set2 = new Set<number>();
    //     for (const num of nums) {
    //         if (set1.has(-num)) set2.add(Math.abs(num));
    //         set1.add(num);
    //     }
    //     return [...set2].sort((a, b) => b - a)[0] ?? -1;
    // }`,
    //       date: new Date('2022/10/16').getTime(),
    //     },
    {
      script: Script.CPP,
      time: 76,
      memory: 42.9,
      desc: '堆存储所有的值，每次拿出剩余次数最多的两个值塞入',
      code: `#define X first
#define Y second
class Solution {
public:
    typedef pair<int, int> pii;
    vector<int> rearrangeBarcodes(vector<int>& barcodes) {
        unordered_map<int, int> m;
        for (auto &num : barcodes) m[num]++;
        auto cmp = [&](pii x, pii y) -> bool { return x.second < y.second; };
        priority_queue<pii, vector<pii>, decltype(cmp)> q(cmp);
        for (auto &item : m) q.push(item);
        vector<int> res;
        while (q.size() >= 2) {
            auto item1 = q.top(); q.pop();
            auto item2 = q.top(); q.pop();
            if (--item1.second > 0) q.push(item1);
            if (--item2.second > 0) q.push(item2);
            res.push_back(item1.first);
            res.push_back(item2.first);
        }
        if (q.size()) res.push_back(q.top().first);
        return res;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 260,
      memory: 18.9,
      desc: '同上',
      code: `class Node:
    def __init__(self, k: int, v: int):
        self.k = k
        self.v = v

    def __lt__(self, o: 'Node') -> bool:
        return self.v > o.v


class Solution:
    def rearrangeBarcodes(self, barcodes: List[int]) -> List[int]:
        q = []
        m = Counter()
        for num in barcodes:
            m[num] += 1
        for k, v in m.items():
            heappush(q, Node(k, v))
        res = []
        while len(q) >= 2:
            item1 = heappop(q)
            item2 = heappop(q)
            item1.v -= 1
            if item1.v > 0:
                heappush(q, item1)
            item2.v -= 1
            if item2.v > 0:
                heappush(q, item2)
            res.append(item1.k)
            res.append(item2.k)
        if len(q):
            res.append(q[0].k)
        return res`,
    },
    {
      script: Script.RUST,
      time: 24,
      memory: 2.2,
      desc: '同上',
      code: `#[derive(Clone, PartialEq, Eq, Ord)]
struct Node(i32, i32);
impl Node {
    fn new(k: i32, v: i32) -> Self {
        Node(k, v)
    }
}
impl PartialOrd for Node {
    fn partial_cmp(&self, o: &Self) -> Option<std::cmp::Ordering> {
        self.1.partial_cmp(&o.1)
    }
}
impl Solution {
    pub fn rearrange_barcodes(barcodes: Vec<i32>) -> Vec<i32> {
        let mut q = std::collections::BinaryHeap::<Node>::new();
        let mut m = std::collections::HashMap::<i32, i32>::new();
        for num in barcodes {
            *m.entry(num).or_insert(0) += 1;
        }
        for (k, v) in m {
            q.push(Node::new(k, v));
        }
        let mut res = vec![];
        while q.len() >= 2 {
            let mut item1 = q.pop().unwrap();
            let mut item2 = q.pop().unwrap();
            res.push(item1.0);
            res.push(item2.0);
            item1.1 -= 1;
            item2.1 -= 1;
            if item1.1 > 0 {
                q.push(item1);
            }
            if item2.1 > 0 {
                q.push(item2);
            }
        }
        if !q.is_empty() {
            res.push(q.peek().unwrap().0);
        }
        res
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
