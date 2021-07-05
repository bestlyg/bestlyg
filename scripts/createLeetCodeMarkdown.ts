import { leetcode, trimBlank, resolve, fs, moment, specStr, LOGO, markdown } from './utils';

const { backquote } = specStr;
const { link } = markdown;
const { Script, Difficulty, Tag, srcPath, solutionReg, getDirOrder, getFileOrder, getDirName } =
  leetcode;
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
  name: '726. 原子的数量',
  url: 'https://leetcode-cn.com/problems/number-of-atoms/',
  difficulty: Difficulty.困难,
  tag: [Tag.哈希表, Tag.栈, Tag.哈希表],
  desc: '给定一个化学式，输出所有原子的数量。格式为：第一个（按字典序）原子的名子，跟着它的数量（如果数量大于 1），然后是第二个原子的名字（按字典序），跟着它的数量（如果数量大于 1），以此类推。',
  solutions: [
    {
      script: Script.TS,
      time: 112,
      memory: 43,
      desc: '递归检索括号，逐个存入哈希表中',
      code: `function countOfAtoms(formula: string): string {
        const uperChar = /^[A-Z]$/;
        const lowerChar = /^[a-z]$/;
        const numChar = /^[0-9]$/;
        const data = getRecord(formula);
        return Object.entries(data)
          .sort(([k1], [k2]) => {
            const len1 = k1.length;
            const len2 = k2.length;
            let i = 0;
            while (i < Math.min(len1, len2)) {
              const code1 = k1.codePointAt(i)!;
              const code2 = k2.codePointAt(i)!;
              if (code1 !== code2) return code1 - code2;
              else i++;
            }
            if (i === len1) return -1;
            else if (i === len2) return 1;
            else return 0;
          })
          .map(([k, v]) => k + (v === 1 ? '' : v))
          .join('');
        function getRecord(str: string): Record<string, number> {
          const len = str.length;
          const stack: string[] = [];
          const map: Record<string, number> = {};
          for (let i = 0; i < len; i++) {
            let c = str[i];
            if (uperChar.test(c)) {
              stack.push(c);
            } else if (lowerChar.test(c)) {
              stack.push(stack.pop()! + c);
            } else if (c === '(') {
              let left = 1;
              let tempStr = '';
              while (true) {
                if (str[i + 1] === '(') left++;
                if (str[i + 1] === ')' && --left === 0) break;
                tempStr += str[++i];
              }
              const internalRecord = getRecord(tempStr);
              i++;
              let numStr = '';
              while (numChar.test(str[i + 1])) numStr += str[++i];
              const num = +numStr;
              Object.entries(internalRecord).forEach(([k, v]) => {
                map[k] = (map[k] ?? 0) + v * (num === 0 ? 1 : num);
              });
            } else {
              while (numChar.test(str[i + 1])) c = c + str[++i];
              const num = +c;
              const char = stack.pop()!;
              map[char] = (map[char] ?? 0) + num;
            }
          }
          while (stack.length !== 0) {
            const c = stack.pop()!;
            map[c] = (map[c] ?? 0) + 1;
          }
          return map;
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
