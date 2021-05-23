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
  name: '1707. 与数组中元素的最大异或值',
  url: 'https://leetcode-cn.com/problems/maximum-xor-with-an-element-from-array/',
  difficulty: Difficulty.困难,
  tag: [Tag.位运算, Tag.字典树],
  desc:
    '返回一个整数数组 answer 作为查询的答案，其中 answer.length == queries.length 且 answer[i] 是第 i 个查询的答案。',
  solutions: [
    {
      script: Script.TS,
      time: 3000,
      memory: 122.9,
      desc: '构建字典树，排序后计算最大可能异或值',
      code: `class Trie {
        left: Trie | null = null;
        right: Trie | null = null;
        val: number | null = null;
      }
      function maximizeXor(nums: number[], queries: number[][]): number[] {
        const root = new Trie();
        const add = (num: number) => {
          let node = root;
          for (let i = 31; i >= 0; i--) {
            const val = (num >> i) & 1;
            if (val === 1) node = node.right ?? (node.right = new Trie());
            else node = node.left ?? (node.left = new Trie());
            node.val = num;
          }
        };
        const select = (num: number): number => {
          let node = root;
          for (let i = 31; i >= 0; i--) {
            const val = (num >> i) & 1;
            if (val === 1) node = node.left ?? node.right!;
            else node = node.right ?? node.left!;
          }
          return node.val!;
        };
        nums.sort((a, b) => a - b);
        const queryMap = new Map<number[], number>();
        queries.forEach((v, i) => queryMap.set(v, i));
        queries.sort(([, a], [, b]) => a - b);
        const ans: number[] = [];
        for (const query of queries) {
          const [x, m] = query;
          while (nums.length > 0 && nums[0] <= m) add(nums.shift()!);
          const index = queryMap.get(query)!;
          ans[index] = root.left === null && root.right === null ? -1 : x ^ select(x);
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
