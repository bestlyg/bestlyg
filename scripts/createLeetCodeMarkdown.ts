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
  existMarkdown: true,
  name: '13. 罗马数字转整数',
  url: 'https://leetcode-cn.com/problems/shu-zu-zhong-de-ni-xu-dui-lcof/',
  difficulty: Difficulty.困难,
  tag: [],
  desc:
    '在数组中的两个数字，如果前面一个数字大于后面的数字，则这两个数字组成一个逆序对。输入一个数组，求出这个数组中的逆序对的总数。',
  solutions: [
    {
      script: Script.TS,
      time: 160,
      memory: 46.2,
      desc: '遍历',
      code: `function romanToInt(s: string): number {
        let ans = 0;
        const scoreCache: Record<string, number> = {
          M: 1000,
          D: 500,
          L: 50,
          V: 5,
        };
        const specCache: Record<string, [string, string, number]> = {
          C: ['D', 'M', 100],
          X: ['L', 'C', 10],
          I: ['V', 'X', 1],
        };
        for (let i = 0, l = s.length; i < l; i++) {
          const c = s[i];
          const data = specCache[c];
          if (data) {
            const [c1, c2, num] = data;
            if (s[i + 1] === c1) {
              i++;
              ans += 4 * num;
            } else if (s[i + 1] === c2) {
              i++;
              ans += 9 * num;
            } else {
              ans += 1 * num;
            }
          } else ans += scoreCache[c];
        }
        return ans;
      }
      `,
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
