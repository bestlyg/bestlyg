import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '2367. 算术三元组的数目',
  url: 'https://leetcode.cn/problems/number-of-arithmetic-triplets/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `给你一个下标从 0 开始、严格递增 的整数数组 nums 和一个正整数 diff 。返回不同 算术三元组 的数目。`,
  solutions: [
    {
      script: Script.CPP,
      time: 4,
      memory: 9.3,
      desc: '哈希表+遍历',
      code: `class Solution {
public:
    int arithmeticTriplets(vector<int>& nums, int diff) {
        unordered_map<int, int> m1, m2;
        int res = 0;
        for (auto &num : nums) {
            res += m2[num - diff];
            m2[num] += m1[num - diff];
            m1[num] += 1;
        }
        return res;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 44,
      memory: 14.9,
      desc: '同上',
      code: `class Solution:
    def arithmeticTriplets(self, nums: List[int], diff: int) -> int:
        m1, m2 = Counter(), Counter()
        res = 0
        for num in nums:
            res += m2[num-diff]
            m2[num] += m1[num-diff]
            m1[num] += 1
        return res`,
    },
    {
      script: Script.RUST,
      time: 0,
      memory: 2.1,
      desc: '同上',
      code: `impl Solution {
    pub fn arithmetic_triplets(nums: Vec<i32>, diff: i32) -> i32 {
        use std::collections::HashMap;
        let (mut m1, mut m2) = (HashMap::<i32, i32>::new(), HashMap::<i32, i32>::new());
        let mut res = 0;
        for num in nums {
            res += *m2.entry(num - diff).or_insert(0);
            *m2.entry(num).or_insert(0) += *m1.entry(num - diff).or_insert(0);
            *m1.entry(num).or_insert(0) += 1;
        }
        res
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
