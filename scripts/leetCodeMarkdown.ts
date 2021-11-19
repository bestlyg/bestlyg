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
    name: '397. 整数替换',
    url: 'https://leetcode-cn.com/problems/integer-replacement/',
    difficulty: Difficulty.中等,
    tag: [Tag.贪心, Tag.位运算, Tag.记忆化搜索, Tag.动态规划],
    desc: `给定一个正整数 n ，n 变为 1 所需的最小替换次数是多少？`,
    solutions: [
      {
        script: Script.TS,
        time: 80,
        memory: 39.4,
        desc: 'dfs',
        code: `const map: Record<number, number> = { 1: 0 };
        function integerReplacement(n: number): number {
          if (map[n] !== undefined) return map[n];
          const ans =
            (n & 1
              ? Math.min(integerReplacement(n + 1), integerReplacement(n - 1))
              : integerReplacement(n/2)) + 1;
          return (map[n] = ans);
        }`,
      },
    ],
  },
];
