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
  existMarkdown: !true,
  name: '673. 最长递增子序列的个数',
  url: 'https://leetcode-cn.com/problems/number-of-longest-increasing-subsequence/',
  difficulty: Difficulty.中等,
  tag: [Tag.树状数组, Tag.线段树, Tag.数组, Tag.动态规划],
  desc: `给定一个未排序的整数数组，找到最长递增子序列的个数。`,
  solutions: [
    {
      script: Script.JS,
      time: 108,
      memory: 40.5,
      desc: '动态规划',
      code: `function findNumberOfLIS(nums: number[]): number {
        const n = nums.length;
        const dp = new Array(n).fill(0).map(_ => ({ val: 1, cnt: 1 }));
        let maxVal = 1;
        let maxCnt = 0;
        for (let i = 0; i < n; i++) {
          const num = nums[i];
          for (let j = 0; j < i; j++) {
            if (nums[j] < num) {
              const len = dp[j].val + 1;
              if (dp[i].val < len) {
                dp[i].val = len;
                dp[i].cnt = dp[j].cnt;
              } else if (dp[i].val === len) dp[i].cnt += dp[j].cnt;
            }
          }
          if (maxVal < dp[i].val) {
            maxVal = Math.max(maxVal, dp[i].val);
            maxCnt = dp[i].cnt;
          } else if (maxVal === dp[i].val) maxCnt += dp[i].cnt;
        }
        return maxCnt;
      }
      `,
    },
  ],
};
const dirName = getDirName(md.name);
const dirPath = resolve(srcPath, dirName);
const filePath = resolve(dirPath, trimBlank(md.name) + '.md');
const descFormat = (str: string) => (str.endsWith('。') ? str : str + '。');

function main() {
  console.log(LOGO);
  console.log(chalk.blue(`正在生成LeetCode题解`));
  md.existMarkdown ? addSolution() : addMarkdown();
  console.log(chalk.green(`生成完成`));
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
