import { leetcode, trimBlank, resolve, fs, dayjs, specStr, LOGO, chalk } from './utils';
import md from './leetCodeMarkdown';

const { backquote } = specStr;
const { srcPath, reg, analysisFileName, findLastSolutionIdx } = leetcode;
type Solution = leetcode.Solution;
type Markdown = leetcode.Markdown;

const descFormat = (str: string) => (str.endsWith('。') ? str : str + '。');
const { dirname, fileorder, dirorder } = analysisFileName(md.name);
const dirpath = resolve(srcPath, dirname);
const filepath = resolve(dirpath, trimBlank(md.name) + '.md');

function main() {
  console.log(chalk.blue(`正在生成LeetCode题解`));
  console.log(LOGO);
  md.exist ? addSolution() : addMarkdown();
  console.log(chalk.blue(`${md.name}生成完成`));
  console.log(chalk.green(`生成完成`));
}
main();
function addMarkdown() {
  fs.ensureDirSync(dirpath);
  fs.writeFileSync(
    filepath,
    `---
title: ${md.name}
order: ${fileorder}
nav:
  title: 力扣题解
  path: /leetcode
  order: 4
group:
  title: ${dirname}
  path: /${dirname}
  order: ${dirorder}
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
  let file!: string;
  try {
    file = fs.readFileSync(filepath).toString();
  } catch (e) {
    console.log(chalk.red('没有这个文件'));
    return;
  }
  fs.writeFileSync(
    filepath,
    file +
      md.solutions
        .map((data, index) => analysisSolution(data, index + 1 + findLastSolutionIdx(file)))
        .join('\n')
  );
}
function analysisSolution({ script, time, memory, desc, code }: Solution, index: number) {
  return `## 题解 ${index} - ${script}
- 编辑时间：${dayjs().format('YYYY.MM.DD')}
- 执行用时：${time}ms
- 内存消耗：${memory}mb
- 编程语言：${script}
- 解法介绍：${descFormat(desc)}
${backquote}${backquote}${backquote}${script}
${code}
${backquote}${backquote}${backquote}
`;
}
