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
  name: '1337. 矩阵中战斗力最弱的 K 行',
  url: 'https://leetcode-cn.com/problems/the-k-weakest-rows-in-a-matrix/',
  difficulty: Difficulty.简单,
  tag: [Tag.数组, Tag.二分查找, Tag.矩阵, Tag.排序, Tag.堆_优先队列],
  desc: '给你一个大小为 m * n 的矩阵 mat，矩阵由若干军人和平民组成，分别用 1 和 0 表示。请你返回矩阵中战斗力最弱的 k 行的索引，按从最弱到最强排序。',
  solutions: [
    {
      script: Script.TS,
      time: 76,
      memory: 39.9,
      desc: '哈希储存',
      code: `function kWeakestRows(mat: number[][], k: number): number[] {
        return mat
          .map((list, i) => {
            const ans: [number, number] = [i, 0];
            for (const n of list) {
              if (n === 1) ans[1]++;
              else break;
            }
            return ans;
          })
          .sort(([i1, v1], [i2, v2]) => (v1 === v2 ? i1 - i2 : v1 - v2))
          .map(([i]) => i).slice(0,k);
      }
      `,
    },
    {
      script: Script.TS,
      time: 108,
      memory: 42.1,
      desc: '哈希储存+二分查找',
      code: `function kWeakestRows(mat: number[][], k: number): number[] {
        return mat
          .map((list, i) => [i, find(list)]).map(v => {
            console.log(v)
            return v
          })
          .sort(([i1, v1], [i2, v2]) => (v1 === v2 ? i1 - i2 : v1 - v2))
          .map(([i]) => i)
          .slice(0, k);
        function find(list: number[]): number {
          let l = 0;
          let r = list.length - 1;
          while (l < r) {
            const mid = (l + r) >> 1;
            if (list[mid] === 0) r = mid;
            else l = mid + 1;
          }
          if(list[l]===1)return list.length
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
