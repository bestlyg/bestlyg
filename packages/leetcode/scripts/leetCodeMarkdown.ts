import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1590. 使数组和能被 P 整除',
  url: 'https://leetcode.cn/problems/make-sum-divisible-by-p//',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `给你一个正整数数组 nums，请你移除 最短 子数组（可以为 空），使得剩余元素的 和 能被 p 整除。 不允许 将整个数组都移除。请你返回你需要移除的最短子数组的长度，如果无法满足题目要求，返回 -1 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 152,
      memory: 65,
      desc: '前缀和，如果sum%p=x, 那么(f[i+1]-f[j])%p=x才可以求得值',
      code: `class Solution {
public:
    int minSubarray(vector<int>& nums, int p) {
        unordered_map<int, int> m;
        m[0] = -1;
        int n = nums.size(), cur = 0, res = n, sum = 0;
        for (auto &num : nums) sum = (sum + num) % p;
        if (sum == 0) return 0;
        for (int i = 0; i < n; i++) {
            cur = (cur + nums[i]) % p;
            if (m.count((cur - sum + p) % p)) res = min(res, i - m[(cur - sum + p) % p]);
            m[cur] = i;
        }
        return res == n ? -1 : res;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 128,
      memory: 35.5,
      desc: '同上',
      code: `class Solution:
    def minSubarray(self, nums: List[int], p: int) -> int:
        m = dict()
        m[0] = -1
        n, cur, res, sums = len(nums), 0, 0x3f3f3f3f, sum(nums) % p
        if sums == 0:
            return 0
        for i in range(n):
            cur = (cur + nums[i]) % p
            if (cur - sums + p) % p in m:
                res = min(res, i - m[(cur - sums + p) % p])
            m[cur] = i
        return res if res != n else -1`,
    },
    {
      script: Script.RUST,
      time: 28,
      memory: 4.7,
      desc: '同上',
      code: `impl Solution {
    pub fn min_subarray(nums: Vec<i32>, p: i32) -> i32 {
        let mut m = std::collections::HashMap::<i32, i32>::new();
        m.insert(0, -1);
        let (n, mut cur, mut sums) = (nums.len(), 0, 0);
        let mut res = n as i32;
        for num in nums.iter() {
            sums = (sums + num) % p;
        }
        if sums == 0 {
            0
        } else {
            for i in 0..n {
                cur = (cur + nums[i]) % p;
                let target = (cur - sums + p) % p;
                if m.contains_key(&target) {
                    res = res.min(i as i32 - m.get(&target).unwrap());
                }
                m.insert(cur, i as i32);
            }
            if res == n as i32 {
                -1
            } else {
                res
            }
        }
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
