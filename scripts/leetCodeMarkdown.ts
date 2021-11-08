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
    name: '299. 猜数字游戏',
    url: 'https://leetcode-cn.com/problems/bulls-and-cows/',
    difficulty: Difficulty.中等,
    tag: [Tag.哈希表, Tag.字符串, Tag.计数],
    desc: `给你一个秘密数字 secret 和朋友猜测的数字 guess ，请你返回对朋友这次猜测的提示。`,
    solutions: [
      {
        script: Script.TS,
        time: 100,
        memory: 40.2,
        desc: '遍历',
        code: `function getHint(secret: string, guess: string): string {
          const n = secret.length;
          let a = 0;
          let b = 0;
          const map: Record<string, number> = {};
          const set = new Set<number>();
          for (let i = 0; i < n; i++) {
            const ch1 = secret[i];
            const ch2 = guess[i];
            if (ch1 === ch2) {
              a++;
              set.add(i);
            } else map[ch1] = (map[ch1] ?? 0) + 1;
          }
          for (let i = 0; i < n; i++) {
            if (set.has(i)) continue;
            const ch2 = guess[i];
            if (map[ch2]) {
              b++;
              map[ch2]--;
            }
          }
          return ${backquote}\${a}A\${b}B${backquote};
        }`,
      },
    ],
  },
];
