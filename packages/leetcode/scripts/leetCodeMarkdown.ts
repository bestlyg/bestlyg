import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '6339. 将珠子放入背包中',
  url: 'https://leetcode.cn/problems/put-marbles-in-bags/',
  difficulty: Difficulty.困难,
  tag: [],
  desc: `一个珠子分配方案的 分数 是所有 k 个背包的价格之和。请你返回所有分配方案中，最大分数 与 最小分数 的 差值 为多少。`,
  solutions: [
    {
      script: Script.CPP,
      time: 152,
      memory: 67.6,
      desc: '贪心，只统计首位，当一个珠子当前组是末尾时，下一个珠子是下一组的首个',
      code: `class Solution {
public:
    long long putMarbles(vector<int>& weights, int k) {
        vector<long long> list;
        for (int i = 1; i < weights.size(); i++) list.push_back(weights[i - 1] + weights[i]);
        sort(list.begin(), list.end());
        long long ans = 0;
        for (int i = 0; i < k - 1; i++) ans += list[list.size() - i - 1] - list[i];
        return ans;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 224,
      memory: 25.4,
      desc: '同上',
      code: `class Solution:
    def putMarbles(self, weights: List[int], k: int) -> int:
        list=[]
        n = len(weights)
        for i in range(1, n):
            list.append(weights[i - 1] + weights[i])
        list.sort()
        return sum(list[len(list) - k + 1:]) - sum(list[:k - 1])`,
    },
    {
      script: Script.RUST,
      time: 40,
      memory: 3.5,
      desc: '同上',
      code: `impl Solution {
    pub fn put_marbles(weights: Vec<i32>, k: i32) -> i64 {
        let mut list = Vec::new();
        for i in 1..weights.len() {
            list.push(weights[i - 1] + weights[i]);
        }
        list.sort();
        let mut ans = 0;
        for i in 0..k - 1 {
            let i = i as usize;
            ans += (list[list.len() - i - 1] - list[i]) as i64;
        }
        ans
    }
}`,
    },
    {
      script: Script.RUST,
      time: 36,
      memory: 3.5,
      desc: '同上',
      code: `impl Solution {
    pub fn put_marbles(weights: Vec<i32>, k: i32) -> i64 {
        let mut list = Vec::new();
        for i in 1..weights.len() {
            list.push(weights[i - 1] + weights[i]);
        }
        list.sort();
        let fold = |sum, cur: &i32| sum + (*cur) as i64;
        list[list.len() - k as usize + 1..].iter().fold(0, fold)
            - list[..k as usize - 1].iter().fold(0, fold)
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
