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
    name: '686. 重复叠加字符串匹配',
    url: 'https://leetcode-cn.com/problems/repeated-string-match/',
    difficulty: Difficulty.中等,
    tag: [Tag.字符串, Tag.字符串匹配],
    desc: `给定两个字符串 a 和 b，寻找重复叠加字符串 a 的最小次数，使得字符串 b 成为叠加后的字符串 a 的子串，如果不存在则返回 -1。`,
    solutions: [
      {
        script: Script.CPP,
        time: 72,
        memory: 39.5,
        desc: '判断最大重复次数是否满足b',
        code: `function repeatedStringMatch(a: string, b: string): number {
          let cnt = Math.ceil(b.length / a.length);
          if (a.repeat(cnt).includes(b)) return cnt;
          if (a.repeat(cnt + 1).includes(b)) return cnt + 1;
          return -1;
        }`,
      },
    ],
  },
];
