import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '386. 字典序排数',
  url: 'https://leetcode-cn.com/problems/largest-palindrome-product/',
  difficulty: Difficulty.困难,
  tag: [Tag.数学],
  desc: `给定一个整数 n ，返回 可表示为两个 n 位整数乘积的 最大回文整数 。因为答案可能非常大，所以返回它对 1337 取余 。  `,
  solutions: [
    {
      script: Script.CPP,
      time: 12,
      memory: 11.2,
      desc: 'dfs',
      code: `class Solution {
   public:
    vector<int> lexicalOrder(int n) {
        vector<int> ans;
        for (int i = 1; i <= 9; i++) dfs(ans, n, i);
        return ans;
    }
    void dfs(vector<int> &ans, int &n, int num) {
        if (num > n) return;
        ans.push_back(num);
        for (int i = 0; i <= 9; i++) dfs(ans, n, num * 10 + i);
    }
};`,
    },
    {
      script: Script.CPP,
      time: 8,
      memory: 10.2,
      desc: '遍历',
      code: `class Solution {
   public:
    vector<int> lexicalOrder(int n) {
        vector<int> ans(n);
        int num = 1;
        for (int i = 0; i < n; i++) {
            ans[i] = num;
            if (num * 10 <= n)
                num *= 10;
            else {
                while (num % 10 == 9 || num + 1 > n) num /= 10;
                num++;
            }
        }
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
