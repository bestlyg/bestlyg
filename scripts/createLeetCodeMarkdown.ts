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
  name: '987. 二叉树的垂序遍历',
  url: 'https://leetcode-cn.com/problems/vertical-order-traversal-of-a-binary-tree/',
  difficulty: Difficulty.困难,
  tag: [Tag.树, Tag.深度优先搜索, Tag.广度优先搜索, Tag.哈希表, Tag.二叉树],
  desc: '给你二叉树的根结点 root ，请你设计算法计算二叉树的 垂序遍历 序列。',
  solutions: [
    {
      script: Script.TS,
      time: 92,
      memory: 40,
      desc: '哈希储存',
      code: `function verticalTraversal(root: TreeNode | null): number[][] {
        if (root === null) return [];
        const map = new Map<number, number[][]>();
        order(root, 0, 0);
        const list = [...map.entries()]
          .sort(([col1], [col2]) => col1 - col2)
          .map(([, list]) =>
            list
              .sort(([, row1, val1], [, row2, val2]) => (row1 === row2 ? val1 - val2 : row1 - row2))
              .map(([, , v]) => v)
          );
        return list;
        function order(node: TreeNode | null, row: number, col: number) {
          if (node === null) return null;
          let list = map.get(col);
          if (!list) map.set(col, (list = []));
          list.push([col, row, node.val]);
          order(node.left, row + 1, col - 1);
          order(node.right, row + 1, col + 1);
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
