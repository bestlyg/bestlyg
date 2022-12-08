import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1812. 判断国际象棋棋盘中一个格子的颜色',
  url: 'https://leetcode.cn/problems/determine-color-of-a-chessboard-square/',
  difficulty: Difficulty.简单,
  tag: [Tag.数学, Tag.字符串],
  desc: `如果所给格子的颜色是白色，请你返回 true，如果是黑色，请返回 false 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 5.8,
      desc: '判断行列',
      code: `class Solution {
public:
    bool squareIsWhite(string coordinates) {
        return (coordinates[1] - '0' - 1 ^ ((coordinates[0] - 'a') & 1)) & 1;
    }
};`,
    },
    {
      script: Script.CPP,
      time: 0,
      memory: 5.8,
      desc: '判断行列',
      code: `class Solution {
public:
    bool squareIsWhite(string coordinates) {
        return ((coordinates[0] - 'a') & 1) == ((coordinates[1] - '0') & 1);
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
