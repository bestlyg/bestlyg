import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '2418. 按身高排序',
  url: 'https://leetcode.cn/problems/sort-the-people/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `给你一个字符串数组 names ，和一个由 互不相同 的正整数组成的数组 heights 。两个数组的长度均为 n 。`,
  solutions: [
    {
      script: Script.TS,
      time: 76,
      memory: 45.9,
      desc: '遍历',
      code: `function sortPeople(names: string[], heights: number[]): string[] {
  return new Array(names.length)
    .fill(0)
    .map((_, i) => i)
    .sort((a, b) => heights[b] - heights[a])
    .map(i => names[i]);
}`,
      date: new Date('2022/09/25').getTime(),
    },
    {
      script: Script.CPP,
      time: 32,
      memory: 19.8,
      desc: '遍历',
      code: `class Solution {
public:
    vector<string> sortPeople(vector<string>& names, vector<int>& heights) {
        vector<int> idxs;
        for (int i = 0; i < names.size(); i++) idxs.push_back(i);
        sort(idxs.begin(), idxs.end(), [&](auto &i1, auto &i2) { return heights[i1] > heights[i2]; });
        vector<string> res;
        for (int i = 0; i < names.size(); i++) res.push_back(names[idxs[i]]);
        return res;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 56,
      memory: 15.4,
      desc: '同上',
      code: `class Solution:
    def sortPeople(self, names: List[str], heights: List[int]) -> List[str]:
        l = [i for i in range(len(names))]
        l.sort(key=lambda i: heights[i], reverse=True)
        return [names[i] for i in l]`,
    },
    {
      script: Script.RUST,
      time: 8,
      memory: 2.2,
      desc: '同上',
      code: `impl Solution {
    pub fn sort_people(names: Vec<String>, heights: Vec<i32>) -> Vec<String> {
        let mut l = (0..names.len()).collect::<Vec<usize>>();
        l.sort_by_key(|i| heights[*i]);        
        l.into_iter().rev().map(|i| names[i].clone()).collect()
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
