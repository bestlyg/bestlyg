import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '6346. 打家劫舍 IV',
  url: 'https://leetcode.cn/problems/house-robber-iv/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `给你一个下标从 0 开始的字符串数组 words 以及一个二维整数数组 queries 。返回一个整数数组，其中数组的第 i 个元素对应第 i 个查询的答案。`,
  solutions: [
    {
      script: Script.CPP,
      time: 136,
      memory: 55.6,
      desc: '结果二分+dp',
      code: `class Solution {
public:
    long long minCost(vector<int>& basket1, vector<int>& basket2) {
        unordered_map<int, int> m;
        for (auto &v : basket1) m[v]++;
        for (auto &v : basket2) m[v]--;
        vector<int> list;
        int nmin = 0x3f3f3f3f;
        for (auto &item : m) {
            if (item.second % 2 != 0) return -1;
            nmin = min(nmin, item.first);
            for (int i = 0; i < abs(item.second) / 2; i++) list.push_back(item.first);
        }
        sort(list.begin(), list.end());
        long long ans = 0;
        for (int i = 0; i < list.size() / 2; i++) ans += min(list[i], nmin * 2);
        return ans;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 740,
      memory: 22.9,
      desc: '同上',
      code: `class Solution:
    def minCapability(self, nums: List[int], k: int) -> int:
        def bs(target):
            prev1, prev2 = 0, 0
            for num in nums:
                if num <= target:
                    prev1, prev2 = prev2, max(prev1 + 1, prev2)
                else:
                    prev1 = prev2
            return prev2
        l, r = 1, max(nums)
        while l < r:
            m = (l + r) // 2
            if bs(m) >= k: r = m
            else: l = m + 1
        return l`,
    },
    {
      script: Script.RUST,
      time: 16,
      memory: 4,
      desc: '同上',
      code: `impl Solution {
    pub fn min_capability(nums: Vec<i32>, k: i32) -> i32 {
        let (mut l, mut r) = (1, 1);
        for num in nums.iter() {
            r = r.max(*num);
        }
        let bs = move |target| {
            let (mut prev1, mut prev2) = (0, 0);
            for num in nums.iter() {
                if *num <= target {
                    let tmp = prev2;
                    prev2 = prev2.max(prev1 + 1);
                    prev1 = tmp;
                } else {
                    prev1 = prev2;
                }
            }
            prev2
        };
        while l < r {
            let m = (l + r) / 2;
            if bs(m) >= k {
                r = m;
            } else {
                l = m + 1
            }
        }
        l
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
