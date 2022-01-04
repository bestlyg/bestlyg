import { fs, leetcode, LOGO, resolve, trimBlank, chalk } from './utils';

type SolutionList = leetcode.SolutionList;
const { Difficulty, rootPath, reg, analysisFileName, srcPath, findLastSolutionIdx, travel, Type } =
  leetcode;
const waitSolutions = [
  {
    name: '127. 单词接龙',
    url: 'https://leetcode-cn.com/problems/word-ladder/',
  },
  {
    name: '126.单词接龙II',
    url: 'https://leetcode-cn.com/problems/word-ladder-ii/',
  },
  {
    name: '887.鸡蛋掉落',
    url: 'https://leetcode-cn.com/problems/super-egg-drop/',
  },
  {
    name: '10. 正则表达式匹配',
    url: 'https://leetcode-cn.com/problems/regular-expression-matching/',
  },
  {
    name: '面试题 16.18. 模式匹配',
    url: 'https://leetcode-cn.com/problems/pattern-matching-lcci/',
  },
  {
    name: '315. 计算右侧小于当前元素的个数',
    url: 'https://leetcode-cn.com/problems/count-of-smaller-numbers-after-self/',
  },
  {
    name: '410. 分割数组的最大值',
    url: 'https://leetcode-cn.com/problems/split-array-largest-sum/',
  },
  {
    name: 'LCP 13. 寻宝',
    url: 'https://leetcode-cn.com/problems/xun-bao/',
  },
  {
    name: '632. 最小区间',
    url: 'https://leetcode-cn.com/problems/smallest-range-covering-elements-from-k-lists/',
  },
  {
    name: '834. 树中距离之和',
    url: 'https://leetcode-cn.com/problems/sum-of-distances-in-tree/',
  },
  {
    name: '18. 四数之和',
    url: 'https://leetcode-cn.com/problems/4sum/',
  },
  {
    name: '493. 翻转对',
    url: 'https://leetcode-cn.com/problems/reverse-pairs/',
  },
  {
    name: '913. 猫和老鼠',
    url: 'https://leetcode-cn.com/problems/cat-and-mouse/',
  },
];
const cache: Record<string, SolutionList[]> = {
  顺序索引: [],
  标签索引: [],
  难度索引: [
    { name: Difficulty.简单, solutions: [] },
    { name: Difficulty.中等, solutions: [] },
    { name: Difficulty.困难, solutions: [] },
  ],
};
const indexCache = cache['顺序索引'];
const tagCache = cache['标签索引'];
const difficultyCache = cache['难度索引'];
let template = '';
let fileName = '';
let solutionCount = 0;
let fileCount = 0;

function main() {
  console.log(chalk.blue(`正在生成LeetCode目录`));
  console.log(LOGO);
  run_web();
  run_git();
  console.log(chalk.green(`生成完成`));
}

function run_web() {
  const path = resolve(srcPath, 'index.md');
  const data = `---
title: 目录索引
nav:
  title: 力扣题解
  path: /leetcode
group:
  title: 目录索引
  path: /catalog
  order: 0
---

# 目录索引
## 介绍
个人 LeetCode 题解

${createSolutionsTemplate({
  createLink: name => {
    const { dirname, type } = analysisFileName(name);
    let link = name.substring(0, name.lastIndexOf('.')).toLowerCase();
    if (type === Type.OFFER2) link = link.replace('ii', '-ii');
    return `- [${name}](${dirname}/${link})\n`;
  },
})}
`;
  fs.removeSync(path);
  fs.writeFile(path, data);
}
function run_git() {
  const path = resolve(rootPath, 'README.md');
  const data = `
# 目录索引
## 介绍
个人 LeetCode 题解

${createSolutionsTemplate({
  createLink: name => {
    const { dirname } = analysisFileName(name);
    return `- [${name}](./src/${dirname}/${name}.md)\n`;
  },
})}
`;
  fs.removeSync(path);
  fs.writeFile(path, data);
}

function createSolutionsTemplate({ createLink }: { createLink: (name: string) => string }) {
  for (const { filepath } of travel()) {
    template = fs.readFileSync(filepath).toString();
    fileCount++;
    solutionCount += findLastSolutionIdx(template);
    analysisIndex();
    analysisTag();
    analysisDifficulty();
  }
  let res = `
总题目数:${fileCount}
总题解数:${solutionCount}

  `;
  for (const [key, subCache] of Object.entries(cache)) {
    res += `## ${key}\n`;
    for (const { name, solutions } of subCache) {
      res += `### ${name}\n`;
      for (const solution of solutions) {
        res += createLink(solution);
      }
    }
  }
  return res;
}

function analysisIndex() {
  if (!reg.index.test(template)) return;
  fileName = trimBlank(RegExp.$1);
  const { dirname } = analysisFileName(fileName);
  let obj = indexCache.find(v => v.name.startsWith(dirname));
  if (!obj) indexCache.push((obj = { name: dirname, solutions: [] }));
  obj.solutions.push(fileName);
}
function analysisTag() {
  if (!reg.tag.test(template)) return;
  const name = trimBlank(RegExp.$1);
  if (!name) return;
  const tagList = name.split('、');
  for (const tag of tagList) {
    let obj = tagCache.find(v => v.name.startsWith(tag));
    if (!obj) tagCache.push((obj = { name: tag, solutions: [] }));
    obj.solutions.push(fileName);
  }
}
function analysisDifficulty() {
  if (!reg.dif.test(template)) return;
  const name = trimBlank(RegExp.$1);
  let obj = difficultyCache.find(v => v.name.startsWith(name));
  if (!obj) difficultyCache.push((obj = { name: name, solutions: [] }));
  obj.solutions.push(fileName);
}

main();
