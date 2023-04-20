import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1187. 使数组严格递增',
  url: 'https://leetcode.cn/problems/make-array-strictly-increasing/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `给你两个整数数组 arr1 和 arr2，返回使 arr1 严格递增所需要的最小「操作」数（可能为 0）。每一步「操作」中，你可以分别从 arr1 和 arr2 中各选出一个索引，分别为 i 和 j，0 <= i < arr1.length 和 0 <= j < arr2.length，然后进行赋值运算 arr1[i] = arr2[j]。如果无法让 arr1 严格递增，请返回 -1。`,
  solutions: [
    {
      script: Script.CPP,
      time: 604,
      memory:71.1,
      desc: 'dfs，每次记录当前下标和上一个值，如果当前值替换，应该换成最大可换的值',
      code: `class Solution {
    public:
        int makeArrayIncreasing(vector<int>& arr1, vector<int>& arr2) {
            set<int> s;
            for (auto &num : arr2) s.insert(num);
            unordered_map<int, unordered_map<int, int>> m;
            function<int(int, int)> dfs = [&](int idx, int pre) -> int {
                if (m[idx].count(pre)) return m[idx][pre];
                if (idx == - 1) return m[idx][pre] = 0;
                int res = INT_MAX;
                if (arr1[idx] < pre) res = dfs(idx - 1, arr1[idx]);
                auto find = s.lower_bound(pre);
                if (find != s.begin()) {
                    int next = dfs(idx - 1, *(--find));
                    if (next != INT_MAX)
                    res = min(res, 1 + next);
                }
                return m[idx][pre] = res;
            };
            int res = dfs(arr1.size() - 1, INT_MAX);
            return res == INT_MAX ? -1 : res;
        }
    };`,
    },
    {
      script: Script.PY3,
      time: 724,
      memory: 131.3,
      desc: '同上',
      code: `class Solution:
    def makeArrayIncreasing(self, arr1: List[int], arr2: List[int]) -> int:
        arr2.sort()

        @cache
        def dfs(idx: int, pre: int) -> int:
            if idx == -1:
                return 0
            res = inf
            if arr1[idx] < pre:
                res = dfs(idx-1, arr1[idx])
            find = bisect_left(arr2, pre)
            if find > 0:
                res = min(res, dfs(idx-1, arr2[find - 1]) + 1)
            return res
        res = dfs(len(arr1) - 1, inf)
        return res if res != inf else -1`,
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
