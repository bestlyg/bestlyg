import { leetcode, trimBlank, resolve, fs, dayjs, specStr } from '../utils';

const { backquote } = specStr;
const {
  LeetCodeScript: Script,
  LeetCodeDifficulty: Difficulty,
  LeetCodeTag: Tag,
  HADER_FACE,
  HADER_LCP,
  HADER_OFFER,
  getNumDirName,
  srcPath,
  solutionReg,
} = leetcode;

interface Solution {
  script: leetcode.LeetCodeScript;
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
  difficulty: leetcode.LeetCodeDifficulty;
  tag: leetcode.LeetCodeTag[];
  solutions: Solution[];
}
const md: Markdown = {
  existMarkdown: true,
  name: '1046. 最后一块石头的重量',
  url: 'https://leetcode-cn.com/problems/number-of-orders-in-the-backlog/',
  difficulty: Difficulty.中等,
  tag: [Tag.贪心算法, Tag.堆],
  desc:
    '给你一个二维整数数组 orders ，输入所有订单后，返回积压订单中的 订单总数 。由于数字可能很大，所以需要返回对 109 + 7 取余的结果。',
  solutions: [
    {
      script: Script.TS,
      time: 92,
      memory: 39.1,
      desc: '构建堆',
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
      function lastStoneWeight(stones: number[]): number {
        const heap = new Heap((t1, t2) => t1 - t2);
        stones.forEach(v => heap.add(v));
        while (heap.size > 1) {
          const s1 = heap.remove();
          const s2 = heap.remove();
          if (s1 === s2) continue;
          heap.add(Math.abs(s1 - s2));
        }
        return heap.size === 0 ? 0 : heap.top;
      }`,
    },
  ],
};

const descFormat = (str: string) => (str.endsWith('。') ? str : str + '。');

function main() {
  md.existMarkdown ? addSolution() : addMarkdown();
}
function addMarkdown() {
  fs.writeFileSync(
    analysisPath(),
    `# ${md.name}
    
> 链接：[${md.name}](${md.url})  
> 难度：${md.difficulty}  
> 标签：${md.tag.join('、')}  
> 简介：${descFormat(md.desc)}
      
${md.solutions.map((data, index) => analysisSolution(data, index + 1)).join('\n')}
      `
  );
}
function addSolution() {
  const path = analysisPath();
  const file = fs.readFileSync(path).toString();
  const matchList = file.matchAll(solutionReg);
  let lastIndex = 0;
  for (const match of matchList) lastIndex = parseInt(match[1]);
  fs.writeFileSync(
    analysisPath(),
    file +
      md.solutions.map((data, index) => analysisSolution(data, index + 1 + lastIndex)).join('\n')
  );
}
function analysisPath() {
  const name = trimBlank(md.name);
  let path = '';
  if (name.startsWith(HADER_FACE)) {
    path = HADER_FACE;
  } else if (name.startsWith(HADER_LCP)) {
    path = HADER_LCP;
  } else if (name.startsWith(HADER_OFFER)) {
    path = HADER_OFFER;
  } else {
    path = getNumDirName(name);
  }
  const dirPath = resolve(srcPath, path);
  fs.ensureDirSync(dirPath);
  path = resolve(dirPath, name + '.md');
  return path;
}
function analysisSolution({ script, time, memory, desc, code }: Solution, index: number) {
  return `## 题解 ${index} - ${script}
- 编辑时间：${dayjs().format('YYYY.MM.DD')}
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
