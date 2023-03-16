import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '2488. 统计中位数为 K 的子数组',
  url: 'https://leetcode.cn/problems/maximal-network-rank///',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `给你整数 n 和数组 roads，返回整个基础设施网络的 最大网络秩 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 76,
      memory: 51.4,
      desc: '遍历，对于每个值判断前面可取值，并存入map',
      code: `class Solution {
public:
    int countSubarrays(vector<int>& nums, int k) {
        unordered_map<int, int> m;
        int res = 0, cur = 0;
        bool findK = false;
        for (auto &num : nums) {
            if (num > k) cur += 1;
            else if (num < k) cur -= 1;
            if (num == k) findK = true;
            if (findK) res += m[cur] + m[cur - 1] + (cur == 0 || cur == 1);
            else m[cur]++;
        }
        return res;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 120,
      memory: 16.7,
      desc: '同上',
      code: `class Solution:
    def maximalNetworkRank(self, n: int, roads: List[List[int]]) -> int:
        l = [set() for _ in range(n)]
        for [n1, n2] in roads:
            l[n1].add(n2)
            l[n2].add(n1)
        res = 0
        for i in range(n):
            for j in range(n):
                if i != j:
                    res = max(res, len(l[i]) + len(l[j]) + (-1 if j in l[i] else 0))
        return res`,
    },
    {
      script: Script.RUST,
      time: 16,
      memory: 3.2,
      desc: '同上',
      code: `impl Solution {
    pub fn count_subarrays(nums: Vec<i32>, k: i32) -> i32 {
        let mut m = std::collections::HashMap::<i32, i32>::new();
        let (mut res, mut cur, mut find_k) = (0, 0, false);
        for num in nums {
            if num > k {
                cur += 1;
            } else if num < k {
                cur -= 1;
            } else {
                find_k = true;
            }
            if find_k {
                res += *m.get(&cur).unwrap_or(&0)
                    + *m.get(&(cur - 1)).unwrap_or(&0)
                    + ((cur == 0 || cur == 1) as i32);
            } else {
                *m.entry(cur).or_insert(0) += 1;
            }
        }
        res
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
