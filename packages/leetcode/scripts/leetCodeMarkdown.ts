import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '2357. 使数组中所有元素都等于零',
  url: 'https://leetcode.cn/problems/make-array-zero-by-subtracting-equal-amounts/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `返回使 nums 中所有元素都等于 0 需要的 最少 操作数。`,
  solutions: [
    {
      script: Script.CPP,
      time: 4,
      memory: 8.3,
      desc: '哈希存储',
      code: `class Solution {
public:
    int minimumOperations(vector<int>& nums) {
        unordered_set<int> s(nums.begin(), nums.end());
        return s.size() - (s.count(0));
    }
};`,
    },
    {
      script: Script.PY3,
      time: 32,
      memory: 14.9,
      desc: '同上',
      code: `class Solution:
    def minimumOperations(self, nums: List[int]) -> int:
        return len(set(nums) - {0})`,
    },
    {
      script: Script.RUST,
      time: 0,
      memory: 2.3,
      desc: '同上',
      code: `impl Solution {
    pub fn minimum_operations(nums: Vec<i32>) -> i32 {
        let mut s = std::collections::HashSet::<i32>::new();
        for num in nums {
            s.insert(num);
        }
        return s.len() as i32 - if s.contains(&0) { 1 } else { 0 };
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
