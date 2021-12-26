import { leetcode, markdown, specStr } from './utils';
const { backquote } = specStr;
const { Script, Difficulty, Tag } = leetcode;
const { link } = markdown;
type Script = leetcode.Script;
type Difficulty = leetcode.Difficulty;
type Tag = leetcode.Tag;
type Solution = leetcode.Solution;
type Markdown = leetcode.Markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '剑指 Offer II 105. 岛屿的最大面积',
  url: 'https://leetcode-cn.com/problems/occurrences-after-bigram/',
  difficulty: Difficulty.简单,
  tag: [Tag.字符串],
  desc: `对于每种这样的情况，将第三个词 "third" 添加到答案中，并返回答案。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 6.5,
      desc: '分割字符串',
      code: `class Solution {
   public:
    vector<string> split(string text) {
        vector<string> ans;
        for (int i = 0; i < text.size(); i++) {
            int end = i;
            while (end < text.size() && text[end] != ' ') end++;
            ans.push_back(text.substr(i, end - i));
            i = end;
        }
        return ans;
    }
    vector<string> findOcurrences(string text, string first, string second) {
        vector<string> ans;
        vector<string> list = split(text);
        for (int i = 0; i < list.size() - 2; i++) {
            string str = list[i];
            if (str == first && list[i + 1] == second) {
                ans.push_back(list[i + 2]);
            }
        }
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
