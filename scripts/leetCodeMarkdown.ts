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
    name: '1044. 最长重复子串',
    url: 'https://leetcode-cn.com/problems/longest-duplicate-substring/',
    difficulty: Difficulty.困难,
    tag: [Tag.字符串, Tag.二分查找, Tag.后缀数组, Tag.滑动窗口, Tag.哈希函数, Tag.滚动哈希],
    desc: `返回 任意一个 可能具有最长长度的重复子串。如果 s 不含重复子串，那么答案为 "" 。`,
    solutions: [
      {
        script: Script.CPP,
        time: 9236,
        memory: 60.3,
        desc: '二分答案',
        code: `function check(s: string, n: number, num: number): string {
          let left = 0;
          let right = num;
          let str = s.substring(left, right);
          const set = new Set([str]);
          while (right < n) {
            str = s.substring(++left, ++right);
            if (set.has(str)) return str;
            set.add(str);
          }
          return '';
        }
        function longestDupSubstring(s: string): string {
          const n = s.length;
          let left = 0;
          let right = n;
          let ans = '';
          while (left < right) {
            const mid = (left + right + 1) >> 1;
            const str = check(s, n, mid);
            if (str === '') right = mid - 1;
            else {
              left = mid;
              ans = str;
            }
          }
          return ans;
        }`,
      },
    ],
  },
];
