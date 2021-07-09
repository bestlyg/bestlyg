import { leetcode, trimBlank, resolve, fs, moment, specStr, LOGO, markdown } from './utils';

const { backquote } = specStr;
const { link } = markdown;
const { Script, Difficulty, Tag, srcPath, solutionReg, getDirOrder, getFileOrder, getDirName } =
  leetcode;
type Script = leetcode.Script;
type Difficulty = leetcode.Difficulty;
type Tag = leetcode.Tag;

interface Solution {
  script: Script;
  time: number;
  memory: number;
  desc: string;
  code: string;
}
interface Markdown {
  existMarkdown: boolean;
  name: string;
  url: string;
  desc: string;
  difficulty: Difficulty;
  tag: Tag[];
  solutions: Solution[];
}
const md: Markdown = {
  existMarkdown: false,
  name: '面试题 17.10. 主要元素',
  url: 'https://leetcode-cn.com/problems/find-majority-element-lcci/',
  difficulty: Difficulty.简单,
  tag: [Tag.数组, Tag.计数],
  desc: '数组中占比超过一半的元素称之为主要元素。给你一个 整数 数组，找出其中的主要元素。若没有，返回 -1 。请设计时间复杂度为 O(N) 、空间复杂度为 O(1) 的解决方案。',
  solutions: [
    {
      script: Script.TS,
      time: 72,
      memory: 42.6,
      desc: '利用map储存所有值',
      code: `function majorityElement(nums: number[]): number {
        const map: Map<number, number> = new Map();
        const len = nums.length;
        for (let i = 0; i < len; i++) {
          const num = nums[i];
          map.set(num, (map.get(num) ?? 0) + 1);
        }
        let num: number | null = null;
        for (const [k, v] of map.entries()) if (v > len / 2) num = k;
        return num ?? -1;
      }`,
    },
    {
      script: Script.TS,
      time: 76,
      memory: 42.1,
      desc: 'Boyer-Moore 投票算法',
      code: `function majorityElement(nums: number[]): number {
        let candidate = -1;
        let count = 0;
        nums.forEach(num => {
          if (count === 0) candidate = num;
          if (candidate === num) count++;
          else count--;
        });
        count = 0;
        nums.forEach(num => {
          if (candidate === num) count++;
        });
        return count > nums.length / 2 ? candidate : -1;
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
