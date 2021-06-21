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
  name: '401. 二进制手表',
  url: 'https://leetcode-cn.com/problems/binary-watch/',
  difficulty: Difficulty.简单,
  tag: [Tag.位运算, Tag.回溯算法],
  desc:
    '二进制手表顶部有 4 个 LED 代表 小时（0-11），底部的 6 个 LED 代表 分钟（0-59）。每个 LED 代表一个 0 或 1，最低位在右侧。给你一个整数 turnedOn ，表示当前亮着的 LED 的数量，返回二进制手表可以表示的所有可能时间。你可以 按任意顺序 返回答案。',
  solutions: [
    {
      script: Script.TS,
      time: 96,
      memory: 42.2,
      desc: '全排列',
      code: `const getTime = (hour: number, minute: number): string =>
      ${specStr.backquote}\${hour}:\${minute < 10 ? '0' + minute : minute}${specStr.backquote};
    const getList = (count: number, data: number[], maxNumber) => {
      const ans: Set<number> = new Set();
      if (count >= data.length) return ans;
      if (count === 0) {
        ans.add(0);
        return ans;
      }
      for (let i = 0, len = data.length; i < len; i++) {
        const num = 1 << data[i];
        const list = getList(count - 1, [...data.slice(0, i), ...data.slice(i + 1)], maxNumber);
        if (list.size === 0) ans.add(num);
        else {
          list.forEach(v => {
            const item = v | num;
            item <= maxNumber && ans.add(item);
          });
        }
      }
      return ans;
    };
    const getHourList = (count: number) =>
      getList(
        count,
        new Array(4).fill(0).map((_, i) => i),
        11
      );
    const getMinuteList = (count: number) =>
      getList(
        count,
        new Array(6).fill(0).map((_, i) => i),
        59
      );
    function readBinaryWatch(turnedOn: number): string[] {
      if (turnedOn >= 9) return [];
      if (turnedOn === 0) return ['0:00'];
      return new Array(Math.min(4, turnedOn) + 1)
        .fill(0)
        .map((_, i) => {
          return [i, turnedOn - i];
        })
        .map(([hour, minute]) => {
          const ans: string[] = [];
          const hourList = getHourList(hour);
          const minuteList = getMinuteList(minute);
          if (hourList.size === 0 || minuteList.size === 0) return ans;
          for (const hour of hourList) {
            for (const minute of minuteList) {
              ans.push(getTime(hour, minute));
            }
          }
          return ans;
        })
        .flat();
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
