import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '2347. 最好的扑克手牌',
  url: 'https://leetcode.cn/problems/best-poker-hand/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `请你返回一个字符串，表示给定的 5 张牌中，你能组成的 最好手牌类型 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 10,
      desc: '遍历',
      code: `class Solution {
public:
    string bestHand(vector<int>& ranks, vector<char>& suits) {
        unordered_map<int, int> m;
        for (auto &v : suits) {
            m[v] += 1;
            if (m[v] == 5) return "Flush";
        }
        m.clear();
        for (auto &v : ranks) {
            m[v] += 1;
            if (m[v] >= 3) return "Three of a Kind";
        }
        for (auto &item : m) {
            if (item.second >= 2) return "Pair";
        }
        return "High Card";
    }
};`,
    },
    {
      script: Script.PY3,
      time: 44,
      memory: 15,
      desc: '同上',
      code: `class Solution:
    def bestHand(self, ranks: List[int], suits: List[str]) -> str:
        n = len(set(suits))
        if n == 1:
            return 'Flush'
        c = Counter(ranks)
        if len(c) == 5:
            return 'High Card'
        for _, v in c.items():
            if v >= 3:
                return 'Three of a Kind'
        return 'Pair'`,
    },
    {
      script: Script.RUST,
      time: 0,
      memory: 2.1,
      desc: '同上',
      code: `impl Solution {
    pub fn best_hand(ranks: Vec<i32>, suits: Vec<char>) -> String {
        use std::collections::HashMap;
        let mut m = HashMap::<i32, i32>::new();
        for v in suits {
            let v = v as i32;
            let item = m.entry(v).or_insert(0);
            *item += 1;
            if *item == 5 {
                return "Flush".to_string();
            }
        }
        m.clear();
        for v in ranks {
            let item = m.entry(v).or_insert(0);
            *item += 1;
            if *item >= 3 {
                return "Three of a Kind".to_string();
            }
        }
        for (_, v) in m {
            if v >= 2 {
                return "Pair".to_string();
            }
        }
        "High Card".to_string()
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
