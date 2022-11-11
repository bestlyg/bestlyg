import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1704. 判断字符串的两半是否相似',
  url: 'https://leetcode.cn/problems/determine-if-string-halves-are-alike/',
  difficulty: Difficulty.简单,
  tag: [Tag.字符串, Tag.计数],
  desc: `如果 a 和 b 相似，返回 true ；否则，返回 false 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 8,
      memory: 6.6,
      desc: '双指针遍历',
      code: `class Solution {
public:
    bool halvesAreAlike(string s) {
        unordered_set<char> sset{ 'a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'};
        int n = s.size(), cnt = 0;
        for (int l = 0, r = s.size() / 2; r < s.size(); l++, r++) {
            if (sset.count(s[l])) cnt++;
            if (sset.count(s[r])) cnt--;
        }
        return cnt == 0;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
