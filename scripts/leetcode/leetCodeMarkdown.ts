import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '828. 统计子串中的唯一字符',
  url: 'https://leetcode.cn/problems/count-unique-characters-of-all-substrings-of-a-given-string/',
  difficulty: Difficulty.困难,
  tag: [Tag.哈希表, Tag.字符串, Tag.动态规划],
  desc: `给你一个字符串 s ，我们需要返回 countUniqueChars(t) 的总和，其中 t 是 s 的子字符串。`,
  solutions: [
    {
      script: Script.CPP,
      time: 52,
      memory: 36,
      desc: '记录每个字符出现的下标，统计每个字符只出现一次的子串',
      code: `class Solution {
public:
    int uniqueLetterString(string s) {
        unordered_map<char, vector<int>> m;
        for (int i = 0; i < s.size(); i++) m[s[i]].push_back(i);
        int ans = 0;
        for (auto &item : m) {
            vector<int> list = item.second;
            list.insert(list.begin(), -1);
            list.push_back(s.size());
            for (int i = 1; i < list.size() - 1; i++) ans += (list[i] - list[i - 1]) * (list[i + 1] - list[i]);
        }
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
