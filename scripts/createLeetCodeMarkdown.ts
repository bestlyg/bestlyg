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
  name: '897. 递增顺序搜索树',
  url: 'https://leetcode-cn.com/problems/increasing-order-search-tree/',
  difficulty: Difficulty.简单,
  tag: [Tag.树, Tag.深度优先搜索, Tag.递归],
  desc:
    '给你一棵二叉搜索树，请你 按中序遍历 将其重新排列为一棵递增顺序搜索树，使树中最左边的节点成为树的根节点，并且每个节点没有左子节点，只有一个右子节点。',
  solutions: [
    {
      script: Script.TS,
      time: 88,
      memory: 39.7,
      desc: '递归遍历每个点',
      code: `function increasingBST(root: TreeNode | null): TreeNode | null {
        function increasing(node: TreeNode): [TreeNode, TreeNode] {
          if (!root.left && !root.right) return [root, root];
          let first = node;
          let last = node;
          if (node.left !== null) {
            const data = increasing(node.left);
            first = data[0];
            data[1].right = node;
            node.left = null;
          }
          if (node.right !== null) {
            const data = increasing(node.right);
            last.right = data[0];
            last = data[1];
          }
          return [first, last];
        }
        return increasing(root)[0];
      }
      `,
    },
    {
      script: Script.TS,
      time: 132,
      memory: 40.2,
      desc: '先中序遍历后逐个赋值',
      code: `function increasingBST(root: TreeNode | null): TreeNode | null {
        if (root === null) return null;
        const queue: TreeNode[] = [];
        inorder(root);
        for (let i = 0, l = queue.length - 1; i < l; i++) {
          const node = queue[i];
          node.left = null;
          node.right = queue[i+1];
        }
        const last = queue[queue.length - 1];
        last.right = last.left = null;
        return queue[0];
        function inorder(node: TreeNode | null): void {
          if (node === null) return;
          inorder(node.left);
          queue.push(node);
          inorder(node.right);
        }
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
