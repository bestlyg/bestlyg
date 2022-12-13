import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1832. 判断句子是否为全字母句',
  url: 'https://leetcode.cn/problems/check-if-the-sentence-is-pangram',
  difficulty: Difficulty.中等,
  tag: [Tag.哈希表, Tag.字符串],
  desc: `给你一个仅由小写英文字母组成的字符串 sentence ，请你判断 sentence 是否为 全字母句 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 6.4,
      desc: '遍历',
      code: `class Solution {
public:
    bool checkIfPangram(string sentence) {
        int num = 0;
        for (auto &c : sentence) num |= 1 << (c - 'a');
        return num == 0b11111111111111111111111111;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
