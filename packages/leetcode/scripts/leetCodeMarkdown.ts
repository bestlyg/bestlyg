import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1637. 两点之间不包含任何点的最宽垂直区域',
  url: 'https://leetcode.cn/problems/widest-vertical-area-between-two-points-containing-no-points/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `给你 n 个二维平面上的点 points ，其中 points[i] = [xi, yi] ，请你返回两点之间内部不包含任何点的 最宽垂直区域 的宽度。`,
  solutions: [
    {
      script: Script.CPP,
      time: 272,
      memory: 79.3,
      desc: 'Tree排序',
      code: `class Solution {
public:
    int maxWidthOfVerticalArea(vector<vector<int>>& points) {
        set<int> s;
        for (auto &p : points) s.insert(p[0]);
        auto it = s.begin();
        int res = 0, prev = *it;
        while (it != s.end()) res = max(res, *it - prev), prev = *it, it++;
        return res;
    }
};`,
    },
    {
      script: Script.CPP,
      time: 280,
      memory: 64.7,
      desc: '排序',
      code: `class Solution {
public:
    int maxWidthOfVerticalArea(vector<vector<int>>& points) {
        sort(points.begin(), points.end(), [&](auto &a, auto &b){
            return a[0] < b[0];
        });
        int res = 0;
        for (int i = 1; i < points.size(); i++) {
            if (points[i][0] != points[i - 1][0]) {
                res = max(res, points[i][0] - points[i - 1][0]);
            }
        }
        return res;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 240,
      memory: 45.1,
      desc: '同上',
      code: `class Solution:
    def maxWidthOfVerticalArea(self, points: List[List[int]]) -> int:
        points.sort(key=lambda p: p[0])
        res = 0
        for i in range(1, len(points)):
            if points[i][0] != points[i - 1][0]:
                res = max(res, points[i][0] - points[i - 1][0])
        return res`,
    },
    {
      script: Script.RUST,
      time: 36,
      memory: 9.3,
      desc: '同上',
      code: `impl Solution {
    pub fn max_width_of_vertical_area(mut points: Vec<Vec<i32>>) -> i32 {
        points.sort_by_key(|p| p[0]);
        let mut res = 0;
        for i in 1..points.len() {
            if (points[i][0] != points[i - 1][0]) {
                res = res.max(points[i][0] - points[i - 1][0]);
            }
        }
        res
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
