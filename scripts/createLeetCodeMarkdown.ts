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
  existMarkdown: false,
  name: '1442. 形成两个异或相等数组的三元组数目',
  url: 'https://leetcode-cn.com/problems/count-triplets-that-can-form-two-arrays-of-equal-xor//',
  difficulty: Difficulty.中等,
  tag: [Tag.位运算, Tag.数组, Tag.数学],
  desc: '请返回能够令 a == b 成立的三元组 (i, j , k) 的数目。',
  solutions: [
    {
      script: Script.TS,
      time: 148,
      memory: 39.8,
      desc: '前缀和',
      code: `function countTriplets(arr: number[]): number {
        const len = arr.length;
        if (len === 1) return 0;
        let ans = 0;
        const prefixSumList: number[] = [ans, ...arr.map(v => (ans ^= v))];
        ans = 0;
        for (let k = 1; k < len; k++) {
          for (let j = 1; j <= k; j++) {
            for (let i = 0; i < j; i++) {
              const a = prefixSumList[j] ^ prefixSumList[i];
              const b = prefixSumList[k + 1] ^ prefixSumList[j];
              if (a === b) ans++;
            }
          }
        }
        return ans;
      }`,
    },
    {
      script: Script.TS,
      time: 100,
      memory: 40.3,
      desc: '在前后相等的情况下，可取任意j',
      code: `function countTriplets(arr: number[]): number {
        const len = arr.length;
        if (len === 1) return 0;
        let ans = 0;
        const prefixSumList: number[] = [ans, ...arr.map(v => (ans ^= v))];
        ans = 0;
        for (let k = 1; k < len; k++) {
          for (let i = 0; i < k; i++) {
            if (prefixSumList[k + 1] === prefixSumList[i]) ans += k - i;
          }
        }
        return ans;
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
