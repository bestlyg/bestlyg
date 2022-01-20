import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '2029. 石子游戏 IX',
  url: 'https://leetcode-cn.com/problems/stone-game-ix/',
  difficulty: Difficulty.中等,
  tag: [Tag.贪心, Tag.数组, Tag.数学, Tag.计数, Tag.博弈],
  desc: `Alice 和 Bob 再次设计了一款新的石子游戏。假设两位玩家均采用 最佳 决策。如果 Alice 获胜，返回 true ；如果 Bob 获胜，返回 false 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 140,
      memory: 124.2,
      desc: '把所有数模3取值，分别判断当有偶数个0和奇数个0的情况下必胜条件',
      code: `class Solution {
   public:
    bool stoneGameIX(vector<int>& stones) {
        int cnts[3] = {0};
        for (auto& num : stones) cnts[num % 3]++;
        return cnts[0] % 2 == 0 ? cnts[1] >= 1 && cnts[2] >= 1
                                : abs(cnts[2] - cnts[1]) >= 3;
    }
};`,
    },
    {
      script: Script.TS,
      time: 112,
      memory: 52.6,
      desc: '同上',
      code: `function stoneGameIX(stones: number[]): boolean {
        const cnts :number[]=new Array(3).fill(0)
        for (const num of stones) cnts[num%3] ++;
               return cnts[0] % 2 == 0 ? cnts[1] * cnts[2] >= 1
                                        : Math.abs(cnts[2] - cnts[1]) >= 3;
        };`,
    },
  ],
};
export default leetCodeMarkdown;
