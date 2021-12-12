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
    name: '1147. 段式回文',
    url: 'https://leetcode-cn.com/problems/longest-chunked-palindrome-decomposition/',
    difficulty: Difficulty.困难,
    tag: [Tag.贪心, Tag.双指针, Tag.字符串, Tag.动态规划, Tag.哈希函数, Tag.滚动哈希],
    desc: `给你一个字符串 text，在确保它满足段式回文的前提下，请你返回 段 的 最大数量 k。`,
    solutions: [
      {
        script: Script.TS,
        time: 80,
        memory: 40.5,
        desc: 'dfs每次读取两头最短相匹配字符数',
        code: `function longestDecomposition(text: string): number {
          const n = text.length;
          if (n <= 1) return n;
          let lidx = 1;
          let lstr = text[0];
          let ridx = n - 2;
          let rstr = text[n - 1];
          while (ridx > lidx && lstr !== rstr) {
            lstr += text[lidx++];
            rstr = text[ridx--] + rstr;
          }
          if (ridx <= lidx && lstr !== rstr) return 1;
          return longestDecomposition(text.substring(lidx, ridx + 1)) + 2;
        }`,
      },
    ],
  },
];
