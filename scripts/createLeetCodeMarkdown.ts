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
  name: '930. 和相同的二元子数组',
  url: 'https://leetcode-cn.com/problems/binary-subarrays-with-sum/',
  difficulty: Difficulty.中等,
  tag: [Tag.数组, Tag.哈希表, Tag.前缀和, Tag.滑动窗口],
  desc: '给你一个二元数组 nums ，和一个整数 goal ，请你统计并返回有多少个和为 goal 的 非空 子数组。',
  solutions: [
    {
      script: Script.TS,
      time: 1800,
      memory: 46.1,
      desc: '遍历两次',
      code: `function numSubarraysWithSum(nums: number[], goal: number): number {
        const len = nums.length;
        const sums = [0];
        for (let i = 0; i < len; i++) sums.push(nums[i] + sums[sums.length - 1]);
        let ans = 0;
        for (let i = 1; i <= len; i++) {
          for (let j = 0; j < i; j++) {
            const num = sums[i] - sums[j];
            if (num < goal) break;
            if (num === goal) ans++;
          }
        }
        return ans;
      }`,
    },
    {
      script: Script.TS,
      time: 92,
      memory: 45.6,
      desc: '利用哈希表储存前缀和进行快速遍历',
      code: `function numSubarraysWithSum(nums: number[], goal: number): number {
        let ans = 0;
        let sum = 0;
        const map = new Map<number, number>();
        for (const num of nums) {
          map.set(sum, (map.get(sum) ?? 0) + 1);
          sum += num;
          ans += map.get(sum - goal) ?? 0;
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
