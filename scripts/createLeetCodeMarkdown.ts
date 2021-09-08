import { leetcode, trimBlank, resolve, fs, moment, specStr, LOGO, markdown, chalk } from './utils';

const { backquote } = specStr;
const { link } = markdown;
const { Script, Difficulty, Tag, srcPath, solutionReg, getDirOrder, getFileOrder, getDirName } =
  leetcode;
type Script = leetcode.Script;
type Difficulty = leetcode.Difficulty;
type Tag = leetcode.Tag;
type Solution = leetcode.Solution;
type Markdown = leetcode.Markdown;

const md: Markdown = {
  existMarkdown: !true,
  name: '502. IPO',
  url: 'https://leetcode-cn.com/problems/ipo/',
  difficulty: Difficulty.困难,
  tag: [Tag.贪心, Tag.数组, Tag.排序, Tag.堆_优先队列],
  desc: '从给定项目中选择 最多 k 个不同项目的列表，以 最大化最终资本 ，并输出最终可获得的最多资本。',
  solutions: [
    {
      script: Script.TS,
      time: 336,
      memory: 66.9,
      desc: '利用堆快速找出当前利润最大值',
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
      type Data = {
        cost: number;
        profit: number;
      };
      function findMaximizedCapital(k: number, w: number, profits: number[], capital: number[]): number {
        const n = profits.length;
        const list: Data[] = [];
        for (let i = 0; i < n; i++)
          list.push({
            cost: capital[i],
            profit: profits[i],
          });
        list.sort((a, b) => a.cost - b.cost);
        const heap = new Heap<Data>((t1, t2) => t1.profit - t2.profit);
        if (w >= list[list.length - 1].cost) {
          return list
            .sort((a, b) => b.profit - a.profit)
            .slice(0, k)
            .reduce((total, cur) => (total += cur.profit), w);
        }
        let idx = 0;
        while (k > 0) {
          while (idx < n && list[idx].cost <= w) {
            heap.add(list[idx++]);
          }
          if (heap.size === 0) break;
          const data = heap.remove();
          w += data.profit;
          k--;
        }
        return w;
      }
      `,
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
  let file!: string;
  try {
    file = fs.readFileSync(path).toString();
  } catch (e) {
    console.log(chalk.red('没有这个文件'));
    process.exit(1);
  }
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
