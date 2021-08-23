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
  name: '1646. 获取生成数组中的最大值',
  url: 'https://leetcode-cn.com/problems/get-maximum-in-generated-array/',
  difficulty: Difficulty.简单,
  tag: [Tag.数组, Tag.动态规划, Tag.模拟],
  desc: '返回生成数组 nums 中的 最大 值。',
  solutions: [
    {
      script: Script.TS,
      time: 80,
      memory: 39.1,
      desc: '循环分别计算每个值',
      code: `function getMaximumGenerated(n: number): number {
        if (n === 0) return 0;
        if (n === 1) return 1;
        let ans = 1;
        const arr = new Array(n + 1);
        arr[0] = 0;
        arr[1] = 1;
        for (let i = 1; 2 * i + 1 <= n; i++) {
          ans = Math.max(ans, (arr[i * 2] = arr[i]));
          ans = Math.max(ans, (arr[i * 2 + 1] = arr[i] + arr[i + 1]));
        }
        return ans;
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
