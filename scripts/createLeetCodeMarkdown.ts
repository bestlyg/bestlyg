import { leetcode, trimBlank, resolve, fs, moment, specStr, LOGO, markdown } from './utils';

const { backquote } = specStr;
const { link } = markdown;
const {
  Script,
  Difficulty,
  Tag,
  srcPath,
  solutionReg,
  getDirOrder,
  getFileOrder,
  getDirName,
} = leetcode;
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
  name: '773. 滑动谜题',
  url: 'https://leetcode-cn.com/problems/sliding-puzzle/',
  difficulty: Difficulty.困难,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc:
    '给出一个谜板的初始状态，返回最少可以通过多少次移动解开谜板，如果不能解开谜板，则返回 -1 。',
  solutions: [
    {
      script: Script.TS,
      time: 192,
      memory: 50.8,
      desc: '广度悠闲搜索，计算每次移动后的最小步数',
      code: `function slidingPuzzle(board: number[][]): number {
        const ANS_STR = '123,450';
        const stringify = (board: (number | string)[][]) => board.map(v => v.join('')).join(',');
        if (stringify(board) === ANS_STR) return 0;
        const parse = (boardStr: string) => boardStr.split(',').map(v => v.split(''));
        const getZeroIndex = (index: number): [number, number] =>
          index <= 2 ? [0, index] : [1, index - 4];
        const queue: string[] = [stringify(board)];
        const map = new Map<string, number>([[queue[0], 0]]);
        let ans = Infinity;
        const updateMap = (newStr: string, step: number) => {
          if (newStr === ANS_STR) ans = Math.min(ans, step + 1);
          else {
            map.has(newStr) || queue.push(newStr);
            map.set(newStr, Math.min(map.get(newStr) ?? Infinity, step + 1));
          }
        };
        const swap = (board: string[][], row1: number, col1: number, row2: number, col2: number) => {
          [board[row1][col1], board[row2][col2]] = [board[row2][col2], board[row1][col1]];
        };
        while (queue.length !== 0) {
          const boardStr = queue.shift()!;
          const step = map.get(boardStr)!;
          const [row, col] = getZeroIndex(boardStr.indexOf('0'));
          const board = parse(boardStr);
          if (row === 0) {
            swap(board, row, col, row + 1, col);
            updateMap(stringify(board), step);
            swap(board, row, col, row + 1, col);
          }
          if (row === 1) {
            swap(board, row, col, row - 1, col);
            updateMap(stringify(board), step);
            swap(board, row, col, row - 1, col);
          }
          if (col > 0) {
            swap(board, row, col, row, col - 1);
            updateMap(stringify(board), step);
            swap(board, row, col, row, col - 1);
          }
          if (col < 2) {
            swap(board, row, col, row, col + 1);
            updateMap(stringify(board), step);
            swap(board, row, col, row, col + 1);
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
