import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '913. 猫和老鼠',
  url: 'https://leetcode-cn.com/problems/cat-and-mouse/',
  difficulty: Difficulty.困难,
  tag: [Tag.广度优先搜索, Tag.图, Tag.记忆化搜索, Tag.数学, Tag.动态规划, Tag.博弈],
  desc: `两位玩家分别扮演猫和老鼠，在一张 无向 图上进行游戏，两人轮流行动。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 5.9,
      desc: '遍历求出距离第一天的天数并取模',
      code: `string names[] = {"Friday",  "Saturday",  "Sunday",  "Monday",
      "Tuesday", "Wednesday", "Thursday"};
int isLeapYear(int year) {
return year % 400 == 0 || year % 100 != 0 && year % 4 == 0;
}`,
    },
  ],
};
export default leetCodeMarkdown;
