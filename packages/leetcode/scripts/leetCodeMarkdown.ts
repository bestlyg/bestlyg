import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1043. 分隔数组以得到最大和',
  url: 'https://leetcode.cn/problems/partition-array-for-maximum-sum/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `给你一个整数数组 arr，请你将该数组分隔为长度 最多 为 k 的一些（连续）子数组。分隔完成后，每个子数组的中的所有值都会变为该子数组中的最大值。`,
  solutions: [
    {
      script: Script.CPP,
      time: 4,
      memory:8.3,
      desc: 'dp[i]表示前i个元素能分割成的最大值',
      code: `class Solution {
    public:
        int maxSumAfterPartitioning(vector<int>& arr, int k) {
            int n = arr.size();
            vector<int> dp(n + 1, 0);
            int nmax = arr[0];
            for (int i = 1; i <= k; i++) {
                nmax = max(nmax, arr[i - 1]);
                dp[i] = nmax * i;
            }
            for (int i = k + 1; i <= n; i++) {
                nmax = arr[i - 1];
                for (int j = i; i - j + 1 <= k; j--) {
                    nmax = max(nmax, arr[j - 1]);
                    dp[i] = max(dp[i], dp[j - 1] + nmax * (i - j + 1));
                }   
            }
            return dp[n];
        }
    };`,
    },
    {
      script: Script.PY3,
      time: 212,
      memory: 15.1,
      desc: '同上',
      code: `class Solution:
    def maxSumAfterPartitioning(self, arr: List[int], k: int) -> int:
        n = len(arr)
        dp = [0] * (n+1)
        nmax = arr[0]
        for i in range(1, k+1):
            nmax = max(nmax, arr[i-1])
            dp[i] = nmax * i
        for i in range(k+1, n+1):
            nmax = arr[i-1]
            j = i
            while i-j+1 <= k:
                nmax = max(nmax, arr[j-1])
                dp[i] = max(dp[i], dp[j-1]+nmax*(i-j+1))
                j -= 1
        return dp[n]`,
    },
    {
      script: Script.RUST,
      time: 0,
      memory: 2,
      desc: '同上',
      code: `impl Solution {
    pub fn max_sum_after_partitioning(arr: Vec<i32>, k: i32) -> i32 {
        use std::cmp::max;
        let n = arr.len();
        let k = k as usize;
        let mut dp = vec![0; n + 1];
        let mut nmax = arr[0];
        for i in 1..=k {
            nmax = max(nmax, arr[i - 1]);
            dp[i] = nmax * (i as i32);
        }
        for i in k + 1..=n {
            nmax = arr[i - 1];
            let mut j = i;
            while i - j + 1 <= k {
                nmax = max(nmax, arr[j - 1]);
                dp[i] = max(dp[i], dp[j - 1] + nmax * (i - j + 1) as i32);
                j -= 1
            }
        }
        dp[n]
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
