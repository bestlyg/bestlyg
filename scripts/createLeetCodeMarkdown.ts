import { leetcode, trimBlank, resolve, fs, moment, specStr, LOGO, markdown } from './utils';

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
  name: '138. 复制带随机指针的链表',
  url: 'https://leetcode-cn.com/problems/minimum-limit-of-balls-in-a-bag/',
  difficulty: Difficulty.中等,
  tag: [Tag.数组, Tag.二分查找],
  desc: '给你一个整数数组 nums ，你的开销是单个袋子里球数目的 最大值 ，你想要 最小化 开销。',
  solutions: [
    {
      script: Script.TS,
      time: 104,
      memory: 39.7,
      desc: '节点复制',
      code: `function copyRandomList(head: Node | null): Node | null {
        if (head === null) return null;
        let p: Node | null = head;
        while (p) {
          const next = p.next;
          const newNode = new Node(p.val, next);
          p.next = newNode;
          p = next;
        }
        p = head;
        while (p) {
          const newNode = p.next;
          newNode!.random = p.random?.next ?? null;
          p = p.next!.next;
        }
        p = head;
        const ans = head.next;
        while (p) {
          const next = p.next?.next ?? null;
          const newNode = p.next!;
          newNode.next = next?.next ?? null;
          p.next = next;
          p = next;
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
