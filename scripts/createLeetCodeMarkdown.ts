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
  name: '743. 网络延迟时间',
  url: 'https://leetcode-cn.com/problems/network-delay-time/',
  difficulty: Difficulty.中等,
  tag: [Tag.深度优先搜索, Tag.广度优先搜索, Tag.图, Tag.最短路, Tag.堆_优先队列],
  desc: '现在，从某个节点 K 发出一个信号。需要多久才能使所有节点都收到信号？如果不能使所有节点收到信号，返回 -1',
  solutions: [
    {
      script: Script.TS,
      time: 108,
      memory: 45.8,
      desc: '哈希储存，每次删减',
      code: `class NetNode {
        next: [NetNode, number][] = [];
        constructor(public val: number) {}
      }
      function getMap(times: number[][]): Map<number, NetNode> {
        const map = new Map<number, NetNode>();
        for (const [start, end, time] of times) {
          let startNode = map.get(start);
          if (!startNode) map.set(start, (startNode = new NetNode(start)));
          let endNode = map.get(end);
          if (!endNode) map.set(end, (endNode = new NetNode(end)));
          startNode.next.push([endNode, time]);
        }
        return map;
      }
      function networkDelayTime(times: number[][], n: number, k: number): number {
        const map = getMap(times);
        const init = map.get(k)!;
        const q: [NetNode, number][] = [[init, 0]];
        const set = new Set<NetNode>();
        let ans = -1;
        while (q.length) {
          const nextQ: [NetNode, number][] = [];
          let f = false;
          while (q.length) {
            const info = q.shift()!;
            if (set.has(info[0])) continue;
            f = true;
            if (info[1] === 0) {
              set.add(info[0]);
              for (const [next, time] of info[0].next) {
                if (time !== 0) set.has(next) || nextQ.push([next, time - 1]);
                else q.push([next, time]);
              }
            } else {
              info[1]--;
              nextQ.push(info);
            }
          }
          q.push(...nextQ);
          if (f) ans++;
        }
        return set.size === n ? ans : -1;
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
