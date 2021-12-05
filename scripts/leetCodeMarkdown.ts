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
    name: '372. 超级次方',
    url: 'https://leetcode-cn.com/problems/super-pow/',
    difficulty: Difficulty.中等,
    tag: [Tag.数学, Tag.分治],
    desc: `你的任务是计算 ab 对 1337 取模，a 是一个正整数，b 是一个非常大的正整数且会以数组形式给出。`,
    solutions: [
      {
        script: Script.TS,
        time: 84,
        memory: 39.7,
        desc: '99^(2345) === (99^234)^10 * 99^5',
        code: `const MOD = 1337;
        function pow(a: number, b: number) {
          let ans = 1;
          while (b--) ans = (ans * a) % MOD;
          return ans;
        }
        function superPow(a: number, b: number[]): number {
          let ans = 1;
          for (let i = 0; i < b.length; i++) {
            ans = (pow(ans, 10) * pow(a, b[i])) % MOD;
          }
          return ans;
        }`,
      },
    ],
  },
];
