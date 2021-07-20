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
  existMarkdown: !true,
  name: '剑指 Offer 59 - II. 队列的最大值',
  url: 'https://leetcode-cn.com/problems/dui-lie-de-zui-da-zhi-lcof/',
  difficulty: Difficulty.中等,
  tag: [Tag.设计, Tag.队列, Tag.单调队列],
  desc: '请定义一个队列并实现函数 max_value 得到队列里的最大值',
  solutions: [
    {
      script: Script.TS,
      time: 200,
      memory: 48.3,
      desc: '单调递减队列',
      code: `class MaxQueue {
        private queue: number[] = [];
        private monoQueue: number[] = [];
        max_value(): number {
          if (this.queue.length === 0) return -1;
          return this.queue[this.monoQueue[0]];
        }
        push_back(value: number): void {
          this.queue.push(value);
          while (this.monoQueue.length && this.queue[this.monoQueue[this.monoQueue.length - 1]] < value)
            this.monoQueue.pop();
          this.monoQueue.push(this.queue.length - 1);
        }
        pop_front(): number {
          if (this.queue.length === 0) return -1;
          const v = this.queue.shift()!;
          for (let i = 0, n = this.monoQueue.length; i < n; i++) this.monoQueue[i]--;
          if (this.monoQueue[0] === -1) this.monoQueue.shift();
          return v;
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
