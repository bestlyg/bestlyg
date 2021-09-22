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
  name: '725. 分隔链表',
  url: 'https://leetcode-cn.com/problems/split-linked-list-in-parts/',
  difficulty: Difficulty.中等,
  tag: [Tag.链表],
  desc: `给你一个头结点为 head 的单链表和一个整数 k ，请你设计一个算法将链表分隔为 k 个连续的部分。`,
  solutions: [
    {
      script: Script.JS,
      time: 88,
      memory: 40.6,
      desc: '储存到队列中进行筛选',
      code: `function splitListToParts(head: ListNode | null, k: number): Array<ListNode | null> {
        const list: ListNode[] = [];
        let p: ListNode | null = head;
        while (p) {
          const next = p.next;
          list.push(p);
          p.next = null;
          p = next;
        }
        const len = list.length;
        const ans: Array<ListNode | null> = new Array(k).fill(null);
        if (len <= k) {
          for (let i = 0; i < len; i++) ans[i] = list[i];
          return ans;
        }
        const cnt = ~~(len / k);
        const last = (len % k) - 1;
        let nodeIdx = 0;
        for (let i = 0; i < k; i++) {
          const node = (ans[i] = list[nodeIdx]);
          const lastIdx = nodeIdx + cnt + (i <= last ? 1 : 0);
          let p = node;
          while (++nodeIdx < lastIdx) p = p.next = list[nodeIdx];
        }
        return ans;
      }`,
    },
    {
      script: Script.JS,
      time: 76,
      memory: 40.2,
      desc: '循环两次',
      code: `function splitListToParts(head: ListNode | null, k: number): Array<ListNode | null> {
        let len = 0;
        let p = head;
        for (; p; p = p.next) len++;
        const cnt = ~~(len / k);
        const last = (len % k) - 1;
        const ans: Array<ListNode | null> = [];
        p = head;
        let max = cnt + (ans.length <= last ? 1 : 0);
        let idx = 0;
        while (p) {
          if (idx === 0) ans.push(p);
          if (idx === max - 1) {
            max = cnt + (ans.length <= last ? 1 : 0);
            const next = p.next;
            p.next = null;
            p = next;
            idx = 0;
          } else {
            p = p.next;
            idx++;
          }
        }
        while (ans.length < k) ans.push(null);
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
