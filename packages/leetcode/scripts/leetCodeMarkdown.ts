import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '2363. 合并相似的物品',
  url: 'https://leetcode.cn/problems/merge-similar-items///',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `请你返回一个二维数组 ret，其中 ret[i] = [valuei, weighti]， weighti 是所有价值为 valuei 物品的 重量之和 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 24,
      memory: 6.4,
      desc: '遍历',
      code: `class Solution {
public:
    vector<vector<int>> mergeSimilarItems(vector<vector<int>>& items1, vector<vector<int>>& items2) {
        map<int, int> m;
        for (auto &item : items1) m[item[0]] += item[1];
        for (auto &item : items2) m[item[0]] += item[1];
        vector<vector<int>> res;
        for (auto &item : m) res.push_back({ item.first, item.second });
        return res;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 36,
      memory: 15.5,
      desc: '同上',
      code: `class Solution:
    def mergeSimilarItems(self, items1: List[List[int]], items2: List[List[int]]) -> List[List[int]]:
        l = [0] * 1005
        for [k, v] in items1:
            l[k] += v
        for [k, v] in items2:
            l[k] += v
        res = []
        for i in range(1005):
            if l[i]:
                res.append([i, l[i]])
        return res`,
    },
    {
      script: Script.RUST,
      time: 4,
      memory: 2.3,
      desc: '同上',
      code: `impl Solution {
    pub fn merge_similar_items(items1: Vec<Vec<i32>>, items2: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        let mut m = std::collections::HashMap::<i32, i32>::new();
        for item in items1 {
            let v = m.entry(item[0]).or_insert(0);
            *v += item[1];
        }
        for item in items2 {
            let v = m.entry(item[0]).or_insert(0);
            *v += item[1];
        }
        let mut res = m
            .into_iter()
            .map(|(k, v)| vec![k, v])
            .collect::<Vec<Vec<i32>>>();
        res.sort_by_key(|item| item[0]);
        res
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
