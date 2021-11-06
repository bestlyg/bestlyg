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
    name: '268. 丢失的数字',
    url: 'https://leetcode-cn.com/problems/missing-number/',
    difficulty: Difficulty.简单,
    tag: [Tag.位运算, Tag.数组, Tag.哈希表, Tag.数学, Tag.排序],
    desc: `给定一个包含 [0, n] 中 n 个数的数组 nums ，找出 [0, n] 这个范围内没有出现在数组中的那个数。`,
    solutions: [
      {
        script: Script.TS,
        time: 80,
        memory: 45,
        desc: '哈希',
        code: `function missingNumber(nums: number[]): number {
          const n = nums.length;
          const set = new Set(nums);
          for (let num = 0; num <= n; num++) {
            if (!set.has(num)) return num;
          }
          return 0;
        }
        `,
      },
      {
        script: Script.TS,
        time: 80,
        memory: 40.4,
        desc: 'xor去重',
        code: `function missingNumber(nums: number[]): number {
          const n = nums.length;
          let num = 0;
          for (let i = 0; i <= n; i++) num ^= i;
          for (let i = 0; i < n; i++) num ^= nums[i];
          return num;
        }
        `,
      },
    ],
  },
  {
    existMarkdown: !true,
    name: '32. 最长有效括号',
    url: 'https://leetcode-cn.com/problems/longest-valid-parentheses/',
    difficulty: Difficulty.困难,
    tag: [Tag.栈, Tag.字符串, Tag.动态规划],
    desc: `给你一个只包含 '(' 和 ')' 的字符串，找出最长有效（格式正确且连续）括号子串的长度。`,
    solutions: [
      {
        script: Script.TS,
        time: 84,
        memory: 40.7,
        desc: '动态规划分析括号出现的状态',
        code: `function longestValidParentheses(s: string): number {
          const n = s.length;
          const dp = new Array(n + 1).fill(0);
          let ans = 0;
          for (let i = 1; i < n; i++) {
            const ch = s[i];
            if (ch === '(') dp[i + 1] = 0;
            else if (s[i - 1] === '(') dp[i + 1] = dp[i - 1] + 2;
            else if (s[i - dp[i] - 1] === '(') dp[i + 1] = dp[i] + 2 + dp[i - dp[i] - 1];
            else dp[i + 1] = 0;
            ans = Math.max(ans, dp[i + 1]);
          }
          return ans;
        }
        `,
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
