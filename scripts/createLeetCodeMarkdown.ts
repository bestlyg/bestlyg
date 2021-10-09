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
  name: '352. 将数据流变为多个不相交区间',
  url: 'https://leetcode-cn.com/problems/data-stream-as-disjoint-intervals/',
  difficulty: Difficulty.困难,
  tag: [Tag.设计, Tag.二分查找, Tag.有序集合],
  desc: ` 给你一个由非负整数 a1, a2, ..., an 组成的数据流输入，请你将到目前为止看到的数字总结为不相交的区间列表。`,
  solutions: [
    {
      script: Script.TS,
      time: 180,
      memory: 48.5,
      desc: '二分插入',
      code: `class SummaryRanges {
        private set = new Set<number>();
        private list: number[] = [];
        addNum(val: number): void {
          if (this.set.has(val)) return;
          this.set.add(val);
          let l = 0;
          let r = this.list.length - 1;
          if (this.list[r] < val) {
            this.list.push(val);
            return;
          }
          while (l < r) {
            const mid = (l + r) >> 1;
            if (this.list[mid] > val) r = mid;
            else l = mid + 1;
          }
          this.list.splice(l, 0, val);
        }
        getIntervals(): number[][] {
          const ans: number[][] = [];
          for (let i = 0, l = this.list.length; i < l; i++) {
            const num = this.list[i];
            const last = ans[ans.length - 1];
            if (ans.length === 0 || last[1] + 1 < num) {
              ans.push([num, num]);
            } else {
              last[1] = num;
            }
          }
          return ans;
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
