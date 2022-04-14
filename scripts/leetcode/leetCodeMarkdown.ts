import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1672. 最富有客户的资产总量',
  url: 'https://leetcode-cn.com/problems/richest-customer-wealth/',
  difficulty: Difficulty.简单,
  tag: [Tag.数组, Tag.矩阵],
  desc: `客户的 资产总量 就是他们在各家银行托管的资产数量之和。最富有客户就是 资产总量 最大的客户。`,
  solutions: [
    {
      script: Script.CPP,
      time: 4,
      memory: 7.5,
      desc: '遍历',
      code: `class Solution {
   public:
    int maximumWealth(vector<vector<int>> &accounts) {
        int ans = -1;
        ;
        for (auto &account : accounts) {
            int sum = 0;
            for (auto &data : account) sum += data;
            ans = max(ans, sum);
        }
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
