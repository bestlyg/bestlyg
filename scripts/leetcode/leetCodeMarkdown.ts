import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1739. 放置盒子',
  url: '  desc: `https://leetcode.cn/problems/building-boxes/',
  difficulty: Difficulty.困难,
  tag: [Tag.贪心, Tag.数学, Tag.二分查找],
  desc: `给你一个整数 n ，返回接触地面的盒子的 最少 可能数量。`,
  solutions: [
    {
      script: Script.CPP,
      time: 4,
      memory: 5.9,
      desc: '找规律',
      code: `class Solution {
public:
    int minimumBoxes(int n) {
        int sum = 0, cur = 1, ans = 0, prev = 0;
        while (sum + prev + cur < n) sum = sum + prev + cur, prev += cur, ans += cur++;
        return ans + comp(n - sum, cur);
    }
    int comp(int num, int cur) {
        int ans = 1;
        for (int sum = 0, i = 1; sum + i < num; i++) sum += i, ans++;
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
