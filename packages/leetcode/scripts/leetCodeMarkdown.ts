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
      time: 92,
      memory: 39,
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
            for (int j = 1; j < 5; j++)
                if (cache[j] != 1) { res[i] = j; break; }
        }
        return res;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 88,
      memory: 20.1,
      desc: '同上',
      code: `class Solution:
    def gardenNoAdj(self, n: int, paths: List[List[int]]) -> List[int]:
        list = [[] for _ in range(n)]
        for [p1, p2] in paths:
            list[p1-1].append(p2-1)
            list[p2-1].append(p1-1)
        res = [0] * n
        for i in range(n):
            cache = [False] * 5
            for next in list[i]:
                if res[next] != 0:
                    cache[res[next]] = 1
            for j in range(1, 5):
                if cache[j] != 1:
                    res[i] = j
                    break
        return res`,
    },
    {
      script: Script.RUST,
      time: 12,
      memory: 3.6,
      desc: '同上',
      code: `impl Solution {
    pub fn garden_no_adj(n: i32, paths: Vec<Vec<i32>>) -> Vec<i32> {
        let n = n as usize;
        let mut list = vec![vec![]; n];
        for p in paths {
            let (p0, p1) = (p[0] as usize, p[1] as usize);
            list[p0 - 1].push(p1 - 1);
            list[p1 - 1].push(p0 - 1);
        }
        let mut res = vec![0; n];
        for i in 0..n {
            let mut cache = [false; 5];
            for next in list[i].iter() {
                if res[*next] != 0 {
                    cache[res[*next]] = true;
                }
            }
            for j in 1..5 {
                if !cache[j] {
                    res[i] = j;
                    break;
                }
            }
        }
        res.into_iter().map(|v| v as i32).collect()
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
