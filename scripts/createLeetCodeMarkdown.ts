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
  name: '368. 最大整除子集',
  url: 'https://leetcode-cn.com/problems/largest-divisible-subset/',
  difficulty: Difficulty.中等,
  tag: [Tag.数学, Tag.动态规划],
  desc: '给你一个由 无重复 正整数组成的集合 nums ，请你找出并返回其中最大的整除子集 answer',
  solutions: [
    {
      script: Script.TS,
      time: 124,
      memory: 41,
      desc: '动态规划',
      code: `function largestDivisibleSubset(nums: number[]): number[] {
        nums.sort((a, b) => a - b);
        const len = nums.length;
        let maxSize = 1;
        let maxVal = nums[0];
        const dp = new Array(len).fill(1);
        for (let i = 1; i < len; i++) {
          const num = nums[i];
          for (let j = 0; j < i; j++) {
            if (num % nums[j] === 0) dp[i] = Math.max(dp[i], dp[j] + 1);
          }
          if (dp[i] > maxSize) {
            maxSize = dp[i];
            maxVal = num;
          }
        }
        const ans: number[] = [];
        for (let i = len - 1; i >= 0; i--) {
          const num = nums[i];
          if (dp[i] === maxSize && maxVal % num === 0) {
            ans.unshift(num);
            maxSize--;
            maxVal = num;
          }
        }
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
