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
    name: '301. 删除无效的括号',
    url: 'https://leetcode-cn.com/problems/remove-invalid-parentheses/',
    difficulty: Difficulty.困难,
    tag: [Tag.广度优先搜索, Tag.字符串, Tag.回溯],
    desc: `给你一个由若干括号和字母组成的字符串 s ，删除最小数量的无效括号，使得输入的字符串有效。`,
    solutions: [
      {
        script: Script.TS,
        time: 104,
        memory: 46.3,
        desc: 'dfs',
        code: `const map: Record<string, string[]> = {};
        function removeInvalidParentheses(s: string): string[] {
          if (map[s]) return map[s];
          const replaceStr = s.replace(new RegExp('[(]|[)]', 'g'), '');
          const leftList: number[] = [];
          const rightList: number[] = [];
          const n = s.length;
          for (let i = 0; i < n; i++) {
            const ch = s[i];
            if (ch === '(') leftList.push(i);
            if (ch === ')') rightList.push(i);
          }
          if (leftList.length === 0 || rightList.length === 0) return [replaceStr];
          let max = replaceStr.length;
          const ans = new Set<string>(['', replaceStr]);
          for (const left of leftList) {
            let rightIdx = findRight(left);
            for (let rlen = rightList.length; rightIdx < rlen; rightIdx++) {
              const right = rightList[rightIdx];
              for (const s0 of removeInvalidParentheses(s.substring(0, left))) {
                for (const s1 of removeInvalidParentheses(s.substring(left + 1, right))) {
                  for (const s2 of removeInvalidParentheses(s.substring(right + 1))) {
                    const str = ${backquote}\${s0}(\${s1})\${s2}${backquote};
                    max = Math.max(max, str.length);
                    ans.add(str);
                  }
                }
              }
            }
          }
          return (map[s] = Array.from(ans).filter(v => v.length === max));
          function findRight(leftIdx: number) {
            let left = 0;
            let right = rightList.length - 1;
            if (rightList[right] < leftIdx) return Infinity;
            while (left < right) {
              const mid = (left + right) >> 1;
              if (rightList[mid] >= leftIdx) right = mid;
              else left = mid + 1;
            }
            return left;
          }
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
