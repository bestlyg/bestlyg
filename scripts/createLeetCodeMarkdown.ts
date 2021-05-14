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
  name: '12. 整数转罗马数字',
  url: 'https://leetcode-cn.com/problems/deepest-leaves-sum/',
  difficulty: Difficulty.中等,
  tag: [Tag.树, Tag.深度优先搜索],
  desc: '给你一棵二叉树的根节点 root ，请你返回 层数最深的叶子节点的和 。',
  solutions: [
    {
      script: Script.TS,
      time: 212,
      memory: 44.3,
      desc: '分节处理',
      code: `const config: Map<number, Map<number, string>> = new Map([
        [
          100,
          new Map([
            [1, 'C'],
            [5, 'D'],
            [10, 'M'],
          ]),
        ],
        [
          10,
          new Map([
            [1, 'X'],
            [5, 'L'],
            [10, 'C'],
          ]),
        ],
        [
          1,
          new Map([
            [1, 'I'],
            [5, 'V'],
            [10, 'X'],
          ]),
        ],
      ]);
      function intToRoman(num: number): string {
        let ans = '';
        if (num >= 1000) {
          ans += 'M'.repeat(~~(num / 1000));
          num = num % 1000;
        }
        for (const [val, map] of config) {
          if (num < val) continue;
          const c1 = map.get(1)!;
          const c5 = map.get(5)!;
          const c10 = map.get(10)!;
          const c = ~~(num / val);
          num = num % val;
          if (c === 9) ans += c1 + c10;
          else if (c >= 5) ans += c5 + c1.repeat(c - 5);
          else if (c === 4) ans += c1 + c5;
          else ans += c1.repeat(c);
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
