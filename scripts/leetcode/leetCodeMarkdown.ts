import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '791. 自定义字符串排序',
  url: 'https://leetcode.cn/problems/custom-sort-string/',
  difficulty: Difficulty.中等,
  tag: [Tag.哈希表, Tag.字符串, Tag.排序],
  desc: `返回 满足这个性质的 s 的任意排列 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 6.1,
      desc: '遍历后排序',
      code: `class Solution {
public:
    string customSortString(string order, string s) {
        int list[26] = {0};
        for (int i = 0; i < order.size(); i++) list[order[i] - 'a'] = i;
        sort(s.begin(), s.end(), [&list](char &a, char &b){ return list[a - 'a'] < list[b - 'a']; });
        return s;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
