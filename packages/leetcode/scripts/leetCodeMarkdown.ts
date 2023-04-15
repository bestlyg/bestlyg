import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1042. 不邻接植花',
  url: 'https://leetcode.cn/problems/flower-planting-with-no-adjacent/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `有 n 个花园，按从 1 到 n 标记。另有数组 paths ，其中 paths[i] = [xi, yi] 描述了花园 xi 到花园 yi 的双向路径。在每个花园中，你打算种下四种花之一。另外，所有花园 最多 有 3 条路径可以进入或离开.你需要为每个花园选择一种花，使得通过路径相连的任何两个花园中的花的种类互不相同。以数组形式返回 任一 可行的方案作为答案 answer，其中 answer[i] 为在第 (i+1) 个花园中种植的花的种类。花的种类用  1、2、3、4 表示。保证存在答案。`,
  solutions: [
    {
      script: Script.CPP,
      time: 100,
      memory: 38.8,
      desc: '直接找周围还空的位置',
      code: `class Solution {
public:
    vector<int> gardenNoAdj(int n, vector<vector<int>>& paths) {
        vector<vector<int>> list(n);
        for (auto &p : paths)
            list[p[0] - 1].push_back(p[1] - 1),
            list[p[1] - 1].push_back(p[0] - 1);
        vector<int> res(n, 0);
        for (int i = 0; i < n; i++) {
            int cache[5] = {0};
            for (int next : list[i])
                if (res[next] != 0) cache[res[next]] = 1;
            for (int j = 0; j < 5; j++)
                if (cache[j] != 1) res[i] = j;
        }
        return res;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 1140,
      memory: 29.6,
      desc: '同上',
      code: `class Solution:
    def minimizeMax(self, nums: List[int], p: int) -> int:
        nums.sort()
        n = len(nums)
  
        def check(target: int) -> bool:
            cnt = 0
            i = 0
            while i < n and cnt < p:
                if i + 1 < n and nums[i + 1] - nums[i] <= target:
                    i += 1
                    cnt += 1
                i += 1
            return cnt >= p
        l, r = 0, 1000000000+7
        while l < r:
            m = (l + r) // 2
            if check(m):
                r = m
            else:
                l = m+1
        return l`,
    },
    {
      script: Script.RUST,
      time: 24,
      memory: 3.3,
      desc: '同上',
      code: `impl Solution {
    pub fn minimize_max(mut nums: Vec<i32>, p: i32) -> i32 {
        nums.sort();
        let n = nums.len();
        let (mut l, mut r) = (0, *nums.iter().max().unwrap());
        let check = |target: i32| -> bool {
            let mut cnt = 0;
            let mut i = 0;
            while i < n && cnt < p {
                if i + 1 < n && nums[i + 1] - nums[i] <= target {
                    i += 1;
                    cnt += 1;
                }
                i += 1;
            }
            cnt >= p
        };
        while l < r {
            let m = (l + r) / 2;
            if check(m) {
                r = m;
            } else {
                l = m + 1;
            }
        }
        l
    }
}`,
    },
    {
      script: Script.PY3,
      time: 36,
      memory: 14.8,
      desc: '同上',
      code: `class Solution:
    def camelMatch(self, queries: List[str], pattern: str) -> List[bool]:
        def check(s: str):
            pidx = 0
            for c in s:
                if pidx < len(pattern) and c == pattern[pidx]:
                    pidx += 1
                elif c.isupper():
                    return False
            return pidx == len(pattern)
        return [check(s) for s in queries]`,
    },
    {
      script: Script.RUST,
      time: 0,
      memory: 2,
      desc: '同上',
      code: `impl Solution {
    pub fn camel_match(queries: Vec<String>, pattern: String) -> Vec<bool> {
        let pattern = pattern.chars().collect::<Vec<_>>();
        queries
            .into_iter()
            .map(|s| {
                let mut pidx = 0;
                for c in s.chars() {
                    if pidx < pattern.len() && c == pattern[pidx] {
                        pidx += 1
                    } else if c.is_uppercase() {
                        return false;
                    }
                }
                pidx == pattern.len()
            })
            .collect::<Vec<_>>()
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
