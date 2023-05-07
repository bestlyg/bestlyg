import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '6419. 使二叉树所有路径值相等的最小代价',
  url: 'https://leetcode.cn/problems/make-costs-of-paths-equal-in-a-binary-tree/',
  difficulty: Difficulty.简单,
  tag: [],
  desc: `你的目标是让根到每一个 叶子结点 的路径值相等。请你返回 最少 需要执行增加操作多少次。`,
  solutions: [
    //     {
    //       script: Script.TS,
    //       time: 184,
    //       memory: 48.3,
    //       desc: '遍历',
    //       code: `function isValid(s: string): boolean {
    //     while (s != "") {
    //         const n = s.replace("abc", "");
    //         if (n == s) return false;
    //         s = n;
    //     }
    //     return s == "";
    // };`,
    //     },
    {
      script: Script.CPP,
      time: 168,
      memory: 132,
      desc: 'dfs每次统计左右子树的差值',
      code: `class Solution {
public:
    int minIncrements(int n, vector<int>& cost) {
        int level = log2(n + 1), res = 0;
        function<int(int, int)> dfs = [&](int root, int l) -> int {
            if (l == level) return cost[root];
            int left = dfs(root * 2 + 1, l + 1), right = dfs(root * 2 + 2, l + 1);
            if (left == right) return left + cost[root];
            res += abs(right - left);
            return max(left, right) + cost[root];
        };
        dfs(0, 1);
        return res;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 324,
      memory: 48.6,
      desc: '同上',
      code: `class Solution:
    def minIncrements(self, n: int, cost: List[int]) -> int:
        level = log2(n+1)
        res = 0

        def dfs(root: int, l: int) -> int:
            nonlocal res
            if l == level : return cost[root]
            left = dfs(root * 2 + 1, l + 1)
            right = dfs(root * 2 + 2, l + 1)
            if left == right :return left + cost[root]
            res += abs(left -right)
            return max(left, right ) + cost[root]
        dfs(0, 1)
        return res`,
    },
    {
      script: Script.RUST,
      time: 24,
      memory:3.4,
      desc: '同上',
      code: `impl Solution {
    pub fn min_increments(n: i32, cost: Vec<i32>) -> i32 {        
        let level = ((n + 1) as f64).log2() as u32;
        let mut res = 0;
        fn dfs(cost: &Vec<i32>, level: u32, res: &mut i32, root: usize, l: u32) -> i32 {
            if l == level {
                cost[root]
            } else {
                let left = dfs(cost, level, res, root * 2 + 1, l + 1);
                let right = dfs(cost, level, res, root * 2 + 2, l + 1);
                if left == right {
                    left + cost[root]
                } else {
                    *res += (right - left).abs();
                    left.max(right) + cost[root]
                }
            }
        }
        dfs(&cost, level, &mut res, 0, 1);
        res
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
