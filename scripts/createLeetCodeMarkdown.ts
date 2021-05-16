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
  existMarkdown: false,
  name: '421. 数组中两个数的最大异或值',
  url: 'https://leetcode-cn.com/problems/maximum-xor-of-two-numbers-in-an-array/',
  difficulty: Difficulty.中等,
  tag: [Tag.位运算, Tag.字典树],
  desc: '给你一个整数数组 nums ，返回 nums[i] XOR nums[j] 的最大运算结果，其中 0 ≤ i ≤ j < n 。',
  solutions: [
    {
      script: Script.TS,
      time: 6480,
      memory: 40.4,
      desc: 'O(n2)循环',
      code: `function findMaximumXOR(nums: number[]): number {
        let ans = -Infinity
        nums.forEach(v1=>nums.forEach(v2=>ans = Math.max(ans,v1^v2)))
        return ans 
   };`,
    },
    {
      script: Script.TS,
      time: 156,
      memory: 49.2,
      desc: '利用trie储存二进制，每次寻找尽可能大的数',
      code: `class Trie {
        /** 左 0  */
        left: Trie | null = null;
        /** 右 1  */
        right: Trie | null = null;
      }
      function findMaximumXOR(nums: number[]): number {
        const len = nums.length;
        if (len === 1) return 0;
        const root = new Trie();
        let ans = -Infinity;
        const add = (num: number) => {
          let trie = root;
          for (let i = 30; i >= 0; i--) {
            const v = (num >> i) & 1;
            if (v === 1) {
              trie = trie.right ?? (trie.right = new Trie());
            } else {
              trie = trie.left ?? (trie.left = new Trie());
            }
          }
        };
        const check = (num: number): number => {
          let trie = root;
          let xorNum = 0;
          for (let i = 30; i >= 0; i--) {
            const v = (num >> i) & 1;
            if (v === 1) {
              if (trie.left) {
                trie = trie.left;
                xorNum = (xorNum << 1) + 1;
              } else {
                trie = trie.right!;
                xorNum <<= 1;
              }
            } else {
              if (trie.right) {
                trie = trie.right;
                xorNum = (xorNum << 1) + 1;
              } else {
                trie = trie.left!;
                xorNum <<= 1;
              }
            }
          }
          return xorNum;
        };
        for (let i = 1; i < len; i++) {
          add(nums[i - 1]);
          ans = Math.max(ans, check(nums[i]));
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
