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
    name: '400. 第 N 位数字',
    url: 'https://leetcode-cn.com/problems/nth-digit/',
    difficulty: Difficulty.中等,
    tag: [Tag.数学, Tag.二分查找],
    desc: `给你一个整数 n ，请你在无限的整数序列 [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ...] 中找出并返回第 n 位数字。`,
    solutions: [
      {
        script: Script.TS,
        time: 68,
        memory: 39.4,
        desc: '直接分区间查找',
        code: `// 每一段具有相同位数的数字算一个区间
        function findNthDigit(n: number): number {
          // 当前数字占几位
          let bit = 1;
          // 当前区间最大值
          let max = 9;
          // 当前区间最小值
          let min = 1;
          // 前区间占用位数
          let cnt = 0;
          // 判断n是否大于下一个区间数量，大于则移动至下一区间
          while (n > cnt + (max - Math.floor(max / 10)) * bit) {
            cnt += (max - Math.floor(max / 10)) * bit++;
            max = max * 10 + 9;
            min *= 10;
          }
          // 删除前一区间的量
          n -= cnt;
          // 计算当前区间中所指向的数字
          const num = Math.floor((n - 1) / bit) + min;
          return +num.toString()[(n - 1) % bit];
        }`,
      },
    ],
  },
];
