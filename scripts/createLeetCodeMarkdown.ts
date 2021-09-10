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
  name: '1894. 找到需要补充粉笔的学生编号',
  url: 'https://leetcode-cn.com/problems/find-the-student-that-will-replace-the-chalk/',
  difficulty: Difficulty.中等,
  tag: [Tag.数组, Tag.二分查找, Tag.前缀和, Tag.模拟],
  desc: '请你返回需要 补充 粉笔的学生 编号 。',
  solutions: [
    {
      script: Script.TS,
      time: 1052,
      memory: 49.6,
      desc: '循环相减',
      code: `function chalkReplacer(chalk: number[], k: number): number {
        const sum = chalk.reduce((total, cur) => total + cur, 0);
        while (k >= sum) k -= sum;
        let idx = 0;
        while (k >= chalk[idx]) k -= chalk[idx++];
        return idx;
      }`,
    },
    {
      script: Script.TS,
      time: 796,
      memory: 54.2,
      desc: '二分+前缀和',
      code: `function chalkReplacer(chalk: number[], k: number): number {
        let sum = 0;
        const sums: number[] = [0];
        const n = chalk.length;
        for (let i = 0; i < n; i++) sums.push((sum += chalk[i]));
        while (k >= sum) k -= sum;
        return find(k) - 1;
        function find(num: number) {
          let l = 0;
          let r = n;
          while (l < r) {
            const mid = (l + r) >> 1;
            if (sums[mid] > num) r = mid;
            else l = mid + 1;
          }
          return l;
        }
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
  console.log(chalk.blue(`正在生成LeetCode题解`));
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
