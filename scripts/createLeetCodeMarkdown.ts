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
  name: '678. 有效的括号字符串',
  url: 'https://leetcode-cn.com/problems/valid-parenthesis-string/',
  difficulty: Difficulty.中等,
  tag: [Tag.栈, Tag.贪心, Tag.字符串, Tag.动态规划],
  desc: '给定一个只包含三种字符的字符串：（ ，） 和 *，写一个函数来检验这个字符串是否为有效字符串。',
  solutions: [
    {
      script: Script.TS,
      time: 80,
      memory: 39.5,
      desc: '分别统计左括号和*的下标，遍历到右括号时消除',
      code: `function checkValidString(s: string): boolean {
        const leftStack: number[] = [];
        const starStack: number[] = [];
        for (let i = 0; i < s.length; i++) {
          const c = s[i];
          if (c === '(') leftStack.push(i);
          else if (c === '*') starStack.push(i);
          else {
            if (leftStack.length === 0 && starStack.length === 0) return false;
            if (leftStack.length !== 0) leftStack.pop();
            else starStack.pop();
          }
        }
        while (leftStack.length !== 0 && starStack.length !== 0) {
          const left = leftStack.pop()!;
          const star = starStack.pop()!;
          if (left > star) return false;
        }
        return leftStack.length===0;
      }`,
    },
    {
      script: Script.TS,
      time: 68,
      memory: 39.4,
      desc: '贪心，统计左括号可能的最大值和最小值',
      code: `function checkValidString(s: string): boolean {
        let min = 0;
        let max = 0;
        for (const c of s) {
          if (c === '(') {
            min++;
            max++;
          } else if (c === ')') {
            min = Math.max(min - 1, 0);
            max--;
            if (max < 0) return false;
          } else {
            min = Math.max(min - 1, 0);
            max++;
          }
        }
        return min === 0;
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
