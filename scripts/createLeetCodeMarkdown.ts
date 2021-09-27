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
  name: '639. 解码方法 II',
  url: 'https://leetcode-cn.com/problems/decode-ways-ii/',
  difficulty: Difficulty.困难,
  tag: [Tag.字符串, Tag.动态规划],
  desc: `给你一个字符串 s ，由数字和 '*' 字符组成，返回 解码 该字符串的方法 数目 。`,
  solutions: [
    {
      script: Script.TS,
      time: 104,
      memory: 48.9,
      desc: '动态规划',
      code: `function numDecodings(s: string): number {
        const MOD = 10 ** 9 + 7;
        const n = s.length;
        const dp: number[] = new Array(n).fill(0);
        dp[0] = s[0] === '*' ? 9 : s[0] === '0' ? 0 : 1;
        let prev = s[0];
        const add = (idx: number, val: number) => (dp[idx] = (dp[idx] + val) % MOD);
        for (let i = 1; i < n; i++) {
          const prev2Num = dp[i - 2] ?? 1;
          const char = s[i];
          if (char === '*') {
            add(i, 9 * dp[i - 1]);
            const c = prev === '1' ? 9 : prev === '*' ? 9 + 6 : prev === '2' ? 6 : 0;
            add(i, c * prev2Num);
          } else if (char !== '0') {
            dp[i] += dp[i - 1];
            let c = 0;
            if (prev === '1' || prev === '*') c++;
            if ((prev === '2' || prev === '*') && char !== '7' && char !== '8' && char !== '9') c++;
            add(i, c * prev2Num);
          } else {
            if (prev !== '1' && prev !== '2' && prev !== '*') return 0;
            const c = prev === '*' ? 2 : 1;
            add(i, c * prev2Num);
          }
          prev = char;
        }
        return dp[n - 1];
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
