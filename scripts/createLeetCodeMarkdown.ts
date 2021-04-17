import { leetcode, trimBlank, resolve, fs, moment, specStr, LOGO } from './utils';

const { backquote } = specStr;
const {
  Script,
  Difficulty,
  Tag,
  srcPath,
  solutionReg,
  getDirOrder,
  getFileOrder,
  getDirName,
} = leetcode;
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
  name: '220. 存在重复元素 III',
  url: 'https://leetcode-cn.com/problems/contains-duplicate-iii/',
  difficulty: Difficulty.中等,
  tag: [Tag.排序, Tag.OrderedMap],
  desc:
    '给你一个整数数组 nums 和两个整数 k 和 t 。请你判断是否存在 两个不同下标 i 和 j，使得 abs(nums[i] - nums[j]) <= t ，同时又满足 abs(i - j) <= k 。如果存在则返回 true，不存在返回 false。',
  solutions: [
    {
      script: Script.TS,
      time: 176,
      memory: 56.9,
      desc: '利用map储存后排序计算',
      code: `function containsNearbyAlmostDuplicate(nums: number[], k: number, t: number): boolean {
        if (k === 0) return false;
        const map = new Map<number, number[]>();
        for (let i = 0, len = nums.length; i < len; i++) {
          const num = nums[i];
          let arr = map.get(num);
          if (!arr) map.set(num, (arr = []));
          arr.push(i);
        }
        const data = [...map.entries()].sort(([num1], [num2]) => num1 - num2);
        const check = (arr1: number[], arr2: number[]) =>
          (arr1[arr1.length] < arr2[0] && Math.abs(arr1[arr1.length] - arr2[0]) <= k) ||
          (arr2[arr2.length] < arr1[0] && Math.abs(arr2[arr2.length] - arr1[0]) <= k) ||
          arr1.some(i1 => arr2.some(i2 => Math.abs(i1 - i2) <= k));
        for (let i = 0, l = data.length; i < l; i++) {
          const arr1 = data[i][1];
          if (arr1.some((v, i, arr) => (i === 0 ? false : v - arr[i - 1] <= k))) return true;
          let index = i - 1;
          while (index >= 0 && data[i][0] - data[index][0] <= t)
            if (check(arr1, data[index--][1])) return true;
        }
        return false;
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
  order: 3
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
