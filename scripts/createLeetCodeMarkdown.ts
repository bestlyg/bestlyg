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
  name: '990. 等式方程的可满足性',
  url: 'https://leetcode-cn.com/problems/single-number-ii/',
  difficulty: Difficulty.中等,
  tag: [Tag.位运算],
  desc:
    '给你一个整数数组 nums ，除某个元素仅出现 一次 外，其余每个元素都恰出现 三次 。请你找出并返回那个只出现了一次的元素。',
  solutions: [
    {
      script: Script.TS,
      time: 108,
      memory: 41.8,
      desc: '并查集',
      code: `class UnionFind {
        elements: number[];
        constructor(public size: number) {
          this.elements = new Array(size).fill(0).map((_, i) => i);
        }
        same(v1: number, v2: number): boolean {
          return this.find(v1) === this.find(v2);
        }
        find(v: number): number {
          return v === this.elements[v] ? v : (this.elements[v] = this.find(this.elements[v]));
        }
        union(v1: number, v2: number): void {
          const e1 = this.find(v1);
          const e2 = this.find(v2);
          if (e1 !== e2) {
            this.elements[e1] = e2;
            this.size--;
          }
        }
      }
      function equationsPossible(equations: string[]): boolean {
        equations.sort((a, b) => {
          if (a[1] === '=') return -1;
          return 1;
        });
        const uf = new UnionFind(26);
        const toNum = (char: string) => char.codePointAt(0)! - 'a'.codePointAt(0)!;
        for (const equation of equations) {
          const num1 = toNum(equation[0]);
          const num2 = toNum(equation[3]);
          const same = equation[1] === '=';
          if (same) uf.union(num1, num2);
          else if (uf.same(num1, num2)) return false;
        }
        return true;
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
  order: 3
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
