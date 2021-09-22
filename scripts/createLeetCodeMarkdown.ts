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
  name: '234. 回文链表',
  url: 'https://leetcode-cn.com/problems/split-linked-list-in-parts/',
  difficulty: Difficulty.中等,
  tag: [Tag.链表],
  desc: `给你一个头结点为 head 的单链表和一个整数 k ，请你设计一个算法将链表分隔为 k 个连续的部分。`,
  solutions: [
    {
      script: Script.JS,
      time: 228,
      memory: 69.9,
      desc: '反转后半部分',
      code: `function isPalindrome(head: ListNode): boolean {
        let slow = head;
        let fast = head.next;
        if (!fast) return true;
        while (fast && fast.next) {
          slow = slow.next!;
          fast = fast.next.next;
        }
        fast = reverse(slow.next!)[0];
        slow = head;
        while (fast) {
          if (slow.val !== fast.val) return false;
          slow = slow.next!;
          fast = fast.next!;
        }
        return true;
        function reverse(node: ListNode): [ListNode, ListNode] {
          if (node.next === null) return [node, node];
          const [first, last] = reverse(node.next);
          last.next = node;
          node.next = null;
          return [first, node];
        }
      }`,
    },
    {
      script: Script.JS,
      time: 152,
      memory: 60.7,
      desc: '反转后半部分，遍历反转',
      code: `function isPalindrome(head: ListNode): boolean {
        let slow = head;
        let fast = head.next;
        if (!fast) return true;
        while (fast && fast.next) {
          slow = slow.next!;
          fast = fast.next.next;
        }
        fast = reverse(slow.next!);
        slow = head;
        while (fast) {
          if (slow.val !== fast.val) return false;
          slow = slow.next!;
          fast = fast.next!;
        }
        return true;
        function reverse(node: ListNode): ListNode {
          const head = new ListNode();
          let p: ListNode | null = node;
          while (p) {
            const oldNext = head.next;
            const next = p.next;
            head.next = p;
            p.next = oldNext;
            p = next;
          }
          return head.next!;
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
  console.log(chalk.blue(`正在生成LeetCode题解`));
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
