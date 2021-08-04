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
  name: '611. 有效三角形的个数',
  url: 'https://leetcode-cn.com/problems/valid-triangle-number/',
  difficulty: Difficulty.中等,
  tag: [Tag.贪心, Tag.数组, Tag.双指针, Tag.二分查找, Tag.排序],
  desc: '给定一个包含非负整数的数组，你的任务是统计其中可以组成三角形三条边的三元组个数。',
  solutions: [
    {
      script: Script.TS,
      time: 2844,
      memory: 39.7,
      desc: '三次循环',
      code: `function triangleNumber(nums: number[]): number {
        nums.sort((a, b) => a - b);
        const n = nums.length;
        let ans = 0;
        for (let l1 = 0; l1 < n; l1++) {
          const n1 = nums[l1];
          for (let l2 = l1 + 1; l2 < n; l2++) {
            const n2 = nums[l2];
            for (let l3 = l2 + 1; l3 < n; l3++) {
              const n3 = nums[l3];
              if (n1 + n2 > n3 && n1 + n3 > n2 && n2 + n3 + n1) ans++;
            }
          }
        }
        return ans;
      }`,
    },
    {
      script: Script.TS,
      time: 335,
      memory: 40.5,
      desc: '二次循环+二分',
      code: `function triangleNumber(nums: number[]): number {
        nums.sort((a, b) => a - b);
        nums.push(Infinity);
        const n = nums.length;
        let ans = 0;
        for (let l1 = 0; l1 < n; l1++) {
          const n1 = nums[l1];
          for (let l2 = l1 + 1; l2 < n - 1; l2++) {
            const n2 = nums[l2];
            const l3 = bs(l2 + 1, n - 1, n1, n2);
            if (l3 !== l2) ans += l3 - l2;
          }
        }
        return ans;
        function bs(left: number, right: number, n1: number, n2: number): number {
          while (left < right) {
            const mid = (left + right) >> 1;
            if (nums[mid] + n1 > n2 && nums[mid] + n2 > n1 && n1 + n2 > nums[mid]) {
              left = mid + 1;
            } else {
              right = mid;
            }
          }
          return left - 1;
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
