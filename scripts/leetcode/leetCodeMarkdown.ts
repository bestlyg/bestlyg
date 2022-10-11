import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1790. 仅执行一次字符串交换能否使两个字符串相等',
  url: 'https://leetcode.cn/problems/check-if-one-string-swap-can-make-strings-equal/',
  difficulty: Difficulty.简单,
  tag: [Tag.哈希表, Tag.字符串, Tag.计数],
  desc: `如果对 其中一个字符串 执行 最多一次字符串交换 就可以使两个字符串相等，返回 true ；否则，返回 false 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 6.1,
      desc: '遍历',
      code: `class Solution {
public:
    bool areAlmostEqual(string s1, string s2) {
        int list[26] = {0}, n = s1.size();
        for (auto &c : s1) list[c - 'a']++;
        for (auto &c : s2) if (list[c - 'a']-- == 0) return false;
        int tag = -1;
        bool changed = false;
        for (int i = 0; i < n; i++) {
            if (s1[i] == s2[i]) continue;
            if (changed) return false;
            if (tag == -1) { tag = i; continue; }
            else if (s1[tag] == s2[i] && s2[tag] == s1[i]) changed = true;
            else return false;
        }
        return true;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
