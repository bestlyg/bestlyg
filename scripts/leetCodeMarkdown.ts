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
    name: '786. 第 K 个最小的素数分数',
    url: 'https://leetcode-cn.com/problems/k-th-smallest-prime-fraction/',
    difficulty: Difficulty.困难,
    tag: [Tag.数组, Tag.二分查找, Tag.堆_优先队列],
    desc: `给你一个按递增顺序排序的数组 arr 和一个整数 k 。数组 arr 由 1 和若干 素数  组成，且其中所有整数互不相同。对于每对满足 0 < i < j < arr.length 的 i 和 j ，可以得到分数 arr[i] / arr[j] 。那么第 k 个最小的分数是多少呢? `,
    solutions: [
      {
        script: Script.TS,
        time: 1804,
        memory: 95.9,
        desc: '排序',
        code: `function kthSmallestPrimeFraction(arr: number[], k: number): number[] {
            const n = arr.length;
            const list: number[][] = [];
            for (let i = 0; i < n; i++) {
              for (let j = i + 1; j < n; j++) {
                list.push([arr[i], arr[j]]);
              }
            }
            list.sort(([num11, num12], [num21, num22]) => num11 / num12 - num21 / num22);
            return list[k - 1];
          }`,
      },
    ],
  },
];
