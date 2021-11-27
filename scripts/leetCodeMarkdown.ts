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
    name: '519. 随机翻转矩阵',
    url: 'https://leetcode-cn.com/problems/random-flip-matrix/',
    difficulty: Difficulty.中等,
    tag: [Tag.水塘抽样, Tag.哈希表, Tag.数学, Tag.随机化],
    desc: `给你一个 m x n 的二元矩阵 matrix ，且所有值被初始化为 0 。请你设计一个算法，随机选取一个满足 matrix[i][j] == 0 的下标 (i, j) ，并将它的值变为 1 。所有满足 matrix[i][j] == 0 的下标 (i, j) 被选取的概率应当均等。`,
    solutions: [
      {
        script: Script.TS,
        time: 100,
        memory: 43.8,
        desc: '随机值，每次遍历到一个位置，把该位置与最后一个位置进行交换',
        code: `class Solution {
          map = new Map<number, number>();
          total: number;
          constructor(public m: number, public n: number) {
            this.total = m * n;
          }
          flip(): number[] {
            const num = this.random(0, --this.total);
            const idx = this.map.get(num) ?? num;
            this.map.set(num, this.map.get(this.total) ?? this.total);
            return [Math.floor(idx / this.n), idx % this.n];
          }
          reset(): void {
            this.map.clear();
            this.total = this.m * this.n;
          }
          random(min: number, max: number): number {
            return min + Math.floor(Math.random() * (max - min + 1));
          }
        }`,
      },
    ],
  },
];
