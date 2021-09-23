import { fs, leetcode, LOGO, resolve, trimBlank, chalk } from './utils';

type SolutionList = leetcode.SolutionList;
const {
  Difficulty,
  rootPath,
  HADER_LCP,
  HADER_OFFER,
  HADER_FACE,
  indexReg,
  tagReg,
  difReg,
  getNumDirName,
  srcPath,
  getLastSolutionIdx,
} = leetcode;
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
const pathMap: Record<string, string> = {};

function main() {
  console.log(chalk.blue(`正在生成LeetCode目录`));
  console.log(LOGO);
  const data = `
# 目录索引
## 介绍
个人 LeetCode 题解

${createSolutionsTemplate()}
`;
  const paths = [
    {
      path: resolve(srcPath, 'index.md'),
      data: `---
title: 目录索引
nav:
  title: 力扣题解
  path: /leetcode
group:
  title: 目录索引
  path: /catalog
  order: 0
---

${data}
`,
    },
    { path: resolve(rootPath, 'README.md'), data },
  ];
  paths.forEach(({ path, data }) => {
    fs.removeSync(path);
    fs.writeFile(path, data);
  });
  console.log(chalk.green(`生成完成`));
}

const createSolutionsTemplate = () => {
  const dirList = fs
    .readdirSync(srcPath)
    .filter(v => !v.includes('.'))
    .sort((name1, name2) => parseFloat(name1) - parseFloat(name2));
  for (const dir of dirList) {
    const dirPath = `${srcPath}/${dir}`;
    const fileList = fs.readdirSync(dirPath).sort((name1, name2) => {
      let startIndex = 0;
      if (name1.startsWith(HADER_LCP) && name2.startsWith(HADER_LCP)) {
        startIndex = HADER_LCP.length;
      } else if (name1.startsWith(HADER_OFFER) && name2.startsWith(HADER_OFFER)) {
        startIndex = HADER_OFFER.length;
      } else if (name1.startsWith(HADER_FACE) && name2.startsWith(HADER_FACE)) {
        startIndex = HADER_FACE.length;
      }
      return parseFloat(name1.substr(startIndex)) - parseFloat(name2.substr(startIndex));
    });
    for (const file of fileList) {
      const filePath = `${dirPath}/${file}`;
      template = fs.readFileSync(filePath).toString();
      fileCount++;
      solutionCount += getLastSolutionIdx(template);
      analysisIndex();
      analysisTag();
      analysisDifficulty();
    }
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
        let path = pathMap[solution];
        if (!path) {
          path = pathMap[solution] = `- [${solution}](${name}/${solution.substr(
            0,
            solution.lastIndexOf('.')
          )})\n`;
        }
        res += path;
      }
    }
  }
  return res;
};

const analysisIndex = () => {
  if (!indexReg.test(template)) return;
  fileName = trimBlank(RegExp.$1);
  let dirName = '';
  if (fileName.startsWith(HADER_LCP)) {
    dirName = HADER_LCP;
  } else if (fileName.startsWith(HADER_OFFER)) {
    dirName = HADER_OFFER;
  } else if (fileName.startsWith(HADER_FACE)) {
    dirName = HADER_FACE;
  } else {
    dirName = getNumDirName(fileName);
  }
  let obj: SolutionList | undefined = indexCache.find(v => v.name.startsWith(dirName));
  if (!obj) indexCache.push((obj = { name: dirName, solutions: [] }));
  obj.solutions.push(fileName);
};
const analysisTag = () => {
  if (!tagReg.test(template)) return;
  const name = trimBlank(RegExp.$1);
  if (!name) return;
  const tagList = name.split('、');
  for (const tag of tagList) {
    let obj: SolutionList | undefined = tagCache.find(v => v.name.startsWith(tag));
    if (!obj) tagCache.push((obj = { name: tag, solutions: [] }));
    obj.solutions.push(fileName);
  }
};
const analysisDifficulty = () => {
  if (!difReg.test(template)) return;
  const name = trimBlank(RegExp.$1);
  let obj: SolutionList | undefined = difficultyCache.find(v => v.name.startsWith(name));
  if (!obj) difficultyCache.push((obj = { name: name, solutions: [] }));
  obj.solutions.push(fileName);
};

main();
