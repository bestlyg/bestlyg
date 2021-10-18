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

const mds: Markdown[] = [
  {
    existMarkdown: !true,
    name: '476. 数字的补数',
    url: 'https://leetcode-cn.com/problems/number-complement/',
    difficulty: Difficulty.中等,
    tag: [Tag.位运算],
    desc: `给你一个 正 整数 num ，输出它的补数。补数是对该数的二进制表示取反。`,
    solutions: [
      {
        script: Script.TS,
        time: 68,
        memory: 39.2,
        desc: '利用字符串翻转',
        code: `function findComplement(num: number): number {
        const bitStr = num.toString(2).split('').map(v=>v==='1'?'0':'1').join('');
        return parseInt(bitStr,2)
        };`,
      },
      {
        script: Script.TS,
        time: 72,
        memory: 39.1,
        desc: '获取最高位进行翻转，利用异或取反',
        code: `function findComplement(num: number): number {
          let bit = 0;
          for (; bit <= 30; bit++) 
            if (num < 1 << bit) break;
          if (bit === 31) bit = 0x7fffffff;
          bit = (1 << bit) - 1;
          return bit ^ num;
        }`,
      },
    ],
  },
  {
    existMarkdown: !true,
    name: '1009. 十进制整数的反码',
    url: 'https://leetcode-cn.com/problems/complement-of-base-10-integer/',
    difficulty: Difficulty.中等,
    tag: [Tag.位运算],
    desc: `给你一个十进制数 N，请你返回其二进制表示的反码所对应的十进制整数。`,
    solutions: [
      {
        script: Script.TS,
        time: 72,
        memory: 39.4,
        desc: '利用字符串翻转',
        code: `function findComplement(num: number): number {
        const bitStr = num.toString(2).split('').map(v=>v==='1'?'0':'1').join('');
        return parseInt(bitStr,2)
        };`,
      },
      {
        script: Script.TS,
        time: 76,
        memory: 39.1,
        desc: '获取最高位进行翻转，利用异或取反',
        code: `function bitwiseComplement(n: number): number {
          if(n===0)return 1
        let bit = 0;
                for (; bit <= 30; bit++) 
                  if (n < 1 << bit) break;
                if (bit === 31) bit = 0x7fffffff;
                bit = (1 << bit) - 1;
                return bit ^ n;
      };`,
      },
    ],
  },
];
const descFormat = (str: string) => (str.endsWith('。') ? str : str + '。');
let current: Markdown;
let dirName!: string;
let filePath!: string;
let dirPath!: string;

function main() {
  console.log(chalk.blue(`正在生成LeetCode题解`));
  console.log(LOGO);
  for (const md of mds) {
    current = md;
    dirName = getDirName(md.name);
    dirPath = resolve(srcPath, dirName);
    filePath = resolve(dirPath, trimBlank(md.name) + '.md');
    md.existMarkdown ? addSolution() : addMarkdown();
    console.log(chalk.blue(`${md.name}生成完成`));
  }
  console.log(chalk.green(`生成完成`));
}
function addMarkdown() {
  fs.writeFileSync(
    filePath,
    `---
title: ${current.name}
order: ${getFileOrder(current.name)}
nav:
  title: 力扣题解
  path: /leetcode
  order: 4
group:
  title: ${dirName}
  path: /${dirName}
  order: ${getDirOrder(dirName)}
---

# ${current.name}
    
> 链接：[${current.name}](${current.url})  
> 难度：${current.difficulty}  
> 标签：${current.tag.join('、')}  
> 简介：${descFormat(current.desc)}
      
${current.solutions.map((data, index) => analysisSolution(data, index + 1)).join('\n')}
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
      current.solutions
        .map((data, index) => analysisSolution(data, index + 1 + lastIndex))
        .join('\n')
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
