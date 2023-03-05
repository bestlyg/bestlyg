import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1599. 经营摩天轮的最大利润',
  url: 'https://leetcode.cn/problems/maximum-profit-of-operating-a-centennial-wheel//',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `返回最大化利润所需执行的 最小轮转次数 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 100,
      memory: 79.5,
      desc: '模拟',
      code: `class Solution {
public:
    int minOperationsMaxProfit(vector<int>& customers, int boardingCost, int runningCost) {
        int resMax = 0, resCnt = -1, wait = 0, cur = 0, i = 0;
        while (wait != 0 || i < customers.size()) {
            if (i < customers.size()) wait += customers[i];
            cur += min(wait, 4) * boardingCost - runningCost;
            wait = max(wait - 4, 0);
            if (cur > resMax) resMax = cur, resCnt = i + 1;
            i += 1;
        }
        return resCnt;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 1656,
      memory: 19.1,
      desc: '同上',
      code: `
    class Solution:
        def minOperationsMaxProfit(self, customers: List[int], boardingCost: int, runningCost: int) -> int:
            resMax, resCnt = 0, -1
            wait, cur, i = 0, 0, 0
            while wait != 0 or i < len(customers):
                if i < len(customers):
                    wait += customers[i]
                cur += min(wait, 4) * boardingCost - runningCost
                wait = max(wait - 4, 0)
                if cur > resMax:
                    resMax = cur
                    resCnt = i + 1
                i += 1
            return resCnt`,
    },
    {
      script: Script.RUST,
      time: 24,
      memory: 2.8,
      desc: '同上',
      code: `impl Solution {
    pub fn min_operations_max_profit(
        customers: Vec<i32>,
        boarding_cost: i32,
        running_cost: i32,
    ) -> i32 {
        let (mut resMax, mut resCnt, mut wait, mut cur, mut i) = (0, -1, 0, 0, 0);
        while wait != 0 || i < customers.len() {
            if i < customers.len() {
                wait += customers[i];
            }
            cur += wait.min(4) * boarding_cost - running_cost;
            wait = 0.max(wait - 4);
            if cur > resMax {
                resMax = cur;
                resCnt = i as i32 + 1;
            }
            i += 1;
        }
        resCnt
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
