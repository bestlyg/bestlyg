import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1189. “气球” 的最大数量',
  url: 'https://leetcode-cn.com/problems/maximum-number-of-balloons/',
  difficulty: Difficulty.简单,
  tag: [Tag.哈希表, Tag.字符串, Tag.计数],
  desc: `字符串 text 中的每个字母最多只能被使用一次。请你返回最多可以拼凑出多少个单词 "balloon"。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 6.5,
      desc: '遍历',
      code: `class Solution {
   public:
    int maxNumberOfBalloons(string text) {
        int m[26] = {0};
        for (auto &ch : text) m[ch - 'a']++;
        return min(min(min(m[1], m[0]), m['n' - 'a']),
                   min(m['l' - 'a'], m['o' - 'a']) / 2);
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
