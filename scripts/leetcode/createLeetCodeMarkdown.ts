import { leetcode, trimBlank, resolve, fs, dayjs, specStr } from '../utils';

const { backquote } = specStr;
const {
  LeetCodeScript: Script,
  LeetCodeDifficulty: Difficulty,
  LeetCodeTag: Tag,
  HADER_FACE,
  HADER_LCP,
  HADER_OFFER,
  getNumDirName,
  srcPath,
  solutionReg,
} = leetcode;

interface Solution {
  script: leetcode.LeetCodeScript;
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
  difficulty: leetcode.LeetCodeDifficulty;
  tag: leetcode.LeetCodeTag[];
  solutions: Solution[];
}
const md: Markdown = {
  existMarkdown: false,
  name: '1753. 移除石子的最大得分',
  url: 'https://leetcode-cn.com/problems/maximum-score-from-removing-stones/',
  difficulty: Difficulty.中等,
  tag: [Tag.数学, Tag.堆],
  desc: '给你三个整数 a 、b 和 c ，返回可以得到的 最大分数 。',
  solutions: [
    {
      script: Script.TS,
      time: 96,
      memory: 39.4,
      desc: '排序后先使bc尽可能保持一致再进行相除',
      code: `function maximumScore(a: number, b: number, c: number): number {
        if (a > b) [a, b] = [b, a];
        if (a > c) [a, c] = [c, a];
        if (b > c) [b, c] = [c, b];
        const num1 = Math.min(a, c - b);
        a -= num1;
        c -= num1;
        if (a === 0) return num1 + b;
        else return num1 + (a >> 1) + b;
      }`,
    },
  ],
};

const descFormat = (str: string) => (str.endsWith('。') ? str : str + '。');

function main() {
  md.existMarkdown ? addSolution() : addMarkdown();
}
function addMarkdown() {
  fs.writeFileSync(
    analysisPath(),
    `# ${md.name}
    
> 链接：[${md.name}](${md.url})  
> 难度：${md.difficulty}  
> 标签：${md.tag.join('、')}  
> 简介：${descFormat(md.desc)}
      
${md.solutions.map((data, index) => analysisSolution(data, index + 1)).join('\n')}
      `
  );
}
function addSolution() {
  const path = analysisPath();
  const file = fs.readFileSync(path).toString();
  const matchList = file.matchAll(solutionReg);
  let lastIndex = 0;
  for (const match of matchList) lastIndex = parseInt(match[1]);
  fs.writeFileSync(
    analysisPath(),
    file +
      md.solutions.map((data, index) => analysisSolution(data, index + 1 + lastIndex)).join('\n')
  );
}
function analysisPath() {
  const name = trimBlank(md.name);
  let path = '';
  if (name.startsWith(HADER_FACE)) {
    path = HADER_FACE;
  } else if (name.startsWith(HADER_LCP)) {
    path = HADER_LCP;
  } else if (name.startsWith(HADER_OFFER)) {
    path = HADER_OFFER;
  } else {
    path = getNumDirName(name);
  }
  const dirPath = resolve(srcPath, path);
  fs.ensureDirSync(dirPath);
  path = resolve(dirPath, name + '.md');
  return path;
}
function analysisSolution({ script, time, memory, desc, code }: Solution, index: number) {
  return `## 题解 ${index} - ${script}
- 编辑时间：${dayjs().format('YYYY.MM.DD')}
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
