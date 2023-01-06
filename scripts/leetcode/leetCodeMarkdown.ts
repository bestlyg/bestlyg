import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '2180. 统计各位数字之和为偶数的整数个数',
  url: '/leetcode.cn/problems/count-integers-with-even-digit-sum/',
  difficulty: Difficulty.简单,
  tag: [Tag.数学, Tag.模拟],
  desc: `给你一个正整数 num ，请你统计并返回 小于或等于 num 且各位数字之和为 偶数 的正整数的数目。`,
  solutions: [
    {
      script: Script.CPP,
      time: 4,
      memory: 5.8,
      desc: 'dfs',
      code: `class Solution {
public:
    int countEven(int num) {
        function<int(int, int)> dfs = [&](int cur, int sum) -> int {
            if (cur > num) return 0;
            int ans = !(sum & 1);
            for (int i = 0; i <= 9; i++) {
                if (cur * 10 + i == cur) continue;
                ans += dfs(cur * 10 + i, sum + i);
            }
            return ans;
        };
        return dfs(0, 0) - 1;
    }
};`,
    },
    {
      script: Script.RUST,
      time: 0,
      memory: 1.9,
      desc: '同上',
      code: `impl Solution {
    pub fn count_even(num: i32) -> i32 {
        return Solution::dfs(num, 0, 0) - 1;
    }
    fn dfs(num: i32, cur: i32, sum: i32) -> i32 {
        if cur > num {
            0
        } else {
            let mut ans = if sum % 2 == 0 { 1 } else { 0 };
            for i in 0..=9 {
                if cur * 10 + i == cur {
                    continue;
                }
                ans += Solution::dfs(num, cur * 10 + i, sum + i);
            }
            ans
        }
    }
}`,
    },
    {
      script: Script.TS,
      time: 92,
      memory: 48.3,
      desc: '遍历',
      code: `function countEven(num: number): number {
        return new Array(num).fill(0).map((_, i) => (i + 1).toString().split('').map(v => +v).reduce((sum, cur) => sum + cur, 0)).reduce((sum, cur) => sum + Number(cur % 2 == 0), 0)
    };`,
    },
  ],
};

export default leetCodeMarkdown;
