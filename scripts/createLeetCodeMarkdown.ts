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
  name: '552. 学生出勤记录 II',
  url: 'https://leetcode-cn.com/problems/student-attendance-record-ii/',
  difficulty: Difficulty.困难,
  tag: [Tag.动态规划],
  desc: '给你一个整数 n ，表示出勤记录的长度（次数）。请你返回记录长度为 n 时，可能获得出勤奖励的记录情况 数量 。',
  solutions: [
    {
      script: Script.TS,
      time: 2216,
      memory: 78.9,
      desc: 'dp[i][j][k]=第i天的时候存在j个A和k个L的情况',
      code: `function checkRecord(n: number): number {
        const mod = 10 ** 9 + 7;
        const dp = new Array(n + 1).fill(0).map(_ => new Array(2).fill(0).map(_ => new Array(3).fill(0)));
        dp[0][0][0] = 1;
        for (let i = 1; i <= n; i++) {
          for (let j = 0; j < 2; j++) {
            for (let k = 0; k < 3; k++) {
              dp[i][j][0] = (dp[i][j][0] + dp[i - 1][j][k]) % mod;
            }
          }
          for (let k = 0; k < 3; k++) {
            dp[i][1][0] = (dp[i][1][0] + dp[i - 1][0][k]) % mod;
          }
          for (let j = 0; j < 2; j++) {
            for (let k = 1; k < 3; k++) {
              dp[i][j][k] = (dp[i][j][k] + dp[i - 1][j][k - 1]) % mod;
            }
          }
        }
        let ans = 0;
        for (let j = 0; j < 2; j++) for (let k = 0; k < 3; k++) ans = (ans + dp[n][j][k]) % mod;
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
