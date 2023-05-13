import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '2441. 与对应负数同时存在的最大正整数',
  url: 'https://leetcode.cn/problems/largest-positive-integer-that-exists-with-its-negative/',
  difficulty: Difficulty.简单,
  tag: [],
  desc: `给你一个 不包含 任何零的整数数组 nums ，找出自身与对应的负数都在数组中存在的最大正整数 k 。返回正整数 k ，如果不存在这样的整数，返回 -1 。`,
  solutions: [
    {
      script: Script.TS,
      time: 76,
      memory: 45.9,
      desc: '哈希存储',
      code: `function findMaxK(nums: number[]): number {
    const set1 = new Set<number>();
    const set2 = new Set<number>();
    for (const num of nums) {
        if (set1.has(-num)) set2.add(Math.abs(num));
        set1.add(num);
    }
    return [...set2].sort((a, b) => b - a)[0] ?? -1;
}`,
      date: new Date('2022/10/16').getTime(),
    },
    {
      script: Script.CPP,
      time: 16,
      memory: 19.2,
      desc: '数组存储',
      code: `class Solution {
public:
    int findMaxK(vector<int>& nums) {
        int list[2005] = {0}, res = -1;
        for (auto &num : nums) {
            list[num + 1000] += 1;
            if (list[-num + 1000]) res = max(res, abs(num));
        }
        return res;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 76,
      memory: 16.2,
      desc: '同上',
      code: `class Solution:
    def findMaxK(self, nums: List[int]) -> int:
        list = [0] * 2005
        res = -1
        for num in nums:
            list[num + 1000] += 1
            if list[-num + 1000]:
                res = max(res, abs(num))
        return res`,
    },
    {
      script: Script.RUST,
      time: 4,
      memory: 2,
      desc: '同上',
      code: `impl Solution {
    pub fn find_max_k(nums: Vec<i32>) -> i32 {
        let mut list = [0; 2005];
        let mut res = -1;
        for num in nums {
            list[(num + 1000) as usize] += 1;
            if list[(-num + 1000) as usize] != 0 {
                res = res.max(num.abs());
            }
        }
        res
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
