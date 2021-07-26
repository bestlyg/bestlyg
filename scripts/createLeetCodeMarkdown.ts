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
  name: '1713. 得到子序列的最少操作次数',
  url: 'https://leetcode-cn.com/problems/minimum-operations-to-make-a-subsequence/',
  difficulty: Difficulty.困难,
  tag: [Tag.贪心, Tag.数组, Tag.哈希表, Tag.二分查找],
  desc: '给你一个数组 target ，包含若干 互不相同 的整数，以及另一个整数数组 arr ，arr 可能 包含重复元素。每一次操作中，你可以在 arr 的任意位置插入任一整数。比方说，如果 arr = [1,4,1,2] ，那么你可以在中间添加 3 得到 [1,4,3,1,2] 。你可以在数组最开始或最后面添加整数。请你返回 最少 操作次数，使得 target 成为 arr 的一个子序列。',
  solutions: [
    {
      script: Script.TS,
      time: 264,
      memory: 73.4,
      desc: '把原数组转化为目标数组的下标数组，再找最长递增子序列',
      code: `function lengthOfLIS(nums: number[]): number {
        const list: number[] = [];
        for (const num of nums) list[bs(num)] = num;
        return list.length;
        function bs(target: number, left = 0, right = list.length - 1): number {
          if (list.length === 0) return 0;
          if (target > list[right]) return list.length;
          while (left < right) {
            const mid = (right + left) >> 1;
            if (list[mid] >= target) right = mid;
            else left = mid + 1;
          }
          return left;
        }
      }
      function minOperations(target: number[], arr: number[]): number {
        const map: Record<number, number> = {};
        for (let i = 0; i < target.length; i++) map[target[i]] = i;
        const list: number[] = [];
        for (let i = 0; i < arr.length; i++) {
          const idx = map[arr[i]];
          if (idx === undefined) continue;
          list.push(idx);
        }
        return target.length - lengthOfLIS(list);
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
