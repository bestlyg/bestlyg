import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1250. 检查「好数组」',
  url: 'https://leetcode.cn/problems/check-if-it-is-a-good-array/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `给你一个正整数数组 nums，你需要从中任选一些子集，然后将子集中每一个数乘以一个 任意整数，并求出他们的和。假如该和结果为 1，那么原数组就是一个「好数组」，则返回 True；否则请返回 False。`,
  solutions: [
    {
      script: Script.CPP,
      time: 44,
      memory: 28.5,
      desc: '裴蜀定理',
      code: `class Solution {
public:
    int gcd(int a, int b) {
        if (!b) return a;
        if (a < b) return gcd(b, a);
        return gcd(b, a % b);
    }
    bool isGoodArray(vector<int>& nums) {
        int res = nums[0];
        for (auto &num : nums) {
            res = gcd(res, num);
            if (res == 1) break;
        }
        return res == 1;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 92,
      memory: 22.7,
      desc: '同上',
      code: `class Solution:
    def isGoodArray(self, nums: List[int]) -> bool:
        def gcd(a, b):
            if not b:
                return a
            if a < b:
                return gcd(b, a)
            return gcd(b, a % b)
        res = nums[0]
        for num in nums:
            res = gcd(res, num)
            if res == 1:
                break
        return res == 1`,
    },
    {
      script: Script.RUST,
      time: 4,
      memory:3.4,
      desc: '同上',
      code: `fn gcd(a: i32, b: i32) -> i32 {
    if b == 0 {
        a
    } else if a < b {
        gcd(b, a)
    } else {
        gcd(b, a % b)
    }
}

impl Solution {
    pub fn is_good_array(nums: Vec<i32>) -> bool {
        let mut res = nums[0];
        for num in nums {
            res = gcd(res, num);
            if res == 1 {
                break;
            }
        }
        res == 1
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;

