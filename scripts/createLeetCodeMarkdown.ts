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
  name: '981. 基于时间的键值存储',
  url: 'https://leetcode-cn.com/problems/time-based-key-value-store/',
  difficulty: Difficulty.中等,
  tag: [Tag.设计, Tag.哈希表, Tag.字符串, Tag.二分查找],
  desc: '创建一个基于时间的键值存储类 TimeMap',
  solutions: [
    {
      script: Script.TS,
      time: 412,
      memory: 77.1,
      desc: '利用map储存所有值',
      code: `class TimeMap {
        private map: Record<string, [string, number][]> = {};
        set(key: string, value: string, timestamp: number): void {
          let list = this.map[key];
          if (!list) this.map[key] = list = [];
          list.push([value, timestamp]);
        }
        get(key: string, timestamp: number): string {
          return this.find(this.map[key] ?? [], timestamp);
        }
        private find(
          list: [string, number][],
          timestamp: number,
          first = 0,
          last = list.length - 1
        ): string {
          if (first > last) {
            while (first > list.length - 1) first--;
            while (first >= 0) {
              if (list[first][1] < timestamp) return list[first][0];
              first--;
            }
            return '';
          }
          const mid = (first + last) >> 1;
          const [midStr, midTime] = list[mid];
          if (midTime > timestamp) return this.find(list, timestamp, first, mid - 1);
          else if (midTime < timestamp) return this.find(list, timestamp, mid + 1, last);
          else return midStr;
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
