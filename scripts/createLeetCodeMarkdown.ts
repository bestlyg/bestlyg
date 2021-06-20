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
  name: '1600. 皇位继承顺序',
  url: 'https://leetcode-cn.com/problems/throne-inheritance/',
  difficulty: Difficulty.中等,
  tag: [Tag.树, Tag.设计],
  desc:
    '一个王国里住着国王、他的孩子们、他的孙子们等等。通过以上的函数，我们总是能得到一个唯一的继承顺序。',
  solutions: [
    {
      script: Script.TS,
      time: 188,
      memory: 43.8,
      desc: '前序遍历',
      code: `class Person {
        children: Person[] = [];
        dead = false;
        constructor(public name: string) {}
      }
      class ThroneInheritance {
        king = new Person('');
        nameMap = new Map<string, Person>();
        constructor(kingName: string) {
          this.king.name = kingName;
          this.nameMap.set(kingName, this.king);
        }
        birth(parentName: string, childName: string): void {
          const parent = this.nameMap.get(parentName)!;
          const child = new Person(childName);
          this.nameMap.set(childName, child);
          parent.children.push(child);
        }
        death(name: string): void {
          this.nameMap.get(name)!.dead = true;
        }
        getInheritanceOrder(): string[] {
          return this._getInheritanceOrder(this.king)
            .filter(v => !v.dead)
            .map(v => v.name);
        }
        private _getInheritanceOrder(person: Person): Person[] {
          const ans: Person[] = [person];
          person.children.forEach(child => {
            ans.push(...this._getInheritanceOrder(child));
          });
          return ans;
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
