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
    name: '629. K个逆序对数组',
    url: 'https://leetcode-cn.com/problems/k-inverse-pairs-array/',
    difficulty: Difficulty.困难,
    tag: [Tag.动态规划],
    desc: `给出两个整数 n 和 k，找出所有包含从 1 到 n 的数字，且恰好拥有 k 个逆序对的不同的数组的个数。`,
    solutions: [
      {
        script: Script.TS,
        time: 5508,
        memory: 45.3,
        desc: '动态规划',
        code: `function kInversePairs(n: number, k: number): number {
          if (k === 0) return 1;
          const MOD = 10 ** 9 + 7;
          const dp: Map<number, number>[] = new Array(2).fill(0).map(_ => new Map());
          dp[0].set(0, 1);
          for (let i = 1; i < n; i++) {
            const map = dp[i % 2];
            map.clear();
            for (const [num, cnt] of dp[(i - 1) % 2].entries()) {
              for (let j = 0; j <= i; j++) {
                if (num + j > k) break;
                const cur = map.get(num + j) ?? 0;
                map.set(num + j, (cur + cnt) % MOD);
              }
            }
          }
          return dp[(n - 1) % 2].get(k) ?? 0;
        }`,
      },
    ],
  },
];
