import { leetcode, trimBlank, resolve, fs, moment, specStr, LOGO, markdown } from './utils';

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
  name: '43. 字符串相乘',
  url: 'https://leetcode-cn.com/problems/minimum-limit-of-balls-in-a-bag/',
  difficulty: Difficulty.中等,
  tag: [Tag.数组, Tag.二分查找],
  desc: '给你一个整数数组 nums ，你的开销是单个袋子里球数目的 最大值 ，你想要 最小化 开销。',
  solutions: [
    {
      script: Script.TS,
      time: 92,
      memory: 39.4,
      desc: 'bigint',
      code: `function multiply(num1: string, num2: string): string {
        return BigInt(num1)*BigInt(num2)+''
        };`,
    },
    {
      script: Script.TS,
      time: 100,
      memory: 40.4,
      desc: '统计每一位',
      code: `function multiply(num1: string, num2: string): string {
        const n1 = num1.length;
        const n2 = num2.length;
        const list1 = new Array(n1)
          .fill(0)
          .map((_, i) => +num1[i])
          .reverse();
        const list2 = new Array(n2)
          .fill(0)
          .map((_, i) => +num2[i])
          .reverse();
        const n = n1 + n2 - 1;
        const ans: number[] = new Array(n).fill(0);
        for (let i = 0; i < n1; i++) {
          for (let j = 0; j < n2; j++) {
            ans[i + j] += list1[i] * list2[j];
          }
        }
        let add = 0;
        for (let i = 0; i < n; i++) {
          if (add) {
            ans[i] += add;
            add = 0;
          }
          if (ans[i] >= 10) {
            add = ~~(ans[i] / 10);
            ans[i] = ans[i] % 10;
          }
        }
        if (add) ans.push(add);
        while (ans.length > 1 && ans[ans.length - 1] === 0) ans.pop();
        return ans.reverse().join('');
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
