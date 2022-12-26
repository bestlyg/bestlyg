import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1759. 统计同构子字符串的数目',
  url: 'https://leetcode.cn/problems/count-number-of-homogenous-substrings/',
  difficulty: Difficulty.中等,
  tag: [Tag.数学, Tag.字符串],
  desc: `给你一个字符串 s ，返回 s 中 同构子字符串 的数目。`,
  solutions: [
    {
      script: Script.CPP,
      time: 20,
      memory: 11.3,
      desc: '遍历',
      code: `class Solution {
public:
    int countHomogenous(string s) {
        int n = s.size(), ans = 0, mod = 1e9 + 7;
        for (int i = 0; i < n; i++) {
            long long cnt = 1, start = i;
            while (i + 1 < n && s[i + 1] == s[start]) i++, cnt++;
            ans = (ans + (1 + cnt) * cnt / 2) % mod;
        }
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
