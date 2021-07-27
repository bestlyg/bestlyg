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
  name: '671. 二叉树中第二小的节点',
  url: 'https://leetcode-cn.com/problems/second-minimum-node-in-a-binary-tree/',
  difficulty: Difficulty.简单,
  tag: [Tag.树, Tag.深度优先搜索, Tag.二叉树],
  desc: '给定一个非空特殊的二叉树，每个节点都是正数，并且每个节点的子节点数量只能为 2 或 0。如果一个节点有两个子节点的话，那么该节点的值等于两个子节点中较小的一个。',
  solutions: [
    {
      script: Script.TS,
      time: 64,
      memory: 39.4,
      desc: '遍历所有节点进行排序',
      code: `function findSecondMinimumValue(root: TreeNode | null): number {
        const set = new Set<number>();
        order(root);
        const list = [...set].sort((a, b) => a - b);
        return list[1] ?? -1;
        function order(node: TreeNode | null): void {
          if (node === null) return;
          set.add(node.val);
          order(node.left);
          order(node.right);
        }
      }
      `,
    },
    {
      script: Script.TS,
      time: 72,
      memory: 39.4,
      desc: '求左右子树的最小值',
      code: `function findSecondMinimumValue(root: TreeNode | null): number {
        return find();
        function find(node: TreeNode | null = root, val = root!.val): number {
          if (node === null) return -1;
          if (node.val > val) return node.val;
          const l = find(node.left, val);
          const r = find(node.right, val);
          return l > val && r > val ? Math.min(l, r) : Math.max(l, r);
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
