import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '6378. 最小化旅行的价格总和',
  url: 'https://leetcode.cn/problems/minimize-the-total-price-of-the-trips/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `现有一棵无向、无根的树，树中有 n 个节点，按从 0 到 n - 1 编号。给你一个整数 n 和一个长度为 n - 1 的二维整数数组 edges ，其中 edges[i] = [ai, bi] 表示树中节点 ai 和 bi 之间存在一条边。每个节点都关联一个价格。给你一个整数数组 price ，其中 price[i] 是第 i 个节点的价格。给定路径的 价格总和 是该路径上所有节点的价格之和。另给你一个二维整数数组 trips ，其中 trips[i] = [starti, endi] 表示您从节点 starti 开始第 i 次旅行，并通过任何你喜欢的路径前往节点 endi 。在执行第一次旅行之前，你可以选择一些 非相邻节点 并将价格减半。返回执行所有旅行的最小价格总和。`,
  solutions: [
    {
      script: Script.CPP,
      time: 760,
      memory: 241.1,
      desc: '树dp，记录选当前点和不选时的打折价格',
      code: `#define pii pair<int, int>
    #define X first
    #define Y second
    struct Node {
        int idx, price;
        vector<int> next;
    };
    struct QNode {
        int i, sum;
        vector<int> list;
    };
    class Solution {
    public:
        int minimumTotalPrice(int n, vector<vector<int>>& edges, vector<int>& price, vector<vector<int>>& trips) {
            vector<Node> list(n);
            for (int i = 0; i < n; i++) {
                list[i].idx = i;
                list[i].price = price[i];
            }
            for (auto &edge : edges) {
                list[edge[0]].next.push_back(edge[1]);
                list[edge[1]].next.push_back(edge[0]);
            }
            // 记录所有路径
            vector<vector<QNode>> roads(n, vector<QNode>(n));
            for (int i = 0; i < n; i++) {
                roads[i][i] = QNode{ i, list[i].price, vector<int>(1, i)};
                queue<QNode> q;
                q.push(QNode{ i, list[i].price, vector<int>(1, i)});
                unordered_set<int> used;
                used.insert(i);
                while (q.size()) {
                    auto cur = q.front();
                    q.pop();
                    for (auto &next : list[cur.i].next) {
                        if (used.count(next)) continue;
                        used.insert(next);
                        auto nextNode = cur;
                        nextNode.i = next;
                        nextNode.sum += list[next].price;
                        nextNode.list.push_back(next);
                        roads[i][next] = nextNode;
                        q.push(nextNode);
                    }
                }
            }
            // 记录不打折时总价，和每个点会被遍历几次
            int sums = 0, res = 0x7fffffff;
            vector<int> weights(n, 0);
            for (auto &trip : trips) {
                sums += roads[trip[0]][trip[1]].sum;
                for (auto &item : roads[trip[0]][trip[1]].list) {
                    weights[item]++;
                }
            }
            // X 记录这个点选的时候最多能打多少
            // Y 记录这个点不选的时候最多能打多少
            unordered_set<int> used;
            function<pii(int)> discount = [&](int start) -> pii {
                pii res = make_pair(list[start].price / 2 * weights[start], 0);
                for (auto &next : list[start].next) {
                    if (used.count(next)) continue;
                    used.insert(next);
                    auto nextRes = discount(next);
                    res.X += nextRes.Y;                
                    res.Y += max(nextRes.X, nextRes.Y);
                    used.erase(next);
                }
                return res;
            };
            used.insert(0);
            auto disres = discount(0);
            res = min(res, sums - max(disres.X, disres.Y));
            used.erase(0);
            return res;
        }
    };`,
    },
    {
      script: Script.PY3,
      time: 48,
      memory: 15,
      desc: '同上',
      code: `class Solution:
    def addMinimum(self, word: str) -> int:
        n = len(word)
        res = need = 0
        for i in range(n):
            c = ord(word[i]) - ord('a')
            if c == need:
                need = (need + 1) % 3
                continue
            if need == 0:
                if c == 1:
                    res += 1
                if c == 2:
                    res += 2
            if need == 1:
                if c == 0:
                    res += 2
                if c == 2:
                    res += 1
            if need == 2:
                if c == 0:
                    res += 1
                if c == 1:
                    res += 2
            need = (c + 1) % 3
        if need != 0:
            if need == 1:
                res += 2
            elif need == 2:
                res += 1
        return res`,
    },
    {
      script: Script.RUST,
      time: 4,
      memory: 1.9,
      desc: '同上',
      code: `impl Solution {
    pub fn add_minimum(word: String) -> i32 {
        let n = word.len();
        let mut res = 0;
        let mut need = 0;
        for c in word.as_bytes() {
            let c = c - b'a';
            if c == need {
                need = (need + 1) % 3;
                continue;
            }
            if need == 0 {
                if c == 1 {
                    res += 1;
                } else if c == 2 {
                    res += 2;
                }
            }
            if need == 1 {
                if c == 0 {
                    res += 2;
                } else if c == 2 {
                    res += 1;
                }
            }
            if need == 2 {
                if c == 0 {
                    res += 1;
                } else if c == 1 {
                    res += 2;
                }
            }
            need = (c + 1) % 3;
        }
        if need != 0 {
            if need == 1 {
                res += 2;
            } else if need == 2 {
                res += 1;
            }
        }
        res
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
