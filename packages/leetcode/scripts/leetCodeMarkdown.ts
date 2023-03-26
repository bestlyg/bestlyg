import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '2395. 和相等的子数组',
  url: 'https://leetcode.cn/problems/find-subarrays-with-equal-sum/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `给你一个下标从 0 开始的整数数组 nums ，判断是否存在 两个 长度为 2 的子数组且它们的 和 相等。注意，这两个子数组起始位置的下标必须 不相同 。如果这样的子数组存在，请返回 true，否则返回 false 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 4,
      memory: 7.6,
      desc: '遍历',
      code: `class Solution {
public:
    bool findSubarrays(vector<int>& nums) {
        unordered_set<int> s;
        for (int i = 1; i < nums.size(); i++) {
            int num = nums[i] + nums[i - 1];
            if (s.count(num)) return true;
            s.insert(num);
        }
        return false;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 72,
      memory: 29.8,
      desc: '同上',
      code: `cclass Solution:
    def findSubarrays(self, nums: List[int]) -> bool:
        s = set()
        for i in range(1, len(nums)):
            num = nums[i] + nums[i - 1]
            if num in s:
                return True
            s.add(num)
        return False`,
    },
    {
      script: Script.RUST,
      time: 0,
      memory: 2.1,
      desc: '同上',
      code: `impl Solution {
    pub fn find_subarrays(nums: Vec<i32>) -> bool {
        let mut s = std::collections::HashSet::<i32>::new();
        for i in 1..nums.len() {
            let num = nums[i] + nums[i - 1];
            if s.contains(&num) {
                return true;
            }
            s.insert(num);
        }
        false
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
