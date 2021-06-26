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
  name: '752. 打开转盘锁',
  url: 'https://leetcode-cn.com/problems/open-the-lock/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.哈希表, Tag.字符串],
  desc:
    '字符串 target 代表可以解锁的数字，你需要给出解锁需要的最小旋转次数，如果无论如何不能解锁，返回 -1 。',
  solutions: [
    {
      script: Script.TS,
      time: 776,
      memory: 56.8,
      desc: '广度优先搜索，储存后进行遍历',
      code: `function openLock(deadends: string[], target: string): number {
        const prevMap: Record<string, string> = {
          0: '9',
          1: '0',
          2: '1',
          3: '2',
          4: '3',
          5: '4',
          6: '5',
          7: '6',
          8: '7',
          9: '8',
        };
        const nextMap: Record<string, string> = {
          0: '1',
          1: '2',
          2: '3',
          3: '4',
          4: '5',
          5: '6',
          6: '7',
          7: '8',
          8: '9',
          9: '0',
        };
        const INIT_STR = '0000';
        const set = new Set(deadends);
        if (set.has(INIT_STR)) return -1;
        if (target === INIT_STR) return 0;
        const queue = [INIT_STR];
        const map = new Map<string, number>([[INIT_STR, 0]]);
        let ans = Infinity;
        const updateQueue = (str: string, index: number, dict: Record<string, string>, step: number) => {
          const replaceStr = str.substring(0, index) + dict[str[index]] + str.substring(index + 1);
          if (replaceStr === target) {
            ans = Math.min(ans, step + 1);
            return;
          }
          if (!set.has(replaceStr)) {
            map.has(replaceStr) || queue.push(replaceStr);
            map.set(replaceStr, Math.min(map.get(replaceStr) ?? Infinity, step + 1));
          }
        };
        while (queue.length !== 0) {
          const str = queue.shift()!;
          const step = map.get(str)!;
          for (let i = 0; i < 4; i++) {
            updateQueue(str, i, prevMap, step);
            updateQueue(str, i, nextMap, step);
          }
        }
        return ans === Infinity ? -1 : ans;
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
