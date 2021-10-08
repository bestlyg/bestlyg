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
  name: '187. 重复的DNA序列',
  url: 'https://leetcode-cn.com/problems/number-of-segments-in-a-string/',
  difficulty: Difficulty.简单,
  tag: [Tag.字符串],
  desc: `统计字符串中的单词个数，这里的单词指的是连续的不是空格的字符。`,
  solutions: [
    {
      script: Script.TS,
      time: 128,
      memory: 52.1,
      desc: '滑动窗口',
      code: `function findRepeatedDnaSequences(s: string): string[] {
        const set = new Set<string>();
        const window = s.substr(0, 10).split('');
        set.add(window.join(''));
        const ans = new Set<string>();
        for (let i = 10, l = s.length; i < l; i++) {
          window.shift();
          window.push(s[i]);
          const str = window.join('');
          if (set.has(str)) ans.add(str);
          set.add(str);
        }
        return [...ans];
      }`,
    },
    {
      script: Script.TS,
      time: 80,
      memory: 50.6,
      desc: '滑动窗口',
      code: `function findRepeatedDnaSequences(s: string): string[] {
        const set = new Set<string>();
        let str = s.substr(0, 10);
        set.add(str);
        const ans = new Set<string>();
        for (let i = 10, l = s.length; i < l; i++) {
          str = str.substring(1) + s[i];
          if (set.has(str)) ans.add(str);
          set.add(str);
        }
        return [...ans];
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
