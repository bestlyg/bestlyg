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
  name: '149. 直线上最多的点数',
  url: 'https://leetcode-cn.com/problems/max-points-on-a-line/',
  difficulty: Difficulty.困难,
  tag: [Tag.几何, Tag.哈希表, Tag.数学],
  desc:
    '给你一个数组 points ，其中 points[i] = [xi, yi] 表示 X-Y 平面上的一个点。求最多有多少个点在同一条直线上。',
  solutions: [
    {
      script: Script.TS,
      time: 152,
      memory: 49.7,
      desc: '储存下标进行判断数量',
      code: `function maxPoints(points: number[][]): number {
        const len = points.length;
        if (len === 1) return 1;
        const cacheKB: Record<string, Set<number>> = {};
        const cacheX: Record<string, Set<number>> = {};
        for (let i1 = 0; i1 < len; i1++) {
          const [x1, y1] = points[i1];
          for (let i2 = i1 + 1; i2 < len; i2++) {
            const [x2, y2] = points[i2];
            if (x1 === x2) {
              let set = cacheX[x1];
              if (!set) set = cacheX[x1] = new Set();
              set.add(i1);
              set.add(i2);
            } else {
              const k = (y1 - y2) / (x1 - x2);
              const b = y1 - k * x1;
              const str = ${specStr.backquote}k=\${k},b=\${b}${specStr.backquote};
              let set = cacheKB[str];
              if (!set) set = cacheKB[str] = new Set();
              set.add(i1);
              set.add(i2);
            }
          }
        }
        return Math.max(
          ...Object.values(cacheKB).map(v => v.size),
          ...Object.values(cacheX).map(v => v.size)
        );
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
