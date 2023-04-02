import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1039. 多边形三角剖分的最低得分',
  url: 'https://leetcode.cn/problems/minimum-score-triangulation-of-polygon/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `假设将多边形 剖分 为 n - 2 个三角形。对于每个三角形，该三角形的值是顶点标记的乘积，三角剖分的分数是进行三角剖分后所有 n - 2 个三角形的值之和。返回 多边形进行三角剖分后可以得到的最低分 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 56,
      memory: 9.4,
      desc: 'dp[i][j]表示从第i个点到第j个点能组成的三角形最小值，每次从中选一个点，把这一段分成三部分进行递归',
      code: `class Solution {
public:
    int minScoreTriangulation(vector<int>& values) {
        unordered_map<int, unordered_map<int, int>> m;
        int n = values.size();
        function<int(int, int)> dfs = [&](int start, int end) {
            if (start + 2 > end) return 0;
            else if (start + 2 == end) return values[start] * values[start + 1] * values[end];
            else if (m.count(start) && m[start].count(end)) return m[start][end];
            else {
                int s = INT_MAX;
                for (int i = start + 1; i < end; i++) {
                    s = min(s, values[start] * values[end] * values[i] + dfs(start, i) + dfs(i, end));
                }
                return m[start][end] = s;
            }
        };
        return dfs(0, n - 1);
    }
};`,
    },
    {
      script: Script.PY3,
      time: 128,
      memory: 15.5,
      desc: '同上',
      code: `class Solution:
      def minScoreTriangulation(self, values: List[int]) -> int:
          n = len(values)
  
          @cache
          def dfs(start: int, end: int):
              if start + 2 > end:
                  return 0
              elif start + 2 == end:
                  return values[start] * values[start + 1] * values[end]
              else:
                  s = 0x7fffffff
                  for i in range(start + 1, end):
                      s = min(s, values[start] * values[end] * values[i] + dfs(start, i) + dfs(i, end))
                  return s
          return dfs(0, n-1)`,
    },
    {
      script: Script.RUST,
      time: 36,
      memory: 2.1,
      desc: '同上',
      code: `impl Solution {
    pub fn min_score_triangulation(values: Vec<i32>) -> i32 {
        use std::collections::HashMap;
        let mut m: HashMap<usize, HashMap<usize, i32>> = HashMap::new();
        let n = values.len();
        fn dfs(
            m: &mut HashMap<usize, HashMap<usize, i32>>,
            values: &Vec<i32>,
            n: usize,
            start: usize,
            end: usize,
        ) -> i32 {
            if start + 2 > end {
                0
            } else if start + 2 == end {
                values[start] * values[start + 1] * values[end]
            } else if m.contains_key(&start) && m.get(&start).unwrap().contains_key(&end) {
                *m.get(&start).unwrap().get(&end).unwrap()
            } else {
                let mut s = i32::MAX;
                for i in start + 1..end {
                    s = s.min(
                        values[start] * values[end] * values[i]
                            + dfs(m, values, n, start, i)
                            + dfs(m, values, n, i, end),
                    )
                }
                m.entry(start).or_insert(HashMap::new()).insert(end, s);
                s
            }
        }
        dfs(&mut m, &values, n, 0, n - 1)
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
