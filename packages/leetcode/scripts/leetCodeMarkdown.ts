import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '2404. 出现最频繁的偶数元素',
  url: 'https://leetcode.cn/problems/most-frequent-even-element/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `给你一个整数数组 nums ，返回出现最频繁的偶数元素。如果存在多个满足条件的元素，只需要返回 最小 的一个。如果不存在这样的元素，返回 -1 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 56,
      memory: 37.1,
      desc: '遍历',
      code: `class Solution {
public:
    int mostFrequentEven(vector<int>& nums) {
        unordered_map<int, int> m;
        int res = -1, nmax = -1;
        for (auto &num : nums) {
            if (num % 2 == 0) {
                m[num]++;
                if (m[num] > nmax || m[num] == nmax && num < res) res = num, nmax = m[num];
            }
        }
        return res;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 84,
      memory: 15.2,
      desc: '同上',
      code: `class Solution:
    def mostFrequentEven(self, nums: List[int]) -> int:
        m = Counter()
        res = nmax = -1
        for num in nums:
            if num % 2 == 0:
                m[num] += 1
                if m[num] > nmax or m[num] == nmax and num < res:
                    res = num
                    nmax = m[num]
        return res`,
    },
    {
      script: Script.RUST,
      time: 8,
      memory: 2.1,
      desc: '同上',
      code: `impl Solution {
    pub fn most_frequent_even(nums: Vec<i32>) -> i32 {
        let mut m = std::collections::HashMap::<i32, i32>::new();
        let mut res = -1;
        let mut nmax = -1;
        for num in nums {
            if num % 2 == 0 {
                let item = m.entry(num).or_insert(0);
                *item += 1;
                if *item > nmax || *item == nmax && num < res {
                    res = num;
                    nmax = *item;
                }
            }
        }
        res
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
