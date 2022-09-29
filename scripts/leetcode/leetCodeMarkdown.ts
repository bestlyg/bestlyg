import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '面试题 01.09. 字符串轮转',
  url: 'https://leetcode.cn/problems/string-rotation-lcci/',
  difficulty: Difficulty.简单,
  tag: [Tag.字符串, Tag.字符串匹配],
  desc: `字符串轮转。给定两个字符串s1和s2，请编写代码检查s2是否为s1旋转而成。`,
  solutions: [
    {
      script: Script.CPP,
      time: 4,
      memory: 7.5,
      desc: '遍历',
      code: `class Solution {
public:
    int n;
    bool isFlipedString(string s1, string s2) {
        if (s1.size() != s2.size()) return false;
        n = s1.size();
        if (n == 0) return true;
        vector<int> list;
        char start = s2[0];
        for (int i = 0; i < n; i++) if (s1[i] == start) list.push_back(i);
        for (auto &start : list) if (comp(s1, start, s2, 0)) return true;
        return false;
    }
    bool comp(string &s1, int i1, string &s2, int i2) {
        while (i2 < n) {
            if (s1[i1] != s2[i2]) return false;
            i1 = (i1 + 1) % n;
            i2++;
        }
        return true;
    }
};`,
    },
    {
      script: Script.CPP,
      time: 4,
      memory: 7.7,
      desc: '拼接两个s1，如果是旋转，s2一定是子串',
      code: `class Solution {
public:
    bool isFlipedString(string s1, string s2) {
        return s1.size() == s2.size() && (s1 + s1).find(s2) != string::npos;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
