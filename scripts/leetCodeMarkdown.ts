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
    name: '438. 找到字符串中所有字母异位词',
    url: 'https://leetcode-cn.com/problems/find-all-anagrams-in-a-string/',
    difficulty: Difficulty.中等,
    tag: [Tag.哈希表, Tag.字符串, Tag.滑动窗口],
    desc: `给定两个字符串 s 和 p，找到 s 中所有 p 的 异位词 的子串，返回这些子串的起始索引。不考虑答案输出的顺序。`,
    solutions: [
      {
        script: Script.TS,
        time: 140,
        memory: 44.9,
        desc: '遍历后存储数组，滑动窗口比较',
        code: `function findAnagrams(s: string, p: string): number[] {
          const sn = s.length;
          const pn = p.length;
          if (sn < pn) return [];
          const arr: number[] = new Array(26).fill(0);
          for (let i = 0; i < pn; i++) arr[p.codePointAt(i)! - 97]++;
          const str = arr.join('#');
          arr.fill(0);
          const ans: number[] = [];
          let l = 0;
          let r = 0;
          while (r < pn) arr[s.codePointAt(r++)! - 97]++;
          while (r < sn) {
            if (str === arr.join('#')) ans.push(l);
            arr[s.codePointAt(l++)! - 97]--;
            arr[s.codePointAt(r++)! - 97]++;
          }
          if (str === arr.join('#')) ans.push(l);
          return ans;
        }`,
      },
    ],
  },
];
