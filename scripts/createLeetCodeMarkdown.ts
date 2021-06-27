import { leetcode, trimBlank, resolve, fs, moment, specStr, LOGO, markdown } from './utils';

const { backquote } = specStr;
const { link } = markdown;
const { Script, Difficulty, Tag, srcPath, solutionReg, getDirOrder, getFileOrder, getDirName } =
  leetcode;
type Script = leetcode.Script;
type Difficulty = leetcode.Difficulty;
type Tag = leetcode.Tag;

interface Solution {
  script: Script;
  time: number;
  memory: number;
  desc: string;
  code: string;
}
interface Markdown {
  existMarkdown: boolean;
  name: string;
  url: string;
  desc: string;
  difficulty: Difficulty;
  tag: Tag[];
  solutions: Solution[];
}
const md: Markdown = {
  existMarkdown: false,
  name: '909. 蛇梯棋',
  url: 'https://leetcode-cn.com/problems/snakes-and-ladders/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: 'N x N 的棋盘 board 上，按从 1 到 N*N 的数字给方格编号，编号 从左下角开始，每一行交替方向。返回达到方格 N*N 所需的最少移动次数，如果不可能，则返回 -1。',
  solutions: [
    {
      script: Script.TS,
      time: 116,
      memory: 45.5,
      desc: '广度优先搜索，储存后进行遍历',
      code: `function snakesAndLadders(board: number[][]): number {
        const N = board.length;
        const toBlock = (row: number, col: number) => {
          if ((N & 1) === 0) {
            return N * (N - 1 - row) + ((row & 1) === 0 ? N - col : col + 1);
          } else {
            return N * (N - 1 - row) + ((row & 1) === 0 ? col + 1 : N - col);
          }
        };
        const toBoard = (block: number): [number, number] => {
          const row = N - 1 - ~~((block - 1) / N);
          let col!: number;
          if ((N & 1) === 0) {
            col = (row & 1) === 0 ? N - 1 - ((block - 1) % N) : (block - 1) % N;
          } else {
            col = (row & 1) === 0 ? (block - 1) % N : N - 1 - ((block - 1) % N);
          }
          return [row, col];
        };
        const ANS_NUM = N ** 2;
        const map = new Map<number, number>([[1, 0]]);
        let ans = Infinity;
        const queue: [number, number][] = [[N - 1, 0]];
        while (queue.length !== 0) {
          const [row, col] = queue.shift()!;
          const block = toBlock(row, col);
          const step = map.get(block)!;
          if (ANS_NUM - block <= 6) {
            ans = Math.min(ans, step + 1);
            continue;
          }
          for (let i = 1; i <= 6; i++) {
            let nextBlock = block + i;
            let nextBoard = toBoard(nextBlock);
            const [nextRow, nextCol] = nextBoard;
            if (board[nextRow][nextCol] !== -1) {
              nextBlock = board[nextRow][nextCol];
              nextBoard = toBoard(nextBlock);
            }
            if (nextBlock === ANS_NUM) {
              ans = Math.min(ans, step + 1);
              continue;
            }
            if (!map.has(nextBlock)) queue.push(nextBoard);
            map.set(nextBlock, Math.min(map.get(nextBlock) ?? Infinity, step + 1));
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
