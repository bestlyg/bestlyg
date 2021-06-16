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
  name: '877. 石子游戏',
  url: 'https://leetcode-cn.com/problems/stone-game/ray/',
  difficulty: Difficulty.中等,
  tag: [Tag.极小化极大, Tag.数学, Tag.动态规划],
  desc:
    '亚历克斯和李用几堆石子在做游戏。假设亚历克斯和李都发挥出最佳水平，当亚历克斯赢得比赛时返回 true ，当李赢得比赛时返回 false 。',
  solutions: [
    {
      script: Script.TS,
      time: 104,
      memory: 44.8,
      desc: markdown.link(
        '参考链接',
        'https://leetcode-cn.com/problems/stone-game/solution/shi-zi-you-xi-by-leetcode-solution/'
      ),
      code: `function stoneGame(piles: number[]): boolean {
        const len = piles.length;
        const dp = new Array(len).fill(0).map(_ => new Array(len));
        for (let i = 0; i < len; i++) dp[i][i] = piles[i];
        for (let i = len - 2; i >= 0; i--) {
          for (let j = i + 1; j < len; j++) {
            dp[i][j] = Math.max(piles[i] - dp[i + 1][j], piles[j] - dp[i][j - 1]);
          }
        }
        return dp[0][len - 1] > 0;
      }`,
    },
    {
      script: Script.TS,
      time: 84,
      memory: 39.2,
      desc: markdown.link(
        '参考链接',
        'https://leetcode-cn.com/problems/stone-game/solution/shi-zi-you-xi-by-leetcode-solution/'
      ),
      code: `function stoneGame(piles: number[]): boolean {
       return true;
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
