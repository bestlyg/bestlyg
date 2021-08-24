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
  name: '787. K 站中转内最便宜的航班',
  url: 'https://leetcode-cn.com/problems/cheapest-flights-within-k-stops/',
  difficulty: Difficulty.中等,
  tag: [Tag.深度优先搜索, Tag.广度优先搜索, Tag.图, Tag.动态规划, Tag.最短路, Tag.堆_优先队列],
  desc: '现在给定所有的城市和航班，以及出发城市 src 和目的地 dst，你的任务是找到出一条最多经过 k 站中转的路线，使得从 src 到 dst 的 价格最便宜 ，并返回该价格。 如果不存在这样的路线，则输出 -1。',
  solutions: [
    {
      script: Script.TS,
      time: 128,
      memory: 44.6,
      desc: '动态规划，计算每天每个航班的最小值',
      code: `function findCheapestPrice(
        n: number,
        flights: number[][],
        src: number,
        dst: number,
        k: number
      ): number {
        const map = new Map<number, number[]>();
        for (let i = 0; i < flights.length; i++) {
          const [from] = flights[i];
          let list = map.get(from);
          if (!list) map.set(from, (list = []));
          list.push(i);
        }
        const dp = new Array(k + 2).fill(0).map(_ => new Array(n).fill(Infinity));
        dp[0][src] = 0;
        let ans = Infinity;
        for (let i = 1; i <= k + 1; i++) {
          for (let j = 0; j < n; j++) {
            if (dp[i - 1][j] === Infinity) continue;
            const list = map.get(j);
            if (!list) continue;
            for (const flightIdx of list) {
              const [, to, price] = flights[flightIdx];
              dp[i][to] = Math.min(dp[i][to], dp[i - 1][j] + price);
              if (to === dst) ans = Math.min(dp[i][to], ans);
            }
          }
        }
        return ans === Infinity ? -1 : ans;
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
