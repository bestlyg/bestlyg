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
    name: '638. 大礼包',
    url: 'https://leetcode-cn.com/problems/shopping-offers/',
    difficulty: Difficulty.中等,
    tag: [Tag.位运算, Tag.记忆化搜索, Tag.数组, Tag.动态规划, Tag.回溯, Tag.状态压缩],
    desc: `返回 确切 满足购物清单所需花费的最低价格，你可以充分利用大礼包的优惠活动。你不能购买超出购物清单指定数量的物品，即使那样会降低整体价格。任意大礼包可无限次购买。`,
    solutions: [
      {
        script: Script.TS,
        time: 76,
        memory: 39.8,
        desc: 'dfs',
        code: `function shoppingOffers(price: number[], special: number[][], needs: number[]): number {
          const n = price.length;
          special = special
            .filter(item => {
              let sum = 0;
              for (let i = 0; i < n; i++) sum += item[i] * price[i];
              return sum > item[n];
            })
            .sort((a, b) => a[n] - b[n]);
          let ans = Infinity;
          dfs(needs);
          return ans;
          function dfs(needs: number[], cost = 0) {
            if (needs.every(v => v === 0)) {
              ans = Math.min(cost, ans);
              return;
            }
            const list = special.filter((item: number[]) =>
              item.every((v, i) => (i === n ? true : v <= needs[i]))
            );
            if (list.length === 0) {
              dfs(
                [0],
                needs.reduce((total, v, i) => price[i] * v + total, cost)
              );
            } else {
              list.forEach(item => {
                dfs(
                  needs.map((v, i) => v - item[i]),
                  item[n] + cost
                );
              });
            }
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
