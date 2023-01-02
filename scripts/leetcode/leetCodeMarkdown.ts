import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '1801. 积压订单中的订单总数',
  url: 'https://leetcode.cn/problems/closest-prime-numbers-in-range/',
  difficulty: Difficulty.中等,
  tag: [],
  desc: `请你返回正整数数组 ans = [nums1, nums2] 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 188,
      memory: 57.2,
      desc: '模拟',
      code: `typedef pair<int, int> node;
#define X              first
#define Y              second
struct cmp {
    int type;
    cmp(int type): type(type) {}
    bool operator()(node &a, node &b) {
        if (type) return a.X < b.X;
        else return a.X > b.X;
    }
};
int mod = 1e9 + 7;
class Solution {
public:
    int getNumberOfBacklogOrders(vector<vector<int>>& orders) {
        priority_queue<node, vector<node>, cmp> buyq(cmp(1));
        priority_queue<node, vector<node>, cmp> sellq(cmp(0));
        for (auto &order : orders) {
            if (order[2] == 0) {
                node cur = make_pair(order[0], order[1]);
                while (cur.Y && sellq.size() && sellq.top().X <= cur.X) {
                    if (sellq.top().Y > cur.Y) {
                        auto v = sellq.top();
                        sellq.pop();
                        v.Y -= cur.Y;
                        sellq.push(v);
                        cur.Y = 0;
                    } else if (sellq.top().Y < cur.Y) {
                        cur.Y -= sellq.top().Y;
                        sellq.pop();
                    } else {
                        cur.Y = 0;
                        sellq.pop();
                    }
                }
                if (cur.Y) buyq.push(cur);
            } else {
                node cur = make_pair(order[0], order[1]);
                while (cur.Y && buyq.size() && buyq.top().X >= cur.X) {
                    if (buyq.top().Y > cur.Y) {
                        auto v = buyq.top();
                        buyq.pop();
                        v.Y -= cur.Y;
                        buyq.push(v);
                        cur.Y = 0;
                    } else if (buyq.top().Y < cur.Y) {
                        cur.Y -= buyq.top().Y;
                        buyq.pop();
                    } else {
                        cur.Y = 0;
                        buyq.pop();
                    }
                }
                if (cur.Y) sellq.push(cur);
            }
        }
        int ans = 0;
        while (buyq.size()) ans = (ans + buyq.top().Y) % mod, buyq.pop();
        while (sellq.size()) ans = (ans + sellq.top().Y) % mod, sellq.pop();
        return ans;
    }
};`,
    },
    {
      script: Script.CPP,
      time: 200,
      memory: 57.2,
      desc: '同上',
      code: `typedef pair<int, int> node;
#define X              first
#define Y              second
struct cmp {
    int type;
    cmp(int type): type(type) {}
    bool operator()(node &a, node &b) {
        if (type) return a.X < b.X;
        else return a.X > b.X;
    }
};
int mod = 1e9 + 7;
class Solution {
public:
    int getNumberOfBacklogOrders(vector<vector<int>>& orders) {
        priority_queue<node, vector<node>, cmp> buyq(cmp(1));
        priority_queue<node, vector<node>, cmp> sellq(cmp(0));
        for (auto &order : orders) {
            auto &q1 = order[2] == 0 ? sellq : buyq,
                 &q2 = order[2] == 0 ? buyq  : sellq;
            node cur = make_pair(order[0], order[1]);
            while (cur.Y && q1.size() && (order[2] == 0 ? q1.top().X <= cur.X : q1.top().X >= cur.X)) {
                if (q1.top().Y > cur.Y) {
                    auto v = q1.top();
                    q1.pop();
                    v.Y -= cur.Y;
                    q1.push(v);
                    cur.Y = 0;
                } else if (q1.top().Y < cur.Y) {
                    cur.Y -= q1.top().Y;
                    q1.pop();
                } else {
                    cur.Y = 0;
                    q1.pop();
                }
            }
            if (cur.Y) q2.push(cur);/
        }
        int ans = 0;
        while (buyq.size()) ans = (ans + buyq.top().Y) % mod, buyq.pop();
        while (sellq.size()) ans = (ans + sellq.top().Y) % mod, sellq.pop();
        return ans;
    }
};`,
    },
    {
      script: Script.RUST,
      time: 24,
      memory: 9.5,
      desc: '同上',
      code: `use std::{cmp::Ordering, collections::BinaryHeap};
struct Node(i32, i32, bool);
impl PartialEq for Node {
    fn eq(&self, other: &Self) -> bool {
        self.0 == other.0
    }
}
impl Eq for Node {}
impl Ord for Node {
    fn cmp(&self, other: &Self) -> std::cmp::Ordering {
        if self.2 {
            self.0.cmp(&other.0)
        } else {
            other.0.cmp(&self.0)
        }
    }
}
impl PartialOrd for Node {
    fn partial_cmp(&self, other: &Self) -> Option<std::cmp::Ordering> {
        if self.2 {
            self.0.partial_cmp(&other.0)
        } else {
            other.0.partial_cmp(&self.0)
        }
    }
}
const mode: i32 = 1000000000 + 7;
impl Solution {
    pub fn get_number_of_backlog_orders(orders: Vec<Vec<i32>>) -> i32 {
        let mut buy_heap = BinaryHeap::<Node>::new();
        let mut sell_heap = BinaryHeap::<Node>::new();
        for order in orders {
            if order[2] == 0 {
                let mut cur = Node(order[0], order[1], order[2] == 0);
                while cur.1 > 0 && !buy_heap.is_empty() && buy_heap.peek().unwrap().0 <= cur.0 {
                    if buy_heap.peek().unwrap().1 > cur.1 {
                        let mut node = buy_heap.pop().unwrap();
                        node.1 -= cur.1;
                        buy_heap.push(node);
                        cur.1 = 0;
                    } else if buy_heap.peek().unwrap().1 < cur.1 {
                        cur.1 -= buy_heap.pop().unwrap().1;
                    } else {
                        cur.1 = 0;
                        buy_heap.pop();
                    }
                }
                if cur.1 > 0 {
                    sell_heap.push(cur);
                };
            } else {
                let mut cur = Node(order[0], order[1], order[2] == 0);
                while cur.1 > 0 && !sell_heap.is_empty() && sell_heap.peek().unwrap().0 >= cur.0 {
                    if sell_heap.peek().unwrap().1 > cur.1 {
                        let mut node = sell_heap.pop().unwrap();
                        node.1 -= cur.1;
                        sell_heap.push(node);
                        cur.1 = 0;
                    } else if sell_heap.peek().unwrap().1 < cur.1 {
                        cur.1 -= sell_heap.pop().unwrap().1;
                    } else {
                        cur.1 = 0;
                        sell_heap.pop();
                    }
                }
                if cur.1 > 0 {
                    buy_heap.push(cur);
                };
            }
        }
        let mut ans = 0;
        while !buy_heap.is_empty() {
            ans = (ans + buy_heap.pop().unwrap().1) % mode;
        }
        while !sell_heap.is_empty() {
            ans = (ans + sell_heap.pop().unwrap().1) % mode;
        }
        ans
    }
}`,
    },
  ],
};
export default leetCodeMarkdown;
