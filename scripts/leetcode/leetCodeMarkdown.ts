import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '875. 爱吃香蕉的珂珂',
  url: 'https://leetcode.cn/problems/koko-eating-bananas/',
  difficulty: Difficulty.中等,
  tag: [Tag.数组, Tag.二分查找],
  desc: `返回她可以在 h 小时内吃掉所有香蕉的最小速度 k（k 为整数）。`,
  solutions: [
    {
      script: Script.TS,
      time: 52,
      memory: 18.2,
      desc: 'bs',
      code: `class Solution {
   public:
    int minEatingSpeed(vector<int>& piles, int h) {
        int nmin = 1, nmax = INT_MIN;
        for (auto& pile : piles) nmax = max(nmax, pile);
        while (nmin < nmax) {
            int m = (nmin + nmax) >> 1;
            int c = check(piles, m);
            if (c > h)
                nmin = m + 1;
            else
                nmax = m;
        }
        return nmin;
    }
    int check(vector<int>& piles, int target) {
        int ans = 0;
        for (auto pile : piles) {
            ans += pile / target;
            if (pile % target) ans += 1;
        }
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
