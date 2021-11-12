import { leetcode, markdown, specStr } from './utils';
const { Script, Difficulty, Tag } = leetcode;
const { link } = markdown;
const { backquote } = specStr;
type Script = leetcode.Script;
type Difficulty = leetcode.Difficulty;
type Tag = leetcode.Tag;
type Solution = leetcode.Solution;
type Markdown = leetcode.Markdown;
export const leetCodeMarkdowns: Markdown[] = [
  {
    existMarkdown: !true,
    name: '375. 猜数字大小 II',
    url: 'https://leetcode-cn.com/problems/guess-number-higher-or-lower-ii/',
    difficulty: Difficulty.中等,
    tag: [Tag.数学, Tag.动态规划, Tag.博弈],
    desc: `给你一个特定的数字 n ，返回能够 确保你获胜 的最小现金数，不管我选择那个数字 。`,
    solutions: [
      {
        script: Script.TS,
        time: 140,
        memory: 41.3,
        desc: '动态规划',
        code: `function getMoneyAmount(n: number): number {
          const dp: number[][] = new Array(n + 1).fill(0).map(_ => new Array(n + 1).fill(0));
          for (let i = n; i >= 1; i--) {
            for (let j = i + 1; j <= n; j++) {
              let min = Infinity;
              for (let k = i; k < j; k++) {
                min = Math.min(min, k + Math.max(dp[i][k - 1], dp[k + 1][j]));
              }
              dp[i][j] = min;
            }
          }
          return dp[1][n];
        }`,
      },
    ],
  },
];
