import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '929. 独特的电子邮件地址',
  url: 'https://leetcode.cn/problems/Jf1JuT/',
  difficulty: Difficulty.困难,
  tag: [Tag.深度优先搜索, Tag.广度优先搜索, Tag.图, Tag.拓扑排序, Tag.数组, Tag.字符串],
  desc: `请你根据该词典还原出此语言中已知的字母顺序，并 按字母递增顺序 排列。若不存在合法字母顺序，返回 "" 。若存在多种可能的合法字母顺序，返回其中 任意一种 顺序即可。`,
  solutions: [
    {
      script: Script.TS,
      time: 16,
      memory: 14,
      desc: '遍历',
      code: `class Solution {
   public:
    int numUniqueEmails(vector<string> &emails) {
        unordered_set<string> s;
        for (auto &o : emails) s.insert(format(o));
        return s.size();
    }
    string format(string email) {
        string ans = "";
        bool suffix = false, ignore = false;
        for (auto &ch : email) {
            if (ch == '+') {
                ignore = true;
            } else if (ch == '@') {
                suffix = true;
                ans += ch;
            } else if (ch == '.' && !suffix) {
                continue;
            } else if (suffix || !ignore) {
                ans += ch;
            }
        }
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
