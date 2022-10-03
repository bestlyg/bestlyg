import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1784. 检查二进制字符串字段',
  url: 'https://leetcode.cn/problems/check-if-binary-string-has-at-most-one-segment-of-ones/',
  difficulty: Difficulty.简单,
  tag: [Tag.字符串],
  desc: `给你一个二进制字符串 s ，该字符串 不含前导零 。如果 s 包含 零个或一个由连续的 '1' 组成的字段 ，返回 true​​​ 。否则，返回 false 。如果 s 中 由连续若干个 '1' 组成的字段 数量不超过 1，返回 true​​​ 。否则，返回 false 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 6,
      desc: '遍历',
      code: `class Solution {
public:
    bool checkOnesSegment(string s) {
        int cnt = 0, n = s.size();
        for (int i = 0; i < n; i++) {
            if (s[i] == '0') continue;
            while (i + 1 < n && s[i + 1] == '1') i++;
            if (++cnt > 1) return false;
        }
        return true;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
