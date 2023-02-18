import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1237. 找出给定方程的正整数解',
  url: 'https://leetcode.cn/problems/find-positive-integer-solution-for-a-given-equation/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `给你一个函数  f(x, y) 和一个目标结果 z，函数公式未知，请你计算方程 f(x,y) == z 所有可能的正整数 数对 x 和 y。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 6.3,
      desc: '二分',
      code: `class Solution {
public:
    vector<vector<int>> findSolution(CustomFunction& customfunction, int z) {
        vector<vector<int>> res;
        for (int x = 1; x <= 1000; x++) {
            int l = 1, r = 1000, m;
            while (l <= r) {
                m = (l + r) / 2;
                int val = customfunction.f(x, m);
                if (val == z) {
                    vector<int> item{ x, m };
                    res.push_back(item);
                    break;
                }
                if (val > z) r = m - 1;
                else l = m + 1;
            }
        }
        return res;
    }
  };`,
    },
    {
      script: Script.PY3,
      time: 148,
      memory: 14.9,
      desc: '同上',
      code: `class Solution:
    def findSolution(self, customfunction: 'CustomFunction', z: int) -> List[List[int]]:
        res = []
        for x in range(1, 1001):
            l, r = 1, 1000
            while l <= r:
                m = (l + r)//2
                val = customfunction.f(x, m)
                if val == z:
                    res.append([x, m])
                    break
                if val > z:
                    r = m - 1
                else:
                    l = m + 1
        return res`,
    },
    {
      script: Script.RUST,
      time: 4,
      memory: 2.2,
      desc: '同上',
      code: `impl Solution {
    pub fn find_solution(customfunction: &CustomFunction, z: i32) -> Vec<Vec<i32>> {
        let mut res = vec![];
        for x in 1..=1000 {
            let (mut l, mut r) = (1, 1000);
            while l <= r {
                let m = (l + r) / 2;
                let val = customfunction.f(x, m);
                if val == z {
                    res.push(vec![x, m]);
                    break;
                }
                if val > z {
                    r = m - 1;
                } else {
                    l = m + 1;
                }
            }
        }
        res
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;