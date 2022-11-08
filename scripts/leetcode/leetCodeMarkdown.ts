import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1684. 统计一致字符串的数目',
  url: 'https://leetcode.cn/problems/count-the-number-of-consistent-strings/',
  difficulty: Difficulty.简单,
  tag: [Tag.位运算, Tag.数组, Tag.哈希表, Tag.字符串],
  desc: `请你返回 words 数组中 一致字符串 的数目。`,
  solutions: [
    {
      script: Script.CPP,
      time: 32,
      memory: 29.4,
      desc: '遍历',
      code: `class Solution {
public:
    int countConsistentStrings(string allowed, vector<string>& words) {
        int list[26] = {0};
        for (auto &c : allowed) list[c - 'a'] = 1;
        int ans = 0;
        for (auto &s : words) {
            bool f = true;
            for (auto &c : s) {
                if (list[c - 'a'] == 0) {
                    f = false;
                    break;
                }
            }
            if (f) ans++;
        }
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
