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
  name: '740. 删除并获得点数',
  url: 'https://leetcode-cn.com/problems/delete-and-earn/',
  difficulty: Difficulty.中等,
  tag: [Tag.动态规划],
  desc: '开始你拥有 0 个点数。返回你能通过这些操作获得的最大点数。',
  solutions: [
    {
      script: Script.TS,
      time: 108,
      memory: 40.4,
      desc: '动态规划，计算包含前后值和不包含前后值得情况',
      code: `function deleteAndEarn(nums: number[]): number {
        const map = new Map<number, number>();
        nums.forEach(num => map.set(num, (map.get(num) ?? 0) + 1));
        const arr = [...map.keys()].sort((a, b) => a - b);
        const len = arr.length;
        const dp: number[][] = new Array(len).fill(0).map(_ => new Array(2).fill(0));
        dp[0][0] = arr[0] * map.get(arr[0])!;
        for (let i = 1; i < len; i++) {
          const num = arr[i];
          const maxPrev = Math.max(...dp[i - 1]);
          dp[i][1] = maxPrev;
          dp[i][0] = (map.has(num - 1) ? dp[i - 1][1] : maxPrev) + map.get(num)! * num;
        }
        return Math.max(...dp[len - 1]);
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
