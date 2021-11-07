import { leetcode, trimBlank, resolve, fs, moment, specStr, LOGO, markdown, chalk } from './utils';
import { leetCodeMarkdowns } from './leetCodeMarkdown';

const { backquote } = specStr;
const { srcPath, solutionReg, getDirOrder, getFileOrder, getDirName } = leetcode;
type Solution = leetcode.Solution;
type Markdown = leetcode.Markdown;

const descFormat = (str: string) => (str.endsWith('。') ? str : str + '。');
let current: Markdown;
let dirName!: string;
let filePath!: string;
let dirPath!: string;

function main() {
  console.log(chalk.blue(`正在生成LeetCode题解`));
  console.log(LOGO);
  for (const md of leetCodeMarkdowns) {
    current = md;
    dirName = getDirName(md.name);
    dirPath = resolve(srcPath, dirName);
    filePath = resolve(dirPath, trimBlank(md.name) + '.md');
    md.existMarkdown ? addSolution() : addMarkdown();
    console.log(chalk.blue(`${md.name}生成完成`));
  }
  console.log(chalk.green(`生成完成`));
}
function addMarkdown() {
  fs.writeFileSync(
    filePath,
    `---
title: ${current.name}
order: ${getFileOrder(current.name)}
nav:
  title: 力扣题解
  path: /leetcode
  order: 4
group:
  title: ${dirName}
  path: /${dirName}
  order: ${getDirOrder(dirName)}
---

# ${current.name}
    
> 链接：[${current.name}](${current.url})  
> 难度：${current.difficulty}  
> 标签：${current.tag.join('、')}  
> 简介：${descFormat(current.desc)}
      
${current.solutions.map((data, index) => analysisSolution(data, index + 1)).join('\n')}
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
      current.solutions
        .map((data, index) => analysisSolution(data, index + 1 + lastIndex))
        .join('\n')
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
