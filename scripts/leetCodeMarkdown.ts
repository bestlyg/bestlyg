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
    name: '807. 保持城市天际线',
    url: 'https://leetcode-cn.com/problems/max-increase-to-keep-city-skyline/',
    difficulty: Difficulty.中等,
    tag: [Tag.贪心, Tag.数组, Tag.矩阵],
    desc: `在二维数组grid中，grid[i][j]代表位于某处的建筑物的高度。 我们被允许增加任何数量（不同建筑物的数量可能不同）的建筑物的高度。 高度 0 也被认为是建筑物。建筑物高度可以增加的最大总和是多少？`,
    solutions: [
      {
        script: Script.TS,
        time: 88,
        memory: 40.1,
        desc: '遍历后存储最大值数组',
        code: `function maxIncreaseKeepingSkyline(grid: number[][]): number {
          const n = grid.length;
          const m = grid[0].length;
          const vmax = new Array(m).fill(0);
          const hmax = new Array(n).fill(0);
          let ans = 0;
          for (let row = 0; row < n; row++) {
            let max = 0;
            for (let col = 0; col < m; col++) {
              max = Math.max(max, grid[row][col]);
            }
            hmax[row] = max;
          }
          for (let col = 0; col < m; col++) {
            let max = 0;
            for (let row = 0; row < n; row++) {
              max = Math.max(max, grid[row][col]);
            }
            vmax[col] = max;
          }
          for (let row = 0; row < n; row++) {
            for (let col = 0; col < m; col++) {
              ans += Math.min(vmax[col] - grid[row][col], hmax[row] - grid[row][col]);
            }
          }
          return ans;
        }`,
      },
    ],
  },
];
