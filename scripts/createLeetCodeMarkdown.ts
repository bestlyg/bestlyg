import { leetcode, trimBlank, resolve, fs, moment, specStr, LOGO } from './utils';

const { backquote } = specStr;
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
  name: '87. 扰乱字符串',
  url: 'https://leetcode-cn.com/problems/scramble-string/',
  difficulty: Difficulty.困难,
  tag: [Tag.动态规划, Tag.动态规划],
  desc:
    '给你两个 长度相等 的字符串 s1 和 s2，判断 s2 是否是 s1 的扰乱字符串。如果是，返回 true ；否则，返回 false 。',
  solutions: [
    {
      script: Script.TS,
      time: 128,
      memory: 46,
      desc: '动态规划',
      code: `function isScramble(s1: string, s2: string): boolean {
        const len = s1.length;
        // 从s1的i下标开始，从s2的j下标开始，k个长度是否匹配
        const dp: boolean[][][] = new Array(len)
          .fill(0)
          .map(_ => new Array(len).fill(0).map(_ => new Array(len + 1).fill(false)));
        for (let i = 0; i < len; i++) for (let j = 0; j < len; j++) dp[i][j][1] = s1[i] === s2[j];
        // 匹配的长度
        for (let k = 2; k <= len; k++) {
          const mixIndex = len - k + 1;
          // s1的下标
          for (let i = 0; i < mixIndex; i++) {
            // s2的下标
            for (let j = 0; j < mixIndex; j++) {
              // 截取的位置
              for (let sp = 1; sp < k && !dp[i][j][k]; sp++) {
                dp[i][j][k] =
                  (dp[i][j][sp] && dp[i + sp][j + sp][k - sp]) ||
                  (dp[i][j + k - sp][sp] && dp[i + sp][j][k - sp]);
              }
            }
          }
        }
        return dp[0][0][len];
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
