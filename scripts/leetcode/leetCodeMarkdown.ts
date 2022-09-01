import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1475. 商品折扣后的最终价格',
  url: 'https://leetcode.cn/problems/final-prices-with-a-special-discount-in-a-shop/',
  difficulty: Difficulty.简单,
  tag: [Tag.栈, Tag.数组, Tag.单调栈],
  desc: `请你返回一个数组，数组中第 i 个元素是折扣后你购买商品 i 最终需要支付的价格。`,
  solutions: [
    {
      script: Script.CPP,
      time: 4,
      memory: 9.8,
      desc: '单调栈',
      code: `class Solution {
public:
    vector<int> finalPrices(vector<int>& prices) {
        stack<int> s;
        vector<int> ans(prices.begin(), prices.end());
        for (int i = 0; i < prices.size(); i++) {
            while (s.size() && prices[s.top()] >= prices[i]) {
                int prev = s.top();
                s.pop();
                ans[prev] -= prices[i];
            }
            s.push(i);
        }
        return ans;
    }
};`,
    },
    {
      script: Script.CPP,
      time: 0,
      memory: 2.1,
      desc: '单调栈',
      code: `impl Solution {
    pub fn final_prices(prices: Vec<i32>) -> Vec<i32> {
        let mut s = Vec::<usize>::new();
        let mut prices = prices;
        for i in 0..prices.len() {
            while !s.is_empty() && prices[*s.last().unwrap()] >= prices[i] {
                let prev = s.pop().unwrap();
                prices[prev] -= prices[i];
            }
            s.push(i);
        }
        prices
    }
}`,
    },
  ],
};
export default leetCodeMarkdown;
