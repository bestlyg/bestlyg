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
  name: '1856. 子数组最小乘积的最大值',
  url: 'https://leetcode-cn.com/problems/maximum-subarray-min-product/',
  difficulty: Difficulty.中等,
  tag: [Tag.栈, Tag.数组, Tag.前缀和, Tag.单调栈],
  desc: '给你一个正整数数组 nums ，请你返回 nums 任意 非空子数组 的最小乘积 的 最大值 。',
  solutions: [
    {
      script: Script.TS,
      time: 352,
      memory: 67.2,
      desc: '单调栈，获取两边的最大值，由于js最多表示53位，需要用bigint',
      code: `function maxSumMinProduct(nums: number[]): number {
        const n = nums.length;
        const l = new Array(n).fill(-1);
        const r = new Array(n).fill(n);
        const stack: number[] = [];
        const sums: number[] = [0];
        let sum = 0;
        for (let i = 0; i < n; i++) {
          const num = nums[i];
          sums.push((sum += num));
          while (stack.length && nums[stack[stack.length - 1]] >= num) r[stack.pop()!] = i;
          if (stack.length) l[i] = stack[stack.length - 1];
          stack.push(i);
        }
        let ans = 0n;
        for (let i = 0; i < n; i++) {
          const num = (BigInt(sums[r[i]]) - BigInt(sums[l[i] + 1])) * BigInt(nums[i]);
          ans = ans > num ? ans : num;
        }
        ans %= BigInt(10 ** 9 + 7);
        return Number(ans);
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
