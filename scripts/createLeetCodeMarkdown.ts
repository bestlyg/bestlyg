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
  name: '993. 二叉树的堂兄弟节点',
  url: 'https://leetcode-cn.com/problems/cousins-in-binary-tree/',
  difficulty: Difficulty.简单,
  tag: [Tag.树, Tag.深度优先搜索],
  desc: '如果二叉树的两个节点深度相同，但 父节点不同 ，则它们是一对堂兄弟节点。',
  solutions: [
    {
      script: Script.TS,
      time: 116,
      memory: 39.3,
      desc: '生成节点的继承链进行比较',
      code: `function isCousins(root: TreeNode | null, x: number, y: number): boolean {
        if (root === null) return false;
        const findGrandParent = (
          val: number,
          queue: TreeNode[],
          node: TreeNode | null = root
        ): boolean => {
          if (node === null) return false;
          queue.unshift(node);
          if (node.val === val) return true;
          if (findGrandParent(val, queue, node.left)) return true;
          if (findGrandParent(val, queue, node.right)) return true;
          queue.shift();
          return false;
        };
        const queueX: TreeNode[] = [];
        findGrandParent(x, queueX);
        const queueY: TreeNode[] = [];
        findGrandParent(y, queueY);
        if (queueX.length < 3 || queueY.length < 3) return false;
        return queueX[1] !== queueY[1] && queueX.length === queueY.length;
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
