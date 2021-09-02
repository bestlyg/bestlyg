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
  name: '剑指 Offer 22. 链表中倒数第k个节点',
  url: 'https://leetcode-cn.com/problems/lian-biao-zhong-dao-shu-di-kge-jie-dian-lcof/',
  difficulty: Difficulty.简单,
  tag: [Tag.链表, Tag.双指针],
  desc: '输入一个链表，输出该链表中倒数第k个节点。为了符合大多数人的习惯，本题从1开始计数，即链表的尾节点是倒数第1个节点。',
  solutions: [
    {
      script: Script.TS,
      time: 72,
      memory: 39.5,
      desc: '计算总长度相减后dfs',
      code: `function getKthFromEnd(head: ListNode | null, k: number): ListNode | null {
        let count = 0;
        let p = head;
        while (p !== null) {
          count++;
          p = p.next;
        }
        return dfs(head, count - k);
        function dfs(node: ListNode | null, count: number): ListNode | null {
          if (node === null) return null;
          if (count === 0) return node;
          return dfs(node.next, count - 1);
        }
      }`,
    },
    {
      script: Script.TS,
      time: 80,
      memory: 39.4,
      desc: '双指针',
      code: `function getKthFromEnd(head: ListNode | null, k: number): ListNode | null {
        let slow = head;
        let fast = head;
        while (fast && k) {
          fast = fast.next;
          k--;
        }
        while (fast) {
          fast = fast.next;
          slow = slow!.next;
        }
        return slow;
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
