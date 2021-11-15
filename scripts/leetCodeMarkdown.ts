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
    existMarkdown: !true,
    name: '319. 灯泡开关',
    url: 'https://leetcode-cn.com/problems/bulb-switcher/',
    difficulty: Difficulty.中等,
    tag: [Tag.脑筋急转弯, Tag.数学],
    desc: `找出并返回 n 轮后有多少个亮着的灯泡。`,
    solutions: [
      {
        script: Script.TS,
        time: 76,
        memory: 39.4,
        desc: '求出完全平方数即亮灯个数',
        code: `function bulbSwitch(n: number): number {
          return Math.floor(Math.sqrt(n + 0.5));
        }`,
      },
    ],
  },
];
