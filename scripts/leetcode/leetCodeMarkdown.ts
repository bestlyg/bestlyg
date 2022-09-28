import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '面试题 17.09. 第 k 个数',
  url: 'https://leetcode.cn/problems/check-permutation-lcci/',
  difficulty: Difficulty.简单,
  tag: [Tag.哈希表, Tag.字符串, Tag.排序],
  desc: `给定两个字符串 s1 和 s2，请编写一个程序，确定其中一个字符串的字符重新排列后，能否变成另一个字符串。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 6.1,
      desc: '遍历',
      code: `class Solution {
public:
    int getKthMagicNumber(int k) {
        vector<int> list(k);
        list[0] = 1;
        int p[3] = {0};
        for (int i = 1; i < k; i++) {
            int next = min(list[p[0]] * 3, min(list[p[1]] * 5, list[p[2]] * 7));
            list[i] = next;
            if (next % 3 == 0) p[0]++;
            if (next % 5 == 0) p[1]++;
            if (next % 7 == 0) p[2]++;
        }
        return list.back();
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
