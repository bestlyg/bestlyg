import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '464. 我能赢吗',
  url: 'https://leetcode.cn/problems/find-right-interval/',
  difficulty: Difficulty.中等,
  tag: [Tag.数组, Tag.二分查找, Tag.排序],
  desc: `返回一个由每个区间 i 的 右侧区间 的最小起始位置组成的数组。如果某个区间 i 不存在对应的 右侧区间 ，则下标 i 处的值设为 -1 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 856,
      memory: 85.7,
      desc: 'dfs,记忆化，当前人赢的时候说明下一层级需要输',
      code: `class Solution {
   public:
    int maxChoosableInteger, desiredTotal, maxBit;
    unordered_map<int, bool> m;
    bool canIWin(int maxChoosableInteger, int desiredTotal) {
        if ((1 + maxChoosableInteger) * maxChoosableInteger / 2 < desiredTotal)
            return false;
        this->maxBit = 1 << maxChoosableInteger;
        this->maxChoosableInteger = maxChoosableInteger;
        this->desiredTotal = desiredTotal;
        return dfs(0, 0);
    }
    bool dfs(int used, int sum) {
        if (m.count(used)) return m[used];
        if (sum >= desiredTotal) return m[used] = true;
        if (check(used, sum)) return m[used] = true;
        int ans = false;
        for (int i = 1; i <= maxChoosableInteger; i++) {
            int bit = 1 << i;
            if (used & bit) continue;
            ans = ans || !dfs(used | bit, sum + i);
        }
        return m[used] = ans;
    }
    bool check(int used, int sum) {
        int num = desiredTotal - sum;
        if (num > maxChoosableInteger) return false;
        for (int i = num; i <= maxChoosableInteger; i++) {
            int bit = 1 << i;
            if (!(used & bit)) return true;
        }
        return false;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
