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
  name: '91. 解码方法',
  url: 'https://leetcode-cn.com/problems/decode-ways/',
  difficulty: Difficulty.中等,
  tag: [Tag.字符串, Tag.动态规划],
  desc: '给你一个只含数字的 非空 字符串 s ，请计算并返回 解码 方法的 总数 。',
  solutions: [
    {
      script: Script.TS,
      time: 88,
      memory: 39.8,
      desc: link(
        '参考链接',
        'https://leetcode-cn.com/problems/decode-ways/solution/jie-ma-fang-fa-by-leetcode-solution-p8np/'
      ),
      code: `function numDecodings(s: string): number {
        const len = s.length;
        const toNum = (c: string) => c.codePointAt(0)! - '0'.codePointAt(0)!;
        const dp = new Array(len + 1).fill(0);
        dp[0] = 1;
        for (let i = 1; i <= len; ++i) {
          if (s[i - 1] !== '0') dp[i] += dp[i - 1];
          if (i > 1 && s[i - 2] !== '0' && toNum(s[i - 2]) * 10 + toNum(s[i - 1]) <= 26) {
            dp[i] += dp[i - 2];
          }
        }
        return dp[len];
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
