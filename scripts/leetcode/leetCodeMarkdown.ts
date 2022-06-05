import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '478. 在圆内随机生成点',
  url: 'https://leetcode.cn/problems/generate-random-point-in-a-circle/',
  difficulty: Difficulty.中等,
  tag: [Tag.几何, Tag.数学, Tag.拒绝采样, Tag.随机化],
  desc: `给定圆的半径和圆心的位置，实现函数 randPoint ，在圆中产生均匀随机点。`,
  solutions: [
    {
      script: Script.TS,
      time: 128,
      memory: 58.3,
      desc: '忽略边上的点',
      code: `class Solution {
        constructor(public radius: number, public x_center: number, public y_center: number) { }
        randPoint(): number[] {
            while (true) {
                const [x, y] = [
                    2 * Math.random() * this.radius - this.radius,
                    2 * Math.random() * this.radius - this.radius,
                ]
                if (x ** 2 + y ** 2 <= this.radius * this.radius) 
                return [
                    x + this.x_center,
                    y + this.y_center
                ];
            }
        }
    }`,
    },
  ],
};
export default leetCodeMarkdown;
