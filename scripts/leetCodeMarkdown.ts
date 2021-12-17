import { leetcode, markdown, specStr } from './utils';
const { backquote } = specStr;
const { Script, Difficulty, Tag } = leetcode;
const { link } = markdown;
type Script = leetcode.Script;
type Difficulty = leetcode.Difficulty;
type Tag = leetcode.Tag;
type Solution = leetcode.Solution;
type Markdown = leetcode.Markdown;
export const leetCodeMarkdowns: Markdown[] = [
  {
    existMarkdown: !true,
    name: '1518. 换酒问题',
    url: 'https://leetcode-cn.com/problems/water-bottles/',
    difficulty: Difficulty.简单,
    tag: [Tag.数学, Tag.模拟],
    desc: `请你计算 最多 能喝到多少瓶酒。`,
    solutions: [
      {
        script: Script.TS,
        time: 72,
        memory: 39.4,
        desc: '每次重新计算当前空瓶子数量',
        code: `function numWaterBottles(numBottles: number, numExchange: number): number {
          let ans = numBottles;
          while (numBottles >= numExchange) {
            const bottles = Math.floor(numBottles / numExchange);
            ans += bottles;
            numBottles = bottles + (numBottles % numExchange);
          }
          return ans;
        }`,
      },
    ],
  },
];
