import { leetcode, trimBlank, resolve, fs, moment, specStr, LOGO, markdown } from './utils';

const { backquote } = specStr;
const { link } = markdown;
const { Script, Difficulty, Tag, srcPath, solutionReg, getDirOrder, getFileOrder, getDirName } =
  leetcode;
type Script = leetcode.Script;
type Difficulty = leetcode.Difficulty;
type Tag = leetcode.Tag;
type Solution = leetcode.Solution;
type Markdown = leetcode.Markdown;

const md: Markdown = {
  existMarkdown: !true,
  name: '1658. 将 x 减到 0 的最小操作数',
  url: 'https://leetcode-cn.com/problems/minimum-operations-to-reduce-x-to-zero/',
  difficulty: Difficulty.中等,
  tag: [Tag.数组, Tag.哈希表, Tag.双指针, Tag.二分查找, Tag.前缀和],
  desc: '给你一个整数数组 nums 和一个整数 x 。每一次操作时，你应当移除数组 nums 最左边或最右边的元素，然后从 x 中减去该元素的值。请注意，需要 修改 数组以供接下来的操作使用。',
  solutions: [
    {
      script: Script.TS,
      time: 192,
      memory: 60.9,
      desc: '左右各前缀和，遍历左值，查找右侧值',
      code: `function minOperations(nums: number[], x: number): number {
        const sumsL = [0];
        const sumsR = [0];
        const n = nums.length;
        for (let i = 0; i < n; i++) sumsL.push(nums[i] + sumsL[i]);
        for (let i = 0; i < n; i++) sumsR.push(nums[n - 1 - i] + sumsR[i]);
        let ans = Infinity;
        for (let i = 0; i <= n; i++) {
          const num = sumsL[i];
          const need = x - num;
          if (need < 0) break;
          let l = 0;
          let r = sumsR.length - 1;
          let mid!: number;
          while (l <= r) {
            mid = (l + r) >> 1;
            const midNum = sumsR[mid];
            if (midNum < need) l = mid + 1;
            else if (midNum > need) r = mid - 1;
            else break;
          }
          if (need === sumsR[mid] && i + mid <= n) {
            ans = Math.min(ans, i + mid);
          }
        }
        return ans === Infinity ? -1 : ans;
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
