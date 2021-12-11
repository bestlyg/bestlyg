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
    name: '911. 在线选举',
    url: 'https://leetcode-cn.com/problems/online-election/',
    difficulty: Difficulty.中等,
    tag: [Tag.设计, Tag.数组, Tag.哈希表, Tag.二分查找],
    desc: `给你两个整数数组 persons 和 times 。在选举中，第 i 张票是在时刻为 times[i] 时投给候选人 persons[i] 的。对于发生在时刻 t 的每个查询，需要找出在 t 时刻在选举中领先的候选人的编号。`,
    solutions: [
      {
        script: Script.TS,
        time: 292,
        memory: 51.5,
        desc: '初始化时记录每个时刻的获胜人数，遍历用二分',
        code: `class TopVotedCandidate {
          arr: number[] = [];
          constructor(persons: number[], private times: number[]) {
            const n = persons.length;
            const temp = new Array(n).fill(0);
            let max = 0;
            for (const person of persons) {
              if (++temp[person] >= temp[max]) max = person;
              this.arr.push(max);
            }
          }
          q(t: number): number {
            let l = 0;
            let r = this.times.length - 1;
            while (l < r) {
              const mid = (l + r + 1) >> 1;
              if (this.times[mid] <= t) l = mid;
              else r = mid - 1;
            }
            return this.arr[l];
          }
        }`,
      },
    ],
  },
];
