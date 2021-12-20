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
    existMarkdown: true,
    name: '475. 供暖器',
    url: 'https://leetcode-cn.com/problems/heaters/',
    difficulty: Difficulty.中等,
    tag: [Tag.数组, Tag.双指针, Tag.二分查找, Tag.排序],
    desc: `现在，给出位于一条水平线上的房屋 houses 和供暖器 heaters 的位置，请你找出并返回可以覆盖所有房屋的最小加热半径。`,
    solutions: [
      {
        script: Script.TS,
        time: 108,
        memory: 42.6,
        desc: '二分答案',
        code: `function bs(houses: number[], n: number, heaters: number[], m: number, rad: number): boolean {
          let idx = 0;
          for (let i = 0; i < m && idx < n; i++) {
            const heater = heaters[i];
            while (idx < n && Math.abs(heater - houses[idx]) <= rad) idx++;
          }
          return idx === n;
        }
        function findRadius(houses: number[], heaters: number[]): number {
          houses.sort((a, b) => a - b);
          heaters.sort((a, b) => a - b);
          const houseLen = houses.length;
          const heaterLen = heaters.length;
          let l = 0;
          let r = 1e9;
          while (l < r) {
            const m = (l + r) >> 1;
            if (bs(houses, houseLen, heaters, heaterLen, m)) r = m;
            else l = m + 1;
          }
          return l;
        }`,
      },
    ],
  },
];
