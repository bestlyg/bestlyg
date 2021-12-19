import { leetcode, markdown, specStr } from './utils';
const { backquote } = specStr;
const { Script, Difficulty, Tag } = leetcode;
const { link } = markdown;
type Script = leetcode.Script;
type Difficulty = leetcode.Difficulty;
type Tag = leetcode.Tag;
type Solution = leetcode.Solution;
type Markdown = leetcode.Markdown;
export const leetCodeMarkdowns: Markdown[] = [
  {
    existMarkdown: !true,
    name: '997. 找到小镇的法官',
    url: 'https://leetcode-cn.com/problems/find-the-town-judge/',
    difficulty: Difficulty.简单,
    tag: [Tag.图, Tag.数组, Tag.哈希表],
    desc: `如果小镇存在秘密法官并且可以确定他的身份，请返回该法官的编号。否则，返回 -1。`,
    solutions: [
      {
        script: Script.TS,
        time: 112,
        memory: 46.8,
        desc: '统计每个人是否都有n-1个人相信且没有相信别人',
        code: `class Person {
          parent: number = 0;
          children: number = 0;
          constructor(public idx: number) {}
        }
        function findJudge(n: number, trust: number[][]): number {
          const persons = new Array(n).fill(0).map((_, i) => new Person(i + 1));
          for (const [i1, i2] of trust) {
            persons[i1 - 1].parent++
            persons[i2 - 1].children++;
          }
          return persons.find(p => p.children === n - 1 && p.parent === 0)?.idx ?? -1;
        }
        `,
      },
    ],
  },
];
