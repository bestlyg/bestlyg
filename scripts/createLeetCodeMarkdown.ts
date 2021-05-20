import { leetcode, trimBlank, resolve, fs, moment, specStr, LOGO, markdown } from './utils';

const { backquote } = specStr;
const { link } = markdown;
const {
  Script,
  Difficulty,
  Tag,
  srcPath,
  solutionReg,
  getDirOrder,
  getFileOrder,
  getDirName,
} = leetcode;
type Script = leetcode.Script;
type Difficulty = leetcode.Difficulty;
type Tag = leetcode.Tag;

interface Solution {
  script: Script;
  time: number;
  memory: number;
  desc: string;
  code: string;
}
interface Markdown {
  existMarkdown: boolean;
  name: string;
  url: string;
  desc: string;
  difficulty: Difficulty;
  tag: Tag[];
  solutions: Solution[];
}
const md: Markdown = {
  existMarkdown: true,
  name: '692. 前K个高频单词',
  url: 'https://leetcode-cn.com/problems/find-kth-largest-xor-coordinate-value/',
  difficulty: Difficulty.中等,
  tag: [Tag.数组],
  desc: '请你找出 matrix 的所有坐标中第 k 大的值（k 的值从 1 开始计数）。',
  solutions: [
    {
      script: Script.TS,
      time: 132,
      memory: 44.3,
      desc: '利用堆去获取',
      code: `class Heap<T = number> {
        private arr: T[] = [];
        get isEmpty() {
          return this.size === 0;
        }
        get size() {
          return this.arr.length;
        }
        get top() {
          return this.arr[0];
        }
        constructor(private compare: (t1: T, t2: T) => number) {}
        add(num: T): void {
          this.arr.push(num);
          this.shiftUp(this.size - 1);
        }
        remove(): T {
          const num = this.arr.shift()!;
          if (this.size) {
            this.arr.unshift(this.arr.pop()!);
            this.shiftDown(0);
          }
          return num;
        }
        private shiftUp(index: number): void {
          if (index === 0) return;
          const parentIndex = (index - 1) >> 1;
          if (this.compare(this.arr[index], this.arr[parentIndex]) > 0) {
            [this.arr[index], this.arr[parentIndex]] = [this.arr[parentIndex], this.arr[index]];
            this.shiftUp(parentIndex);
          }
        }
        private shiftDown(index: number): void {
          let childrenIndex = index * 2 + 1;
          if (childrenIndex > this.size - 1) return;
          if (
            childrenIndex + 1 <= this.size - 1 &&
            this.compare(this.arr[childrenIndex + 1], this.arr[childrenIndex]) > 0
          ) {
            childrenIndex++;
          }
          if (this.compare(this.arr[childrenIndex], this.arr[index]) > 0) {
            [this.arr[childrenIndex], this.arr[index]] = [this.arr[index], this.arr[childrenIndex]];
            this.shiftDown(childrenIndex);
          }
        }
        *[Symbol.iterator](): IterableIterator<T> {
          for (const t of this.arr) {
            yield t;
          }
        }
      }
      function topKFrequent(words: string[], k: number): string[] {
        const map: Record<string, number> = {};
        for (const word of words) map[word] = (map[word] ?? 0) + 1;
        const chartToNumber = (char: string) => char.codePointAt(0)! - 'a'.codePointAt(0)!;
        const heap = new Heap<[string, number]>(([k1, v1], [k2, v2]) => {
          if (v1 !== v2) return v1 - v2;
          let i1 = 0;
          const end1 = k1.length;
          let i2 = 0;
          const end2 = k2.length;
          for (; i1 < end1 && i2 < end2; i1++, i2++)
            if (k1[i1] !== k2[i2]) return chartToNumber(k2[i2]) - chartToNumber(k1[i1]);
          if (i1 === end1) return 1;
          else if (i2 === end2) return -1;
          else return 0;
        });
        for (const data of Object.entries(map)) heap.add(data);
        const ans: string[] = [];
        while (heap.size !== 0 && k--) ans.push(heap.remove()[0]);
        return ans;
      }`,
    },
  ],
};
const dirName = getDirName(md.name);
const dirPath = resolve(srcPath, dirName);
const filePath = resolve(dirPath, trimBlank(md.name) + '.md');
const descFormat = (str: string) => (str.endsWith('。') ? str : str + '。');

function main() {
  console.log(LOGO);
  md.existMarkdown ? addSolution() : addMarkdown();
}
function addMarkdown() {
  fs.writeFileSync(
    filePath,
    `---
title: ${md.name}
order: ${getFileOrder(md.name)}
nav:
  title: 力扣题解
  path: /leetcode
  order: 4
group:
  title: ${dirName}
  path: /${dirName}
  order: ${getDirOrder(dirName)}
---

# ${md.name}
    
> 链接：[${md.name}](${md.url})  
> 难度：${md.difficulty}  
> 标签：${md.tag.join('、')}  
> 简介：${descFormat(md.desc)}
      
${md.solutions.map((data, index) => analysisSolution(data, index + 1)).join('\n')}
      `
  );
}
function addSolution() {
  const path = filePath;
  const file = fs.readFileSync(path).toString();
  const matchList = file.matchAll(solutionReg);
  let lastIndex = 0;
  for (const match of matchList) lastIndex = parseInt(match[1]);
  fs.writeFileSync(
    filePath,
    file +
      md.solutions.map((data, index) => analysisSolution(data, index + 1 + lastIndex)).join('\n')
  );
}
function analysisSolution({ script, time, memory, desc, code }: Solution, index: number) {
  return `## 题解 ${index} - ${script}
- 编辑时间：${moment().format('YYYY.MM.DD')}
- 执行用时：${time}ms
- 内存消耗：${memory}mb
- 编程语言：${script}
- 解法介绍：${descFormat(desc)}
${backquote}${backquote}${backquote}${script}
${code}
${backquote}${backquote}${backquote}
`;
}
main();
