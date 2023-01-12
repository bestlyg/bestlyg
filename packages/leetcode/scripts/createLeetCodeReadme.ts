import chalk from 'chalk';
import fs from 'fs-extra';
import {
  analysisFileName,
  findLastSolutionIdx,
  LOGO,
  reg,
  resolve,
  rootPath,
  SolutionList,
  travel,
  trimBlank,
} from '@/utils';
import { Difficulty, Readme, Markdown } from '@/base';

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
// const cache: Record<string, SolutionList[]> = {
//   顺序索引: [],
//   标签索引: [],
//   难度索引: [
//     { name: Difficulty.简单, solutions: [] },
//     { name: Difficulty.中等, solutions: [] },
//     { name: Difficulty.困难, solutions: [] },
//   ],
// };
const cache = {
  markdownCount: 0,
  solutionCount: 0,
  index: [],
  tag: [],
  difficulty: [
    { dir: Difficulty.简单, list: [] },
    { dir: Difficulty.中等, list: [] },
    { dir: Difficulty.困难, list: [] },
  ],
} as Readme;
const indexCache = cache.index;
const tagCache = cache.tag;
const difficultyCache = cache.difficulty;
let md!: Markdown;

function main() {
  console.log(chalk.blue(`正在生成LeetCode目录`));
  console.log(LOGO);
  for (const { filepath } of travel()) {
    console.log(filepath);
    md = JSON.parse(fs.readFileSync(filepath).toString());
    cache.markdownCount++;
    cache.solutionCount += md.solutions.length;
    analysisIndex();
    analysisTag();
    analysisDifficulty();
  }
  const path = resolve('data/main.json');
  fs.writeFileSync(path, JSON.stringify(cache, null, 4));
  console.log(chalk.green(`生成完成`));
}

function analysisIndex() {
  const { dirname } = analysisFileName(md.name);
  let obj = indexCache.find(v => v.dir.startsWith(dirname));
  if (!obj) indexCache.push((obj = { dir: dirname, list: [] }));
  obj.list.push(md.name);
}
function analysisTag() {
  if (!md.tag.length) return  
  for (const tag of md.tag) {
    let obj = tagCache.find(v => v.dir.startsWith(tag));
    if (!obj) tagCache.push((obj = { dir: tag, list: [] }));
    obj.list.push(md.name);
  }
}
function analysisDifficulty() {
  let obj = difficultyCache.find(v => v.dir.startsWith(md.difficulty))!;
  if (!obj) difficultyCache.push((obj = { dir: md.difficulty, list: [] }));
  obj.list.push(md.name);
}

main();
