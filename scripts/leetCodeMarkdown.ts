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
    name: '748. 最短补全词',
    url: 'https://leetcode-cn.com/problems/shortest-completing-word/',
    difficulty: Difficulty.简单,
    tag: [Tag.数组, Tag.哈希表, Tag.字符串],
    desc: `给你一个字符串 licensePlate 和一个字符串数组 words ，请你找出并返回 words 中的 最短补全词 。`,
    solutions: [
      {
        script: Script.TS,
        time: 88,
        memory: 41.9,
        desc: '哈希',
        code: `function shortestCompletingWord(licensePlate: string, words: string[]): string {
          const reg_lowchar = /[a-z]/;
          const map: Record<string, number> = {};
          for (const ch of licensePlate.toLowerCase()) {
            if (reg_lowchar.test(ch)) map[ch] = (map[ch] ?? 0) + 1;
          }
          return words
            .filter(word => {
              const wmap = { ...map };
              for (const ch of word) {
                if (wmap[ch]) wmap[ch]--;
              }
              return Object.values(wmap).every(v => v <= 0);
            })
            .sort((a, b) => a.length - b.length)[0];
        }`,
      },
    ],
  },
];
