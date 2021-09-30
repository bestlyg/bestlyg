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
  name: '223. 矩形面积',
  url: 'https://leetcode-cn.com/problems/rectangle-area/',
  difficulty: Difficulty.中等,
  tag: [Tag.几何, Tag.数学],
  desc: `给你 二维 平面上两个 由直线构成的 矩形，请你计算并返回两个矩形覆盖的总面积。`,
  solutions: [
    {
      script: Script.TS,
      time: 140,
      memory: 44.8,
      desc: '统计ab面积和覆盖面积',
      code: `function computeArea(
        ax1: number,
        ay1: number,
        ax2: number,
        ay2: number,
        bx1: number,
        by1: number,
        bx2: number,
        by2: number
      ): number {
        if (bx1 < ax1)
          [ax1, ay1, ax2, ay2, bx1, by1, bx2, by2] = [bx1, by1, bx2, by2, ax1, ay1, ax2, ay2];
        const comp = (x1: number, y1: number, x2: number, y2: number) => (x2 - x1) * (y2 - y1);
        const areaA = comp(ax1, ay1, ax2, ay2);
        const areaB = comp(bx1, by1, bx2, by2);
        if (bx1 > ax2 || by1 > ay2 || by2 < ay1) return areaA + areaB;
        const areaC = comp(
          Math.max(ax1, bx1),
          Math.max(ay1, by1),
          Math.min(ax2, bx2),
          Math.min(ay2, by2)
        );
        return areaA + areaB - areaC;
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
