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
  existMarkdown: false,
  name: '1738. 找出第 K 大的异或坐标值',
  url: 'https://leetcode-cn.com/problems/find-kth-largest-xor-coordinate-value/',
  difficulty: Difficulty.中等,
  tag: [Tag.数组],
  desc: '请你找出 matrix 的所有坐标中第 k 大的值（k 的值从 1 开始计数）。',
  solutions: [
    {
      script: Script.TS,
      time: 736,
      memory: 105.1,
      desc: '前缀和',
      code: `function kthLargestValue(matrix: number[][], k: number): number {
        const rowLen = matrix.length;
        const colLen = matrix[0].length;
        const prefixSumList: number[][] = new Array(rowLen + 1)
          .fill(0)
          .map(_ => new Array(colLen + 1).fill(0));
        const list :number[]=[]
        for (let row = 1; row <= rowLen; row++) {
          for (let col = 1; col <= colLen; col++) {
            list.push(
              (prefixSumList[row][col] =
                prefixSumList[row - 1][col] ^
                prefixSumList[row][col - 1] ^
                prefixSumList[row - 1][col - 1] ^
                matrix[row - 1][col - 1])
            );
          }
        }
        return list.sort((a,b)=>b-a)[k-1];
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
