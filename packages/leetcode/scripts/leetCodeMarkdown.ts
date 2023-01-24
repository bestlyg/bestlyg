import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1828. 统计一个圆中点的数目',
  url: 'https://leetcode.cn/problems/queries-on-number-of-points-inside-a-circle/',
  difficulty: Difficulty.中等,
  tag: [Tag.几何, Tag.数组, Tag.数学],
  desc: `请你返回一个数组 answer ，其中 answer[j]是第 j 个查询的答案。`,
  solutions: [
    {
      script: Script.CPP,
      time: 92,
      memory: 15.8,
      desc: '遍历',
      code: `class Solution {
public:
    vector<int> countPoints(vector<vector<int>>& points, vector<vector<int>>& queries) {
        auto d = [&](vector<int> &a, vector<int> &b) {
            return pow(abs(a[0] - b[0]), 2) + pow(abs(a[1] - b[1]), 2);
        };
        vector<int> ans(queries.size(), 0);
        for (int i = 0; i < queries.size(); i++) {
            for (auto &p : points) {
                if (d(p, queries[i]) <= pow(queries[i][2], 2)) ans[i]++;
            }
        }
        return ans;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 2832,
      memory: 15.2,
      desc: '同上',
      code: `class Solution:
    def countPoints(self, points: List[List[int]], queries: List[List[int]]) -> List[int]:
        ans = [0] * len(queries)
        def d(a, b): return pow(abs(a[0] - b[0]), 2) + pow(abs(a[1] - b[1]), 2)
        for i in range(0, len(queries)):
            for p in points:
                if d(p, queries[i]) <= pow(queries[i][2], 2):
                    ans[i] += 1
        return ans`,
    },
    {
      script: Script.RUST,
      time: 20,
      memory: 2.2,
      desc: '同上',
      code: `impl Solution {
    pub fn count_points(points: Vec<Vec<i32>>, queries: Vec<Vec<i32>>) -> Vec<i32> {
        let d =
            |a: &Vec<i32>, b: &Vec<i32>| (a[0] - b[0]).abs().pow(2) + (a[1] - b[1]).abs().pow(2);
        let mut ans = vec![0; queries.len()];
        for i in 0..queries.len() {
            for p in points.iter() {
                if d(&queries[i], p) <= queries[i][2].pow(2) {
                    ans[i] += 1;
                }
            }
        }
        ans
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
