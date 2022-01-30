import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '884. 两句话中的不常见单词',
  url: 'https://leetcode-cn.com/problems/uncommon-words-from-two-sentences/',
  difficulty: Difficulty.简单,
  tag: [Tag.哈希表, Tag.字符串],
  desc: `给你两个 句子 s1 和 s2 ，返回所有 不常用单词 的列表。返回列表中单词可以按 任意顺序 组织。`,
  solutions: [
    {
      script: Script.TS,
      time: 4,
      memory: 6.5,
      desc: '分割字符串后遍历',
      code: `class Solution {
   public:
    vector<string> uncommonFromSentences(string s1, string s2) {
        vector<string> ans;
        unordered_map<string, int> m;
        istringstream iss1(s1), iss2(s2);
        string buffer;
        while (getline(iss1, buffer, ' ')) m[buffer]++;
        while (getline(iss2, buffer, ' ')) m[buffer]++;
        for (auto &data : m)
            if (data.second == 1) ans.push_back(data.first);
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
