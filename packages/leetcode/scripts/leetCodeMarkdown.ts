import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1053. 交换一次的先前排列',
  url: 'https://leetcode.cn/problems/previous-permutation-with-one-swap/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `给你一个正整数数组 arr（可能存在重复的元素），请你返回可在 一次交换（交换两数字 arr[i] 和 arr[j] 的位置）后得到的、按字典序排列小于 arr 的最大排列。`,
  solutions: [
    {
      script: Script.CPP,
      time: 28,
      memory: 24.1,
      desc: '找出末尾第一个出现的逆序',
      code: `class Solution {
public:
    vector<int> prevPermOpt1(vector<int>& arr) {
        map<int, int> m;
        m[10005] = arr.size();
        for (int i = arr.size() - 1; i >= 0; i--) {
            auto it = m.lower_bound(arr[i]);
            if (m.size() > 1 && it != m.begin()) {
                swap(arr[i], arr[(*(--it)).second]);
                break;
            }
            m[val] = i;
        }
        return arr;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 184,
      memory: 32.6,
      desc: '同上',
      code: `class Solution:
    def miceAndCheese(self, reward1: List[int], reward2: List[int], k: int) -> int:
        n = len(reward1)
        l: List[(int, int)] = []
        for i in range(n):
            l.append((reward1[i], reward2[i]))
        l.sort(key=lambda v: v[1] - v[0])
        res = i = 0
        while k:
            res += l[i][0]
            i += 1
            k -= 1
        while i < n:
            res += l[i][1]
            i += 1
        return res`,
    },
    {
      script: Script.RUST,
      time: 28,
      memory: 4.3,
      desc: '同上',
      code: `impl Solution {
    pub fn mice_and_cheese(reward1: Vec<i32>, reward2: Vec<i32>, mut k: i32) -> i32 {
        let n = reward1.len();
        let mut list: Vec<(i32, i32)> = vec![];
        for i in 0..n {
            list.push((reward1[i], reward2[i]));
        }
        list.sort_by_key(|v| (*v).1 - (*v).0);
        let mut res = 0;
        let mut i = 0;
        while k != 0 {
            res += list[i].0;
            i += 1;
            k -= 1;
        }
        while i < n {
            res += list[i].1;
            i += 1;
        }
        res
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
