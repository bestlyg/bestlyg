import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '2389. 和有限的最长子序列',
  url: 'https://leetcode.cn/problems/longest-subsequence-with-limited-sum////',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `返回一个长度为 m 的数组 answer ，其中 answer[i] 是 nums 中 元素之和小于等于 queries[i] 的 子序列 的 最大 长度  。`,
  solutions: [
    {
      script: Script.TS,
      time: 72,
      memory: 44.4,
      desc: '排序后遍历',
      code: `function answerQueries(nums: number[], queries: number[]): number[] {
        nums.sort((a, b) => a - b);
        return queries.map(num => {
          let i = 0;
          let cur = 0;
          while (i < nums.length && cur + nums[i] <= num) cur += nums[i++];
          return i;
        });
      }`,
    },
    {
      script: Script.CPP,
      time: 20,
      memory: 13.3,
      desc: '排序后遍历',
      code: `class Solution {
public:
    vector<int> answerQueries(vector<int>& nums, vector<int>& queries) {
        int n = nums.size(), m = queries.size();
        vector<int> idxs(m), res(m, 0);
        for (int i = 0; i < m; i++) idxs[i] = i;
        sort(idxs.begin(), idxs.end(), [&](auto &a, auto &b){
            return queries[a] < queries[b];
        });
        sort(nums.begin(), nums.end());
        int idx = 0, sum = 0;
        for (int i = 0; i < m; i++) {
            while (idx < n && sum + nums[idx] <= queries[idxs[i]]) sum += nums[idx++];
            res[idxs[i]] = idx;
        }
        return res;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 48,
      memory: 15.1,
      desc: '同上',
      code: `class Solution:
    def answerQueries(self, nums: List[int], queries: List[int]) -> List[int]:
        n, m = len(nums), len(queries)
        idxs = [i for i in range(m)]
        idxs.sort(key=lambda v: queries[v])
        res = [0 for i in range(m)]
        nums.sort()
        idx, sums = 0, 0
        for i in range(m):
            while idx < n and sums + nums[idx] <= queries[idxs[i]]:
                sums += nums[idx]
                idx += 1
            res[idxs[i]] = idx
        return res`,
    },
    {
      script: Script.RUST,
      time: 4,
      memory: 2.1,
      desc: '同上',
      code: `impl Solution {
    pub fn answer_queries(mut nums: Vec<i32>, queries: Vec<i32>) -> Vec<i32> {
        nums.sort();
        let (n, m) = (nums.len(), queries.len());
        let mut idxs = (0..m).collect::<Vec<usize>>();
        idxs.sort_by(|v1, v2| queries[*v1].cmp(&queries[*v2]));
        let mut res = (0..m).map(|v| v as i32).collect::<Vec<i32>>();
        let (mut idx, mut sum) = (0, 0);
        for i in 0..m {
            while idx < n && sum + nums[idx] <= queries[idxs[i]] {
                sum += nums[idx];
                idx += 1;
            }
            res[idxs[i]] = idx as i32;
        }
        res
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
