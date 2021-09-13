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
  name: '447. 回旋镖的数量',
  url: 'https://leetcode-cn.com/problems/number-of-boomerangs/',
  difficulty: Difficulty.中等,
  tag: [Tag.数组, Tag.哈希表, Tag.数学],
  desc: '返回平面上所有回旋镖的数量。',
  solutions: [
    {
      script: Script.TS,
      time: 252,
      memory: 60.9,
      desc: 'map储存',
      code: `function numberOfBoomerangs(points: number[][]): number {
        const n = points.length;
        const getDistance = ([x1, y1]: number[], [x2, y2]: number[]) => (x1 - x2) ** 2 + (y1 - y2) ** 2;
        const pointMap: Map<number[], Map<number, number>> = new Map();
        let ans = 0;
        for (let i = 0; i < n; i++) {
          const p1 = points[i];
          let map1 = pointMap.get(p1);
          if (!map1) pointMap.set(p1, (map1 = new Map()));
          for (let j = i + 1; j < n; j++) {
            const p2 = points[j];
            let map2 = pointMap.get(p2);
            if (!map2) pointMap.set(p2, (map2 = new Map()));
            const distance = getDistance(p1, p2);
            const count1 = map1.get(distance) ?? 0;
            map1.set(distance, count1 + 1);
            ans += count1 * 2;
            const count2 = map2.get(distance) ?? 0;
            map2.set(distance, count2 + 1);
            ans += count2 * 2;
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
  console.log(chalk.blue(`正在生成LeetCode题解`));
  md.existMarkdown ? addSolution() : addMarkdown();
  console.log(chalk.green(`生成完成`));
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
