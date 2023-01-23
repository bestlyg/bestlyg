import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '2303. 计算应缴税款总额',
  url: 'https://leetcode.cn/problems/calculate-amount-paid-in-taxes/',
  difficulty: Difficulty.简单,
  tag: [Tag.数组, Tag.模拟],
  desc: `给你一个整数 income 表示你的总收入。返回你需要缴纳的税款总额。`,
  solutions: [
    {
      script: Script.CPP,
      time: 12,
      memory: 13,
      desc: '遍历',
      code: `class Solution {
public:
    double calculateTax(vector<vector<int>>& brackets, int income) {
        double ans = 0.0;
        for (int i = 0, prev = 0; i < brackets.size() && prev <= income; prev = brackets[i++][0])
            ans += 1.0 * (min(income, brackets[i][0]) - prev) * brackets[i][1] / 100;
        return ans;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 48,
      memory: 15,
      desc: '同上',
      code: `class Solution:
    def calculateTax(self, brackets: List[List[int]], income: int) -> float:
        ans = 0.0
        prev = 0
        for [k, v] in brackets:
            if prev > income:
                break
            ans += (min(income, k) - prev) * v / 100
            prev = k
        return ans`,
    },
    {
      script: Script.RUST,
      time: 0,
      memory: 2.2,
      desc: '同上',
      code: `impl Solution {
    pub fn calculate_tax(brackets: Vec<Vec<i32>>, income: i32) -> f64 {
        let mut ans = 0f64;
        let mut prev = 0;
        for item in brackets {
            if prev > income {
                break;
            } else {
                ans += ((income.min(item[0]) - prev) * item[1]) as f64 / 100f64;
            }
            prev = item[0]
        }
        ans
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
