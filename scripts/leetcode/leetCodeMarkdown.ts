import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1732. 找到最高海拔',
  url: 'https://leetcode.cn/problems/find-the-highest-altitude/',
  difficulty: Difficulty.简单,
  tag: [Tag.数组, Tag.前缀和],
  desc: `给你一个长度为 n 的整数数组 gain ，其中 gain[i] 是点 i 和点 i + 1 的 净海拔高度差（0 <= i < n）。请你返回 最高点的海拔 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 4,
      memory: 7.8,
      desc: '遍历',
      code: `class Solution {
public:
    int largestAltitude(vector<int>& gain) {
        int cur = 0, ans = 0;
        for (int i = 0; i < gain.size(); i++) {
            cur += gain[i];
            ans = max(ans, cur);
        }
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
