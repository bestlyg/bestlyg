import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '784. 字母大小写全排列',
  url: 'https://leetcode.cn/problems/letter-case-permutation/',
  difficulty: Difficulty.中等,
  tag: [Tag.位运算, Tag.字符串, Tag.回溯],
  desc: `返回 所有可能得到的字符串集合 。以 任意顺序 返回输出。`,
  solutions: [
    {
      script: Script.CPP,
      time: 4,
      memory: 9.8,
      desc: '模拟',
      code: `class Solution {
public:
    vector<string> letterCasePermutation(string s) {
        vector<string> list;
        dfs(list, s, 0, "");
        return list;
    }
    void dfs(vector<string> &list, string &s, int idx, string &&cur) {
        if (idx == s.size()) {
            list.push_back(cur);
            return;
        }
        dfs(list, s, idx + 1, cur + s[idx]);
        if (s[idx] >= 'A' && s[idx] <= 'Z' || s[idx] >= 'a' && s[idx] <= 'z') {
            dfs(list, s, idx + 1, cur + static_cast<char>(s[idx] ^ 0b100000));
        }
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
