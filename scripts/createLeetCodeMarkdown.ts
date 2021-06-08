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
  name: '1049. 最后一块石头的重量 II',
  url: 'https://leetcode-cn.com/problems/last-stone-weight-ii/',
  difficulty: Difficulty.中等,
  tag: [Tag.动态规划],
  desc:
    '有一堆石头，用整数数组 stones 表示。其中 stones[i] 表示第 i 块石头的重量。最后，最多只会剩下一块 石头。返回此石头 最小的可能重量 。如果没有石头剩下，就返回 0。',
  solutions: [
    {
      script: Script.TS,
      time: 92,
      memory: 41.1,
      desc: 'sum-2*neg,neg尽可能接近sum',
      code: `function lastStoneWeightII(stones: number[]): number {
        const sum = stones.reduce((total, cur) => total + cur, 0);
        const len = stones.length;
        const half = sum >> 1;
        const dp = new Array(len + 1).fill(0).map(_ => new Array(half + 1).fill(false));
        dp[0][0] = true;
        for (let i = 0; i < len; i++) {
          for (let j = 0; j <= half; j++) {
            if (stones[i] > j) dp[i + 1][j] = dp[i][j];
            else dp[i + 1][j] = dp[i][j] || dp[i][j - stones[i]];
          }
        }
        for (let j = half; j >= 0; j--) if (dp[len][j]) return sum - 2 * j;
        return 0;
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
