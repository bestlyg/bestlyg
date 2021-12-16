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
    name: '1610. 可见点的最大数目',
    url: 'https://leetcode-cn.com/problems/maximum-number-of-visible-points/',
    difficulty: Difficulty.困难,
    tag: [Tag.几何, Tag.数组, Tag.数学, Tag.排序, Tag.滑动窗口],
    desc: `返回你能看到的点的最大数目。`,
    solutions: [
      {
        script: Script.TS,
        time: 572,
        memory: 77.3,
        desc: '遍历每个点获取角度值',
        code: `function visiblePoints(points: number[][], angle: number, location: number[]): number {
          const [x, y] = location;
          const list: number[] = [];
          let same = 0;
          for (const [px, py] of points) {
            if (px === x && py === y) {
              same++;
              continue;
            }
            const angle = (Math.atan2(py - y, px - x) * 180) / Math.PI;
            list.push(angle, angle + 360);
          }
          list.sort((a, b) => a - b);
          const n = list.length;
          let l = 0;
          let r = 0;
          let ans = 0;
          while (r < n) {
            while (r < n && list[r] - list[l] <= angle) r++;
            ans = Math.max(ans, r - l);
            l++;
          }
          return ans + same;
        }`,
      },
    ],
  },
];
