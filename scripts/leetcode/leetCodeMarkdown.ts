import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '1805. 字符串中不同整数的数目',
  url: 'https://leetcode.cn/problems/number-of-different-integers-in-a-string/',
  difficulty: Difficulty.简单,
  tag: [Tag.线段树, Tag.队列, Tag.数组, Tag.动态规划, Tag.单调队列, Tag.堆_优先队列],
  desc: `请你返回将所有箱子送到相应码头的 最少行程 次数。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 6.3,
      desc: '遍历',
      code: `class Solution {
public:
    int numDifferentIntegers(string word) {
        unordered_set<string> s;
        for (int i = 0, n = word.size(); i < n; i++) {
            if (!isdigit(word[i])) continue;
            int start = i;
            while (i < n && isdigit(word[i])) i++;
            while (start + 1 < i && word[start] == '0') start++;
            s.insert(word.substr(start, i - start));
        }
        return s.size();
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
