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
  name: '36. 有效的数独',
  url: 'https://leetcode-cn.com/problems/valid-sudoku/',
  difficulty: Difficulty.中等,
  tag: [Tag.数组, Tag.哈希表, Tag.矩阵],
  desc: '请你判断一个 9x9 的数独是否有效。只需要 根据以下规则 ，验证已经填入的数字是否有效即可。  ',
  solutions: [
    {
      script: Script.JS,
      time: 96,
      memory: 43.8,
      desc: '逐行遍历，set储存',
      code: `function isValidSudoku(board: string[][]): boolean {
        const rows: Set<string>[] = new Array(9).fill(0).map(_ => new Set<string>());
        const cols: Set<string>[] = new Array(9).fill(0).map(_ => new Set<string>());
        const blocks: Set<string>[] = new Array(9).fill(0).map(_ => new Set<string>());
        const getBolck = (row: number, col: number) => ~~(row / 3) * 3 + ~~(col / 3);
        for (let row = 0; row < 9; row++) {
          for (let col = 0; col < 9; col++) {
            const val = board[row][col];
            const block = getBolck(row, col);
            if (val === '.') continue;
            const rowSet = rows[row];
            const colSet = cols[col];
            const blockSet = blocks[block];
            if (rowSet.has(val) || colSet.has(val) || blockSet.has(val)) return false;
            rowSet.add(val);
            colSet.add(val);
            blockSet.add(val);
          }
        }
        return true;
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
