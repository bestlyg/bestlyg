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
  existMarkdown: false,
  name: '373. 查找和最小的K对数字',
  url: 'https://leetcode-cn.com/problems/find-k-pairs-with-smallest-sums/',
  difficulty: Difficulty.中等,
  tag: [Tag.堆],
  desc: '找到和最小的 k 对数字 (u1,v1), (u2,v2) ... (uk,vk)。',
  solutions: [
    {
      script: Script.TS,
      time: 2136,
      memory: 77,
      desc: '构建堆',
      code: `class Heap<T> {
        private arr: T[] = [];
        get isEmpty() {
          return this.size === 0;
        }
        get size() {
          return this.arr.length;
        }
        constructor(private compare: (num1: T, num2: T) => number) {}
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
            childrenIndex + 1 < this.size - 1 &&
            this.compare(this.arr[childrenIndex + 1], this.arr[childrenIndex]) > 0
          ) {
            childrenIndex++;
          }
          if (this.compare(this.arr[childrenIndex], this.arr[index]) > 0) {
            [this.arr[childrenIndex], this.arr[index]] = [this.arr[index], this.arr[childrenIndex]];
            this.shiftDown(childrenIndex);
          }
        }
      }
      
      function kSmallestPairs(nums1: number[], nums2: number[], k: number): number[][] {
        const sum = (arr: number[]) => arr.reduce((total, cur) => total + cur, 0);
        const heap = new Heap<number[]>((nums1, nums2) => sum(nums2) - sum(nums1));
        nums1.forEach(num1 => nums2.forEach(num2 => heap.add([num1, num2])));
        const ans: number[][] = [];
        while (heap.size && k--) ans.push(heap.remove());
        return ans;
      }  `,
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
  path = resolve(srcPath, path, name + '.md');
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
