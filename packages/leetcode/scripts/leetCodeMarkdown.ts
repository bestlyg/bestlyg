import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1377. T 秒后青蛙的位置',
  url: 'https://leetcode.cn/problems/frog-position-after-t-seconds/',
  difficulty: Difficulty.简单,
  tag: [],
  desc: `返回青蛙在 t 秒后位于目标顶点 target 上的概率。`,
  solutions: [
//     {
//       script: Script.TS,
//       time: 56,
//       memory: 44.2,
//       desc: '存储nums后，valueOf中累加，toString中返回字符串',
//       code: `class ArrayWrapper {
//     constructor(public nums: number[]) {}
//     valueOf() {
//         return this.nums.reduce((sum, num) => sum + num, 0);
//     }
//     toString() {
//         return \`[\${this.nums.join(',')}]\`;
//     }
// };`,
//     },
        {
          script: Script.CPP,
          time: 24,
          memory: 14.5,
          desc: 'dfs遍历，因为每个点之间都连通，判断当青蛙到目标点后是否还能继续向外跳',
          code: `class Solution {
public:
    double frogPosition(int n, vector<vector<int>>& edges, int t, int target) {
        vector<vector<int>> nodes(n + 1);
        for (auto &e : edges) {
            nodes[e[0]].push_back(e[1]);
            nodes[e[1]].push_back(e[0]);
        }
        vector<bool> used(n + 1, false);
        used[1] = true;
        function<double(int, int)> dfs = [&](int cur, int t) {
            int sum = 0;
            for (auto &next : nodes[cur]) {
                if (!used[next]) sum += 1;
            }
            if (cur == target || t == 0) {
                return cur == target && (t == 0 || sum == 0) ? 1.0 : 0.0;
            }
            for (auto &next : nodes[cur]) {
                if (!used[next]) {
                    used[next] = true;
                    auto res = dfs(next, t - 1);
                    used[next] = false;
                    if (res != 0.0) return res / sum;
                }
            }
            return 0.0;
        };
        return dfs(1, t);
    }
};`,
        },
        {
          script: Script.PY3,
          time: 52,
          memory:16.4,
          desc: '同上',
          code: `class Solution:
    def frogPosition(self, n: int, edges: List[List[int]], t: int, target: int) -> float:
        nodes = [[] for _ in range(n + 1)]
        for e in edges:
            nodes[e[0]].append(e[1])
            nodes[e[1]].append(e[0])
        used = [False for _ in range(n + 1)]
        used[1] = True

        def dfs(cur: int, t: int) -> float:
            sum = 0
            for next in nodes[cur]:
                if not used[next]:
                    sum += 1
            if cur == target or t == 0:
                return 1 if cur == target and (t == 0 or sum == 0) else 0
            for next in nodes[cur]:
                if not used[next]:
                    used[next] = True
                    res = dfs(next, t - 1)
                    used[next] = False
                    if res != 0:
                        return res / sum
            return 0
        return dfs(1, t)`,
        },
        {
          script: Script.RUST,
          time: 4,
          memory: 1.9,
          desc: '同上',
          code: `fn dfs(nodes: &Vec<Vec<usize>>, used: &mut Vec<bool>, target: usize, cur: usize, t: i32) -> f64 {
let mut sum: f64 = 0.0;
for next in &nodes[cur] {
    if !used[*next] {
        sum += 1.0;
    }
}
if cur == target || t == 0 {
    if cur == target && (t == 0 || sum == 0.0) {
        1.0
    } else {
        0.0
    }
} else {
    for next in &nodes[cur] {
        if !used[*next] {
            used[*next] = true;
            let res = dfs(nodes, used, target, *next, t - 1);
            used[*next] = false;
            if res != 0.0 {
                return res / sum;
            }
        }
    }
    0.0
}
}

impl Solution {
    pub fn frog_position(n: i32, edges: Vec<Vec<i32>>, t: i32, target: i32) -> f64 {
        let n = n as usize;
        let mut nodes: Vec<Vec<usize>> = vec![vec![]; n + 1];
        for e in edges {
            let (e0, e1) = (e[0] as usize, e[1] as usize);
            nodes[e0].push(e1);
            nodes[e1].push(e0);
        }
        let mut used = vec![false; n + 1];
        used[1] = true;
        dfs(&nodes, &mut used, target as usize, 1, t)
    }
}`,
        },
  ],
};

export default leetCodeMarkdown;
