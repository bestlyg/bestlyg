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
  name: '797. 所有可能的路径',
  url: 'https://leetcode-cn.com/problems/all-paths-from-source-to-target/',
  difficulty: Difficulty.中等,
  tag: [Tag.深度优先搜索, Tag.广度优先搜索, Tag.图, Tag.回溯],
  desc: '给你一个有 n 个节点的 有向无环图（DAG），请你找出所有从节点 0 到节点 n-1 的路径并输出',
  solutions: [
    {
      script: Script.TS,
      time: 136,
      memory: 45.4,
      desc: 'dfs',
      code: `class GNode {
        prev: GNode[] = [];
        next: GNode[] = [];
        constructor(public val: number) {}
      }
      function allPathsSourceTarget(graph: number[][]): number[][] {
        const n = graph.length;
        const list: GNode[] = new Array(n);
        for (let i = 0; i < n; i++) {
          let node = list[i];
          if (!node) list[i] = node = new GNode(i);
          const nextList = graph[i];
          for (const next of nextList) {
            let nextNode = list[next];
            if (!nextNode) list[next] = nextNode = new GNode(next);
            node.next.push(nextNode);
            nextNode.prev.push(node);
          }
        }
        const ans: number[][] = [];
        dfs(list[0]);
        return ans;
        function dfs(node: GNode, list: GNode[] = []) {
          list.push(node);
          if (node.val === n - 1) ans.push(list.map(v => v.val));
          if (node.next.length !== 0) node.next.forEach(v => dfs(v, list));
          list.pop();
        }
      }
      `,
    },
    {
      script: Script.TS,
      time: 160,
      memory: 49,
      desc: 'dfs',
      code: `function allPathsSourceTarget(graph: number[][]): number[][] {
        const n = graph.length;
        const ans: number[][] = [];
        dfs(0);
        return ans;
        function dfs(node: number, list: number[] = []) {
          list.push(node);
          if (node === n - 1) ans.push(list.slice());
          graph[node].forEach(v => dfs(v, list));
          list.pop();
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
