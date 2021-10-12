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
  existMarkdown: true,
  name: '28. 实现 strStr()',
  url: 'https://leetcode-cn.com/problems/divide-two-integers/',
  difficulty: Difficulty.中等,
  tag: [Tag.位运算, Tag.数学],
  desc: `给定两个整数，被除数 dividend 和除数 divisor。将两数相除，要求不使用乘法、除法和 mod 运算符。`,
  solutions: [
    {
      script: Script.TS,
      time: 84,
      memory: 41.8,
      desc: 'kmp',
      code: `function getNext(needle: string) {
        const next: number[] = [-1];
        for (let i = 1, j = -1; needle[i]; i++) {
          while (j !== -1 && needle[j + 1] !== needle[i]) j = next[j];
          if (needle[j + 1] === needle[i]) j++;
          next[i] = j;
        }
        return next;
      }
      function strStr(haystack: string, needle: string): number {
        if (needle.length === 0) return 0;
        const next = getNext(needle);
        for (let i = 0, j = -1; haystack[i]; i++) {
          while (j !== -1 && needle[j + 1] !== haystack[i]) j = next[j];
          if (needle[j + 1] === haystack[i]) j++;
          if (!needle[j + 1]) return i - j;
        }
        return -1;
      }`,
    },
    {
      script: Script.TS,
      time: 1504,
      memory: 42.3,
      desc: 'sunday',
      code: `function getMap(needle: string) {
        const map: Record<string, number> = {};
        for (let i = 0; needle[i]; i++) map[needle[i]] = i;
        return (c: string) => map[c] ?? -1;
      }
      function strStr(haystack: string, needle: string): number {
        if (needle.length === 0) return 0;
        const len = needle.length;
        const map = getMap(needle);
        for (let i = 0; haystack[i]; i += len - map(haystack[i + len])) {
          let j = 0;
          while (needle[j] && haystack[i + j] === needle[j]) j++;
          if (!needle[j]) return i;
        }
        return -1;
      }`,
    },
  ],
};
const dirName = getDirName(md.name);
const dirPath = resolve(srcPath, dirName);
const filePath = resolve(dirPath, trimBlank(md.name) + '.md');
const descFormat = (str: string) => (str.endsWith('。') ? str : str + '。');

function main() {
  console.log(chalk.blue(`正在生成LeetCode题解`));
  console.log(LOGO);
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
