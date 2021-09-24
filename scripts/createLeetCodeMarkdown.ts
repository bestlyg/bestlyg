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
  existMarkdown: true,
  name: '430. 扁平化多级双向链表',
  url: 'https://leetcode-cn.com/problems/power-of-three/',
  difficulty: Difficulty.简单,
  tag: [Tag.递归, Tag.数学],
  desc: `给定一个整数，写一个函数来判断它是否是 3 的幂次方。如果是，返回 true ；否则，返回 false 。`,
  solutions: [
    {
      script: Script.JS,
      time: 64,
      memory: 39.7,
      desc: '递归格式化',
      code: `function flatten(head: Node | null): Node | null {
        if (head === null) return null;
        return format(head)[0];
        function format(node: Node): [Node, Node] {
          if (node.child === null && node.next === null) return [node, node];
          node.prev = null;
          let prev: Node = node;
          let p: Node | null = node;
          while (p) {
            const next = p.next;
            if (p.child) {
              const [first, last] = format(p.child);
              p.next = first;
              first.prev = p;
              last.next = next;
              if (next) next.prev = last;
              prev = last;
            } else {
              prev = p;
            }
            p.child = null;
            p = next;
          }
          return [node, prev];
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
  console.log(chalk.blue(`正在生成LeetCode题解`));
  console.log(LOGO);
  md.existMarkdown ? addSolution() : addMarkdown();
  console.log(chalk.green(`生成完成`));
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
