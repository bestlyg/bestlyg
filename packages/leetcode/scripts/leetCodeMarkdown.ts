import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1010. 总持续时间可被 60 整除的歌曲',
  url: 'https://leetcode.cn/problems/pairs-of-songs-with-total-durations-divisible-by-60/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `返回其总持续时间（以秒为单位）可被 60 整除的歌曲对的数量。`,
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
      time: 28,
      memory: 27.5,
      desc: '取模后求逆元',
      code: `class Solution {
public:
    int numPairsDivisibleBy60(vector<int>& time) {
        unordered_map<int, int> m;
        int res = 0;
        for (auto &t : time) {
            if (t % 60 == 0) res += m[0];
            else res += m[60 - t % 60];
            m[t % 60]++;
        }
        return res;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 88,
      memory: 19.6,
      desc: '同上',
      code: `class Solution:
    def numPairsDivisibleBy60(self, time: List[int]) -> int:
        m = Counter()
        res = 0
        for t in time:
            if t % 60 == 0:
                res += m[0]
            else:
                res += m[60-t % 60]
            m[t % 60] += 1
        return res`,
    },
    {
      script: Script.RUST,
      time: 12,
      memory: 2.4,
      desc: '同上',
      code: `impl Solution {
    pub fn num_pairs_divisible_by60(time: Vec<i32>) -> i32 {
        let mut m = std::collections::HashMap::<i32, i32>::new();
        let mut res = 0;
        for t in time {
            if t % 60 == 0 {
                res += m.get(&0).unwrap_or(&0);
            } else {
                res += m.get(&(60 - t % 60)).unwrap_or(&0);
            }
            *m.entry(t % 60).or_insert(0) += 1;
        }
        res
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
