import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '890. 查找和替换模式',
  url: 'https://leetcode.cn/problems/find-and-replace-pattern/',
  difficulty: Difficulty.中等,
  tag: [Tag.数组, Tag.哈希表, Tag.字符串],
  desc: `返回 words 中与给定模式匹配的单词列表。`,
  solutions: [
    {
      script: Script.TS,
      time: 4,
      memory: 7.6,
      desc: '遍历比较',
      code: `class Solution {
   public:
    int n;
    vector<string> findAndReplacePattern(vector<string> &words,
                                         string pattern) {
        vector<string> ans;
        n = pattern.size();
        for (auto &word : words) {
            if (check(pattern, word)) ans.push_back(word);
        }
        return ans;
    }
    bool check(string &pattern, string &word) {
        char list[26] = {0};
        bool check[26] = {0};
        for (int i = 0; i < n; i++) {
            char wc = word[i], pc = pattern[i];
            if (list[pc - 'a'] && list[pc - 'a'] != wc) return false;
            if (list[pc - 'a'] == '\\0' && check[wc - 'a']) return false;
            check[wc - 'a'] = true;
            list[pc - 'a'] = wc;
        }
        return true;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
