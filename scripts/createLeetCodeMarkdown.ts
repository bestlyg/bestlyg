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
  name: '1818. 绝对差值和',
  url: 'https://leetcode-cn.com/problems/minimum-absolute-sum-difference/',
  difficulty: Difficulty.中等,
  tag: [Tag.数组, Tag.有序集合, Tag.贪心, Tag.二分查找],
  desc: '给你两个正整数数组 nums1 和 nums2 ，数组的长度都是 n 。在替换数组 nums1 中最多一个元素 之后 ，返回最小绝对差值和',
  solutions: [
    {
      script: Script.TS,
      time: 224,
      memory: 55.9,
      desc: '对每一位进行查找最近值',
      code: `function minAbsoluteSumDiff(nums1: number[], nums2: number[]): number {
        const len = nums1.length;
        const nums: number[] = new Array(len).fill(0).map((_, i) => Math.abs(nums1[i] - nums2[i]));
        nums1.sort((a, b) => a - b);
        const sum = nums.reduce((total, cur) => total + cur, 0);
        let ans = sum;
        for (let i = 0; i < len; i++) ans = Math.min(ans, sum - nums[i] + findMin(i));
        return ans % (10 ** 9 + 7);
        function findMin(index: number): number {
          const num2 = nums2[index];
          let left = 0;
          let right = len - 1;
          while (left < right) {
            const mid = (left + right) >> 1;
            const midNum = nums1[mid];
            if (midNum < num2) left = mid + 1;
            else if (midNum > num2) right = mid - 1;
            else {
              left = mid;
              break;
            }
          }
          return Math.min(
            Math.abs(nums1[left] - num2),
            left > 0 ? Math.abs(nums1[left - 1] - num2) : Infinity,
            left < len - 1 ? Math.abs(nums1[left + 1] - num2) : Infinity
          );
        }
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
