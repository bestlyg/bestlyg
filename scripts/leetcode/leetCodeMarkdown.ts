import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '2011. 执行操作后的变量值',
  url: 'https://leetcode.cn/problems/final-value-of-variable-after-performing-operations/',
  difficulty: Difficulty.困难,
  tag: [Tag.数组, Tag.字符串, Tag.模拟],
  desc: `给你一个字符串数组 operations ，这是由操作组成的一个列表，返回执行所有操作后， X 的 最终值 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 4,
      memory: 13.6,
      desc: '遍历',
      code: `class Solution {
public:
    int finalValueAfterOperations(vector<string>& operations) {
        int ans = 0;
        for (auto &s : operations) if (s[1] == '+') ans++; else ans--;
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
