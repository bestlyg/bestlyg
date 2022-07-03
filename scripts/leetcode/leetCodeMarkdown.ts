import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '556. 下一个更大元素 III',
  url: 'https://leetcode.cn/problems/wiggle-sort-ii/',
  difficulty: Difficulty.困难,
  tag: [Tag.数学, Tag.双指针, Tag.字符串],
  desc: `给你一个正整数 n ，请你找出符合条件的最小整数，其由重新排列 n 中存在的每位数字组成，并且其值大于 n 。如果不存在这样的正整数，则返回 -1 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 5.8,
      desc: '从小到大找到第一个逆序的数，再找到第一个逆序数大的数，进行交换，然后翻转后半段',
      code: `class Solution {
   public:
    int nextGreaterElement(int n) {
        string str = to_string(n);
        int len = str.size(), i = len - 2, j = len - 1;
        while (i >= 0 && str[i] - '0' >= str[i + 1] - '0') i--;
        if (i == -1) return -1;
        while (j > i && str[j] - '0' <= str[i] - '0') j--;
        swap(str[i], str[j]);
        reverse(str.begin() + i + 1, str.end());
        long num = stol(str);
        return num > INT_MAX ? -1 : num;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
