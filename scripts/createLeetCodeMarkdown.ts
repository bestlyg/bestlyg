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
    name: '229. 求众数 II',
    url: 'https://leetcode-cn.com/problems/majority-element-ii/',
    difficulty: Difficulty.中等,
    tag: [Tag.数组, Tag.哈希表, Tag.计数, Tag.排序],
    desc: `给定一个大小为 n 的整数数组，找出其中所有出现超过 ⌊ n/3 ⌋ 次的元素。`,
    solutions: [
      {
        script: Script.TS,
        time: 88,
        memory: 41.8,
        desc: '哈希存储',
        code: `function majorityElement(nums: number[]): number[] {
          const map = new Map<number, number>();
          const n = nums.length;
          for (const num of nums) {
            map.set(num, (map.get(num) ?? 0) + 1);
          }
          return Array.from(map.entries())
            .filter(([, v]) => v > n / 3)
            .map(([k]) => k);
        }
        `,
      },
      {
        script: Script.TS,
        time: 88,
        memory: 41.5,
        desc: '摩尔投票，超过n/3的数最多有2个，每三个不同的数进行抵消',
        code: `function majorityElement(nums: number[]): number[] {
          const n = nums.length;
          let num1 = nums[0];
          let num2 = nums[0];
          let val1 = 0;
          let val2 = 0;
          for (const num of nums) {
            if (val1 > 0 && num === num1) {
              val1++;
            } else if (val2 > 0 && num === num2) {
              val2++;
            } else if (val1 === 0) {
              num1 = num;
              val1++;
            } else if (val2 === 0) {
              num2 = num;
              val2++;
            } else {
              val1--;
              val2--;
            }
          }
          let cnt1 = 0;
          let cnt2 = 0;
          for (const num of nums) {
            if (val1 > 0 && num1 === num) cnt1++;
            if (val2 > 0 && num2 === num) cnt2++;
          }
          const ans: number[] = [];
          if (val1 > 0 && cnt1 > n / 3) ans.push(num1);
          if (val2 > 0 && cnt2 > n / 3) ans.push(num2);
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
