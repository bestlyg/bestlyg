import { leetcode, trimBlank, resolve, fs, moment, specStr, LOGO } from './utils';

const { backquote } = specStr;
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
  name: '208. 实现 Trie (前缀树)',
  url: 'https://leetcode-cn.com/problems/implement-trie-prefix-tree/',
  difficulty: Difficulty.中等,
  tag: [Tag.设计, Tag.字典树],
  desc: '请你实现 Trie 类',
  solutions: [
    {
      script: Script.TS,
      time: 248,
      memory: 55.5,
      desc: '构建前缀树',
      code: `class Trie {
        private children = new Map<string, Trie>();
        constructor(public char = '', public end = false) {}
        insert(word: string): void {
          if (word === '') {
            this.end = true;
            return;
          }
          const first = word[0];
          let nextTrieNode = this.children.get(first);
          if (!nextTrieNode)
            this.children.set(first, (nextTrieNode = new Trie(first, word.length === 1)));
          nextTrieNode.insert(word.substr(1));
        }
        search(word: string): boolean {
          if (word === '') return this.end;
          return !!this.children.get(word[0])?.search(word.substr(1));
        }
        startsWith(prefix: string): boolean {
          if (prefix.length === 1) return this.children.has(prefix);
          return !!this.children.get(prefix[0])?.startsWith(prefix.substr(1));
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
  order: 3
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
