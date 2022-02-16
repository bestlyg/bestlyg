import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1380. 矩阵中的幸运数',
  url: 'https://leetcode-cn.com/problems/lucky-numbers-in-a-matrix/',
  difficulty: Difficulty.简单,
  tag: [Tag.数组, Tag.矩阵],
  desc: `给你一个 m * n 的矩阵，矩阵中的数字 各不相同 。请你按 任意 顺序返回矩阵中的所有幸运数。`,
  solutions: [
    {
      script: Script.CPP,
      time: 728,
      memory: 159.7,
      desc: '找到根节点后，遍历所有节点找到其父节点',
      code: `class Solution {
   public:
    int checkWays(vector<vector<int>>& pairs) {
        unordered_map<int, unordered_set<int>> m;
        int root = pairs[0][0];
        // 装载pair到map中，同时记录相邻最多的节点
        for (auto& pair : pairs) {
            m[pair[0]].emplace(pair[1]);
            m[pair[1]].emplace(pair[0]);
            if (m[root].size() < m[pair[0]].size()) root = pair[0];
            if (m[root].size() < m[pair[1]].size()) root = pair[1];
        }
        // 如果最多的节点没法覆盖所有其他节点，那就无法生成树
        if (m[root].size() != m.size() - 1) return 0;
        int ans = 1;
        // 遍历所有子节点
        for (auto& [node, list] : m) {
            if (node == root) continue;
            // 寻找当前子节点的最小父节点， 拥有比当前节点更多的相邻数，
            // 且子节点的所有相邻也与父节点相邻
            int degree = list.size(), parent = -1, parent_degree = INT_MAX;
            for (auto& node : list) {
                if (m[node].size() < parent_degree &&
                    m[node].size() >= degree) {
                    parent = node;
                    parent_degree = m[node].size();
                }
            }
            // 找不到父节点就不可能成树
            if (parent == -1) return 0;
            for (auto& node : list) {
                if (node == parent) continue;
                if (!m[parent].count(node)) return 0;
            }
            // 如果连接数相同说明父子可以替换
            if (parent_degree == degree) ans = 2;
        }
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
