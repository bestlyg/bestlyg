import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '792. 匹配子序列的单词数',
  url: 'https://leetcode.cn/problems/number-of-matching-subsequences/',
  difficulty: Difficulty.中等,
  tag: [Tag.字典树, Tag.哈希表, Tag.字符串, Tag.排序],
  desc: `给定字符串 s 和字符串数组 words, 返回  words[i] 中是s的子序列的单词个数 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 184,
      memory: 50.2,
      desc: '把s的每个坐标存入后，进行二分',
      code: `class Solution {
public:
    int numMatchingSubseq(string s, vector<string>& words) {
        vector<vector<int>> list(26);
        for (int i = 0; i < s.size(); i++) list[s[i] - 'a'].push_back(i);
        int ans = 0;
        for (auto &word : words) {
            if (word.size() > s.size()) continue;
            int p = -1;
            bool f = true;
            for (auto &c : word) {
                auto &ilist = list[c - 'a'];
                auto it = upper_bound(ilist.begin(), ilist.end(), p);
                if (it == ilist.end()) {
                    f = false;
                    break;
                }
                if (!f) break;
                p = *it;
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
