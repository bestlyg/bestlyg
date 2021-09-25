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
  name: '583. 两个字符串的删除操作',
  url: 'https://leetcode-cn.com/problems/delete-operation-for-two-strings/',
  difficulty: Difficulty.中等,
  tag: [Tag.字符串, Tag.动态规划],
  desc: `给定两个单词 word1 和 word2，找到使得 word1 和 word2 相同所需的最小步数，每步可以删除任意一个字符串中的一个字符。`,
  solutions: [
    {
      script: Script.TS,
      time: 112,
      memory: 46,
      desc: '动态规划',
      code: `function minDistance(word1: string, word2: string): number {
        const n1 = word1.length;
        const n2 = word2.length;
        const dp = new Array(n1 + 1).fill(0).map(_ => new Array(n2 + 1).fill(0));
        for (let i = 1; i <= n1; i++) dp[i][0] = i;
        for (let i = 1; i <= n2; i++) dp[0][i] = i;
        for (let i1 = 1; i1 <= n1; i1++) {
          const c1 = word1[i1 - 1];
          for (let i2 = 1; i2 <= n2; i2++) {
            const c2 = word2[i2 - 1];
            if (c1 === c2) {
              dp[i1][i2] = dp[i1 - 1][i2 - 1];
            } else {
              dp[i1][i2] = Math.min(dp[i1 - 1][i2] + 1, dp[i1][i2 - 1] + 1, dp[i1 - 1][i2 - 1] + 2);
            }
          }
        }
        return dp[n1][n2];
      }`,
    },
    {
      script: Script.TS,
      time: 108,
      memory: 41.5,
      desc: '动态规划，优化n1',
      code: `function minDistance(word1: string, word2: string): number {
        const n1 = word1.length;
        const n2 = word2.length;
        const dp = new Array(2).fill(0).map(_ => new Array(n2 + 1).fill(0));
        for (let i = 1; i <= n2; i++) dp[0][i] = i;
        for (let i1 = 1; i1 <= n1; i1++) {
          const c1 = word1[i1 - 1];
          const idx1 = i1 % 2;
          dp[idx1][0] = i1;
          const prevIdx1 = idx1 ^ 1;
          for (let i2 = 1; i2 <= n2; i2++) {
            const c2 = word2[i2 - 1];
            if (c1 === c2) {
              dp[idx1][i2] = dp[prevIdx1][i2 - 1];
            } else {
              dp[idx1][i2] = Math.min(
                dp[prevIdx1][i2] + 1,
                dp[idx1][i2 - 1] + 1,
                dp[prevIdx1][i2 - 1] + 2
              );
            }
          }
        }
        return dp[n1 % 2][n2];
      }`,
    },
  ],
};
const dirName = getDirName(md.name);
const dirPath = resolve(srcPath, dirName);
const filePath = resolve(dirPath, trimBlank(md.name) + '.md');
const descFormat = (str: string) => (str.endsWith('。') ? str : str + '。');

function main() {
  console.log(chalk.blue(`正在生成LeetCode题解`));
  console.log(LOGO);
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
