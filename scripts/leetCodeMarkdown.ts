import { leetcode, markdown, specStr } from './utils';
const { Script, Difficulty, Tag } = leetcode;
const { link } = markdown;
const { backquote } = specStr;
type Script = leetcode.Script;
type Difficulty = leetcode.Difficulty;
type Tag = leetcode.Tag;
type Solution = leetcode.Solution;
type Markdown = leetcode.Markdown;
export const leetCodeMarkdowns: Markdown[] = [
  {
    existMarkdown: !true,
    name: '495. 提莫攻击',
    url: 'https://leetcode-cn.com/problems/teemo-attacking/',
    difficulty: Difficulty.简单,
    tag: [Tag.数组, Tag.模拟],
    desc: `返回艾希处于中毒状态的 总 秒数。`,
    solutions: [
      {
        script: Script.TS,
        time: 76,
        memory: 42.2,
        desc: '遍历',
        code: `function findPoisonedDuration(timeSeries: number[], duration: number): number {
          let ans = 0;
          for (let i = 0,n = timeSeries.length; i < n - 1; i++) {
            const time = timeSeries[i];
            const next_time = timeSeries[i + 1];
            if (time + duration - 1 >= next_time) ans += next_time - time;
            else ans += duration;
          }
          ans += duration;
          return ans;
        }`,
      },
    ],
  },
];
