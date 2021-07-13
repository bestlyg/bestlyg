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
  name: '218. 天际线问题',
  url: 'https://leetcode-cn.com/problems/the-skyline-problem/',
  difficulty: Difficulty.困难,
  tag: [Tag.树状数组, Tag.线段树, Tag.数组, Tag.分治, Tag.有序集合, Tag.扫描线, Tag.堆_优先队列],
  desc: '城市的天际线是从远处观看该城市中所有建筑物形成的轮廓的外部轮廓。给你所有建筑物的位置和高度，请返回由这些建筑物形成的 天际线 。',
  solutions: [
    {
      script: Script.TS,
      time: 392,
      memory: 46.2,
      desc: markdown.link(
        '参考链接',
        'https://leetcode-cn.com/problems/the-skyline-problem/solution/js-sao-miao-xian-fa-jian-dan-yi-dong-by-fleetingso/'
      ),
      code: `function getSkyline(buildings: number[][]): number[][] {
        const list: [number, number][] = [];
        buildings.forEach(([l, r, h]) => list.push([l, -h], [r, h]));
        list.sort(([i1, h1], [i2, h2]) => (i1 === i2 ? h1 - h2 : i1 - i2));
        const heights: number[] = [0];
        const remove = (h: number) => {
          for (let i = 0, l = heights.length; i < l; i++)
            if (heights[i] === h) {
              heights.splice(i, 1);
              return;
            }
        };
        let ans: number[][] = [];
        let preH: number | null = null;
        for (const [idx, h] of list) {
          if (h < 0) heights.push(-h);
          else remove(h);
          let maxH = Math.max(...heights);
          if (preH !== maxH) ans.push([idx, (preH = maxH)]);
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
