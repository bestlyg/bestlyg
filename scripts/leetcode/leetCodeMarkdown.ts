import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1619. 删除某些元素后的数组均值',
  url: 'https://leetcode.cn/problems/mean-of-array-after-removing-some-elements/',
  difficulty: Difficulty.简单,
  tag: [Tag.数组, Tag.排序],
  desc: `给你一个整数数组 arr ，请你删除最小 5% 的数字和最大 5% 的数字后，剩余数字的平均值。`,
  solutions: [
    {
      script: Script.CPP,
      time: 8,
      memory: 9.1,
      desc: '排序后遍历',
      code: `class Solution {
public:
    double trimMean(vector<int>& arr) {
        sort(arr.begin(), arr.end());
        int n = arr.size(), v = n / 20;
        double ans = 0;
        for (int i = v; i < n - v; i++) ans += arr[i];
        return ans / (n - 2 * v);
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
