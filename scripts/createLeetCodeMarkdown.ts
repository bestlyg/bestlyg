import { leetcode, trimBlank, resolve, fs, moment, specStr, LOGO, markdown } from './utils';

const { backquote } = specStr;
const { link } = markdown;
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
  existMarkdown: true,
  name: '239. 滑动窗口最大值',
  url: 'https://leetcode-cn.com/problems/implement-rand10-using-rand7/',
  difficulty: Difficulty.中等,
  tag: [Tag.随机, Tag.拒绝采样],
  desc:
    '已有方法 rand7 可生成 1 到 7 范围内的均匀随机整数，试写一个方法 rand10 生成 1 到 10 范围内的均匀随机整数。',
  solutions: [
    {
      script: Script.TS,
      time: 5224,
      memory: 69.8,
      desc: '二分维护数组',
      code: `function maxSlidingWindow(nums: number[], k: number): number[] {
        const win = nums.slice(0, k).sort((a, b) => a - b);
        const findIndex = (num: number, l = 0, r = k - 1) => {
          if (l  >r) return l;
          const mid = (l + r) >> 1;
          const midNum = win[mid];
          if (midNum < num) return findIndex(num, mid + 1, r);
          else if (midNum > num) return findIndex(num, l, mid - 1);
          else return mid;
        };
        const add = (num: number) => win.splice(findIndex(num), 0, num);
        const del = (num: number) => win.splice(findIndex(num), 1);
        const ans = [win[k - 1]];
        for (let i = k, l = nums.length; i < l; i++) {
          add(nums[i]);
          del(nums[i - k]);
          ans.push(win[k - 1]);
        }
        return ans;
      }`,
    },
    {
      script: Script.TS,
      time: 944,
      memory: 73.8,
      desc: '利用列表维护最大值',
      code: `function maxSlidingWindow(nums: number[], k: number): number[] {
        const list: number[] = [];
        if (k === 0) return list;
        const ans: number[] = [];
        const len = nums.length;
        let index = 0;
        while (index < len) {
          while (list.length !== 0 && list[0] + k <= index) list.shift();
          const num = nums[index];
          while (list.length !== 0 && nums[list[list.length - 1]] < num) list.pop();
          list.push(index++);
          index >= k && ans.push(nums[list[0]]);
        }
        return ans;
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
