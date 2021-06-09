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
  name: '879. 盈利计划',
  url: 'https://leetcode-cn.com/problems/profitable-schemes/',
  difficulty: Difficulty.困难,
  tag: [Tag.动态规划],
  desc:
    '集团里有 n 名员工，他们可以完成各种各样的工作创造利润。有多少种计划可以选择？因为答案很大，所以 返回结果模 10^9 + 7 的值。',
  solutions: [
    {
      script: Script.TS,
      time: 320,
      memory: 76.8,
      desc: markdown.link(
        '参考链接',
        'https://leetcode-cn.com/problems/profitable-schemes/solution/ying-li-ji-hua-by-leetcode-solution-3t8o/'
      ),
      code: `function profitableSchemes(
        n: number,
        minProfit: number,
        group: number[],
        profit: number[]
      ): number {
        const MOD = 1e9 + 7;
        const len = group.length;
        const dp = new Array(len + 1)
          .fill(0)
          .map(_ => new Array(n + 1).fill(0).map(_ => new Array(minProfit + 1).fill(0)));
        dp[0][0][0] = 1;
        for (let i = 1; i <= len; i++) {
          const member = group[i - 1];
          const earn = profit[i - 1];
          for (let j = 0; j <= n; j++) {
            for (let k = 0; k <= minProfit; k++) {
              if (j < member) {
                dp[i][j][k] = dp[i - 1][j][k];
              } else {
                dp[i][j][k] = (dp[i - 1][j][k] + dp[i - 1][j - member][Math.max(0, k - earn)]) % MOD;
              }
            }
          }
        }
        let ans = 0;
        for (let i = 0; i <= n; i++) ans = (ans + dp[len][i][minProfit]) % MOD;
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
