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
    name: '500. 键盘行',
    url: 'https://leetcode-cn.com/problems/keyboard-row/',
    difficulty: Difficulty.简单,
    tag: [Tag.数组, Tag.哈希表, Tag.字符串],
    desc: `给你一个字符串数组 words ，只返回可以使用在 美式键盘 同一行的字母打印出来的单词。`,
    solutions: [
      {
        script: Script.TS,
        time: 76,
        memory: 39.3,
        desc: '哈希',
        code: `function findWords(words: string[]): string[] {
          const data: Set<string>[] = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'].map(
            str => new Set<string>(str.split(''))
          );
          return words.filter(word => {
              word = word .toLowerCase()
            const set = data.find(set => set.has(word[0]))!;
            for (const ch of word) {
              if (!set.has(ch)) return false;
            }
            return true;
          });
        }
        `,
      },
    ],
  },
  {
    existMarkdown: !true,
    name: '260. 只出现一次的数字 III',
    url: 'https://leetcode-cn.com/problems/single-number-iii/',
    difficulty: Difficulty.中等,
    tag: [Tag.位运算, Tag.数组],
    desc: `给定一个整数数组 nums，其中恰好有两个元素只出现一次，其余所有元素均出现两次。 找出只出现一次的那两个元素。你可以按 任意顺序 返回答案。`,
    solutions: [
      {
        script: Script.TS,
        time: 84,
        memory: 41.2,
        desc: '哈希',
        code: `function singleNumber(nums: number[]): number[] {
          const map=new Map<number,number>()
          nums.forEach(num=>{
              map.set(num,(map.get(num) ?? 0) + 1);
          });
          return Array.from(map.entries()).filter(([,v])=>v===1).map(([k])=>k)
      };`,
      },
      {
        script: Script.TS,
        time: 76,
        memory: 40.3,
        desc: '位运算',
        code: `function singleNumber(nums: number[]): number[] {
          const xorNum = nums.reduce((ans, num) => ans ^ num, 0);
          let i = 0;
          while ((xorNum & (1 << i)) === 0) i++;
          let num1 = 0;
          let num2 = 0;
          for (const num of nums) {
            if (num & (1 << i)) num1 ^= num;
            else num2 ^= num;
          }
          return [num1, num2];
        }`,
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
