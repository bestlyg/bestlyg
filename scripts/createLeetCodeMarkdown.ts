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
  name: '847. 访问所有节点的最短路径',
  url: 'https://leetcode-cn.com/problems/shortest-path-visiting-all-nodes/',
  difficulty: Difficulty.困难,
  tag: [Tag.位运算, Tag.广度优先搜索, Tag.图, Tag.动态规划, Tag.状态压缩],
  desc: '返回能够访问所有节点的最短路径的长度。',
  solutions: [
    {
      script: Script.TS,
      time: 120,
      memory: 45,
      desc: 'bfs,利用set做重复值过滤',
      code: `function shortestPathLength(graph: number[][]): number {
        const n = graph.length;
        const queue: [number, number, number][] = [];
        const seen = new Array(n).fill(0).map(_ => new Set<number>());
        for (let i = 0; i < n; i++) {
          queue.push([i, 1 << i, 0]);
          seen[i].add(1 << i);
        }
        let ans = Infinity;
        while (queue.length) {
          const data = queue.shift()!;
          const [idx, mask, step] = data;
          if (mask === (1 << n) - 1) {
            ans = step;
            break;
          }
          for (const next of graph[idx]) {
            const newMask = mask | (1 << next);
            if (seen[next].has(newMask)) continue;
            queue.push([next, newMask, step + 1]);
            seen[next].add(newMask);
          }
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
