import { leetcode, markdown } from './utils';
const { Script, Difficulty, Tag } = leetcode;
const { link } = markdown;
type Script = leetcode.Script;
type Difficulty = leetcode.Difficulty;
type Tag = leetcode.Tag;
type Solution = leetcode.Solution;
type Markdown = leetcode.Markdown;
export const leetCodeMarkdowns: Markdown[] = [
  {
    existMarkdown: true,
    name: '520. 检测大写字母',
    url: 'https://leetcode-cn.com/problems/range-addition-ii/',
    difficulty: Difficulty.简单,
    tag: [Tag.数组, Tag.数学],
    desc: `给你一个字符串 word 。如果大写用法正确，返回 true ；否则，返回 false 。`,
    solutions: [
      {
        script: Script.TS,
        time: 80,
        memory: 39.6,
        desc: '正则',
        code: `function detectCapitalUse(word: string): boolean {
          return /(^[A-Z]*$)|(^[a-z]*$)|(^[A-Z]{1}[a-z]*$)/g.test(word)
          }`,
      },
    ],
  },
];
