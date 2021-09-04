import { leetcode, trimBlank, resolve, fs, moment, specStr, LOGO, markdown, chalk } from './utils';

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
  existMarkdown: true,
  name: '300. 最长递增子序列',
  url: 'https://leetcode-cn.com/problems/fei-bo-na-qi-shu-lie-lcof/',
  difficulty: Difficulty.中等,
  tag: [Tag.记忆化搜索, Tag.数学, Tag.动态规划],
  desc: '设计一个算法来计算你所能获取的最大利润。',
  solutions: [
    {
      script: Script.TS,
      time: 192,
      memory: 39.9,
      desc: '动态规划',
      code: `function lengthOfLIS(nums: number[]): number {
        const n = nums.length;
        const dp = new Array(n).fill(1);
        let ans = 1;
        for (let i = 1; i < n; i++) {
          for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
              dp[i] = Math.max(dp[i], dp[j] + 1);
              ans = Math.max(ans, dp[i]);
            }
          }
        }
        return ans;
      }`,
    },
    {
      script: Script.TS,
      time: 76,
      memory: 39.5,
      desc: '找尽可能长的序列',
      code: `function lengthOfLIS(nums: number[]): number {
        const list = [nums[0]];
        for (const num of nums) list[find(num)] = num;
        return list.length;
        function find(num: number): number {
          let l = 0;
          let r = list.length - 1;
          if (num > list[r]) return list.length;
          while (l < r) {
            const mid = (l + r) >> 1;
            if (list[mid] >= num) r = mid;
            else l = mid + 1;
          }
          return l;
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
  let file!: string;
  try {
    file = fs.readFileSync(path).toString();
  } catch (e) {
    console.log(chalk.red('没有这个文件'));
    process.exit(1);
  }
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
