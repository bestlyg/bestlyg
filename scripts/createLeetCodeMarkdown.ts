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
  name: '面试题 04.09. 二叉搜索树序列',
  url: 'https://leetcode-cn.com/problems/bst-sequences-lcci/',
  difficulty: Difficulty.困难,
  tag: [Tag.树, Tag.二叉搜索树, Tag.动态规划, Tag.二叉树],
  desc: '从左向右遍历一个数组，通过不断将其中的元素插入树中可以逐步地生成一棵二叉搜索树。给定一个由不同节点组成的二叉搜索树，输出所有可能生成此树的数组。',
  solutions: [
    {
      script: Script.TS,
      time: 120,
      memory: 46.1,
      desc: '递归生成左右子树，保证左右子树顺序不变',
      code: `function BSTSequences(root: TreeNode | null): number[][] {
        if (root === null) return [[]];
        if (root.left === null && root.right === null) return [[root.val]];
        if (root.left !== null && root.right === null) {
          const sub = BSTSequences(root.left);
          return sub.map(v => [root.val, ...v]);
        }
        if (root.right !== null && root.left === null) {
          const sub = BSTSequences(root.right);
          return sub.map(v => [root.val, ...v]);
        }
        const subl = BSTSequences(root.left);
        const subr = BSTSequences(root.right);
        const ans: number[][] = [];
        for (const l of subl) {
          for (const r of subr) {
            merge(l, 0, r, 0, [], root.val);
          }
        }
        return ans;
        function merge(
          l: number[],
          idxl: number,
          r: number[],
          idxr: number,
          list: number[],
          root: number
        ): void {
          if (l.length === idxl) {
            for (let i = idxr; i < r.length; i++) list.push(r[i]);
            list.unshift(root);
            ans.push(list);
            return;
          }
          if (r.length === idxr) {
            for (let i = idxl; i < l.length; i++) list.push(l[i]);
            list.unshift(root);
            ans.push(list);
            return;
          }
          merge(l, idxl + 1, r, idxr, [...list, l[idxl]], root);
          merge(l, idxl, r, idxr + 1, [...list, r[idxr]], root);
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
