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
  name: '363. 矩形区域不超过 K 的最大数值和',
  url: 'https://leetcode-cn.com/problems/max-sum-of-rectangle-no-larger-than-k/',
  difficulty: Difficulty.困难,
  tag: [Tag.二分查找, Tag.动态规划, Tag.队列],
  desc:
    '给你一个 m x n 的矩阵 matrix 和一个整数 k ，找出并返回矩阵内部矩形区域的不超过 k 的最大数值和。',
  solutions: [
    {
      script: Script.TS,
      time: 408,
      memory: 39.7,
      desc: '暴力循环四次',
      code: `function maxSumSubmatrix(matrix: number[][], k: number): number {
        const rowLen = matrix.length;
        const colLen = matrix[0].length;
        const dp: number[][] = new Array(rowLen + 1).fill(0).map(_ => new Array(colLen + 1).fill(0));
        let max = -Infinity;
        for (let row = 0; row < rowLen; row++) {
          for (let col = 0; col < colLen; col++) {
            let num = matrix[row][col] + dp[row + 1][col] + dp[row][col + 1] - dp[row][col];
            if (num === k) return k;
            dp[row + 1][col + 1] = matrix[row][col] + dp[row + 1][col] + dp[row][col + 1] - dp[row][col];
            for (let i = 0; i <= row; i++) {
              for (let j = 0; j <= col; j++) {
                const areaNum = num - dp[i][col + 1] - dp[row + 1][j] + dp[i][j];
                if (areaNum === k) return k;
                else if (areaNum < k) max = Math.max(max, areaNum);
              }
            }
          }
        }
        return max;
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
