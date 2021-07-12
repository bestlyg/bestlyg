import { leetcode, trimBlank, resolve, fs, moment, specStr, LOGO, markdown } from './utils';

const { backquote } = specStr;
const { link } = markdown;
const { Script, Difficulty, Tag, srcPath, solutionReg, getDirOrder, getFileOrder, getDirName } =
  leetcode;
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
  existMarkdown: false,
  name: '275. H 指数 II',
  url: 'https://leetcode-cn.com/problems/h-index-ii/',
  difficulty: Difficulty.中等,
  tag: [Tag.数组, Tag.二分查找],
  desc: '给定一位研究者论文被引用次数的数组（被引用次数是非负整数），数组已经按照 升序排列 。编写一个方法，计算出研究者的 h 指数。',
  solutions: [
    {
      script: Script.TS,
      time: 68,
      memory: 42.7,
      desc: '直接求出最大值',
      code: `function hIndex(citations: number[]): number {
        if (citations.every(v => v === 0)) return 0;
        const len = citations.length;
        const max = citations[len - 1];
        const arr = new Array(max + 1).fill(0);
        citations.forEach(num => arr[num]++);
        let sum = 0;
        let ans = 0;
        for (let num = max; num >= 0; num--) {
          const count = arr[num];
          if (count === 0) continue;
          ans = Math.max(ans, Math.min((sum += count), num));
        }
        return ans;
      }`,
    },
    {
      script: Script.TS,
      time: 80,
      memory: 42.7,
      desc: '二分查找',
      code: `function hIndex(citations: number[]): number {
        const len = citations.length;
        let left = 0;
        let right = len - 1;
        while (left <= right) {
          const mid = (left + right) >> 1;
          if (citations[mid] >= len - mid) right = mid - 1;
          else left = mid + 1;
        }
        return len - left;
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
