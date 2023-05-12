import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1330. 翻转子数组得到最大的数组值',
  url: 'https://leetcode.cn/problems/reverse-subarray-to-maximize-array-value/',
  difficulty: Difficulty.简单,
  tag: [],
  desc: `给你一个整数数组 nums 。「数组值」定义为所有满足 0 <= i < nums.length-1 的 |nums[i]-nums[i+1]| 的和。`,
  solutions: [
    //     {
    //       script: Script.TS,
    //       time: 28,
    //       memory: 11.7,
    //       desc: '对于s统计所有出现的数字',
    //       code: `class Solution {
    // public:
    //     bool queryString(string s, int n) {
    //         unordered_set<int> sset;
    //         int len = s.size();
    //         for (int i = 0; i < len; i++) {
    //             int num = 0;
    //             for (int j = i; j < len && j - i + 1 < 32; j++) {
    //                 num = (num << 1) | (s[j] - '0');
    //                 sset.insert(num);
    //             }
    //         }
    //         for (int i = 1; i <= n; i++) {
    //             if (!sset.count(i)) return false;
    //         }
    //         return true;
    //     }
    // };`,
    //     },
    {
      script: Script.CPP,
      time: 84,
      memory: 39.3,
      desc: 'https://leetcode.cn/problems/reverse-subarray-to-maximize-array-value/solution/bu-hui-hua-jian-qing-kan-zhe-pythonjavac-c2s6/',
      code: `class Solution {
public:
    int maxValueAfterReverse(vector<int>& nums) {
        int n = nums.size(), sums = 0, nmax = INT_MIN, nmin = INT_MAX, val = 0;
        for (int i = 1; i < n; i++) {
            int num = abs(nums[i] - nums[i - 1]);
            sums += num;
            nmax = max(nmax, min(nums[i], nums[i - 1]));
            nmin = min(nmin, max(nums[i], nums[i - 1]));
            val = max(val, max(abs(nums[i] - nums[0]), abs(nums[i - 1] - nums[n - 1])) - num);
        }
        return sums + max(val, 2 * (nmax - nmin));
    }
};`,
    },
    {
      script: Script.PY3,
      time: 328,
      memory: 19.6,
      desc: '同上',
      code: `class Solution:
def maxValueAfterReverse(self, nums: List[int]) -> int:
    n = len(nums)
    sums = 0
    nmax = -inf
    nmin = inf
    val = 0
    for i in range(1, n):
        num = abs(nums[i] - nums[i - 1])
        sums += num
        nmax = max(nmax, min(nums[i], nums[i - 1]))
        nmin = min(nmin, max(nums[i], nums[i - 1]))
        val = max(val, max(abs(nums[i] - nums[0]), abs(nums[i - 1] - nums[n - 1])) - num)
    return sums + max(val, 2 * (nmax - nmin))`,
    },
    {
      script: Script.RUST,
      time: 8,
      memory: 2.3,
      desc: '同上',
      code: `impl Solution {
    pub fn max_value_after_reverse(nums: Vec<i32>) -> i32 {
        use std::cmp::{max, min};
        let n = nums.len();
        let mut sums = 0;
        let mut nmax = i32::MIN;
        let mut nmin = i32::MAX;
        let mut val = 0;
        for i in 1..n {
            let num = (nums[i] - nums[i - 1]).abs();
            sums += num;
            nmax = max(nmax, min(nums[i], nums[i - 1]));
            nmin = min(nmin, max(nums[i], nums[i - 1]));
            val = max(
                val,
                max((nums[i] - nums[0]).abs(), (nums[i - 1] - nums[n - 1]).abs()) - num,
            );
        }
        sums + max(val, 2 * (nmax - nmin))
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
