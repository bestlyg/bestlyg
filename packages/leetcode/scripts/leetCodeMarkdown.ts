import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1048. 最长字符串链',
  url: 'https://leetcode.cn/problems/longest-string-chain/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `从给定单词列表 words 中选择单词组成词链，返回 词链的 最长可能长度 。`,
  solutions: [
    //     {
    //       script: Script.TS,
    //       time: 76,
    //       memory: 45.9,
    //       desc: '遍历',
    //       code: `function sortPeople(names: string[], heights: number[]): string[] {
    //   return new Array(names.length)
    //     .fill(0)
    //     .map((_, i) => i)
    //     .sort((a, b) => heights[b] - heights[a])
    //     .map(i => names[i]);
    // }`,
    //       date: new Date('2022/09/25').getTime(),
    //     },
    {
      script: Script.CPP,
      time: 96,
      memory: 12.8,
      desc: '遍历',
      code: `class Solution {
public:
    bool cmp(string &s1, string &s2, int i1 = 0, int i2 = 0, int err = 1) {
        if (i1 == s1.size()) return i2 + err == s2.size();
        if (i2 == s2.size()) return i1 + err == s1.size();
        if (s1[i1] == s2[i2]) return cmp(s1, s2, i1 + 1, i2 + 1, err);
        if (err == 0) return false;
        return cmp(s1, s2, i1 + 1, i2, err - 1) || cmp(s1, s2, i1, i2 + 1, err - 1);
    }
    int longestStrChain(vector<string>& words) {
        sort(words.begin(), words.end(), [&](auto &a, auto &b) { return a.size() < b.size(); });
        int n = words.size(), res = 1;
        vector<int> dp(n, 1);
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (words[j].size() == words[i].size()) break;
                if (cmp(words[i], words[j])) dp[i] = max(dp[i], dp[j] + 1);
            }
            res = max(res, dp[i]);
        }
        return res;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 1836,
      memory: 15.2,
      desc: '同上',
      code: `def cmp(s1: str, s2: str, i1: int, i2: int, err: int):
    if i1 == len(s1):
        return i2 + err == len(s2)
    if i2 == len(s2):
        return i1 + err == len(s1)
    if s1[i1] == s2[i2]:
        return cmp(s1, s2, i1 + 1, i2 + 1, err)
    if err == 0:
        return False
    return cmp(s1, s2, i1 + 1, i2, err - 1) or cmp(s1, s2, i1, i2 + 1, err - 1)


class Solution:
    def longestStrChain(self, words: List[str]) -> int:
        words.sort(key=lambda v: len(v))
        n = len(words)
        res = 1
        dp = [1] * n
        for i in range(n):
            for j in range(i):
                if len(words[j]) == len(words[i]):
                    break
                if cmp(words[i], words[j], 0, 0, 1):
                    dp[i] = max(dp[i], dp[j] + 1)
            res = max(res, dp[i])
        return res`,
    },
    {
      script: Script.RUST,
      time: 28,
      memory: 2.1,
      desc: '同上',
      code: `fn cmp(s1: &[u8], s2: &[u8], i1: usize, i2: usize, err: usize) -> bool {
    if i1 == s1.len() {
        i2 + err == s2.len()
    } else if i2 == s2.len() {
        i1 + err == s1.len()
    } else if s1[i1] == s2[i2] {
        cmp(s1, s2, i1 + 1, i2 + 1, err)
    } else if err == 0 {
        false
    } else {
        cmp(s1, s2, i1 + 1, i2, err - 1) || cmp(s1, s2, i1, i2 + 1, err - 1)
    }
}
impl Solution {
    pub fn longest_str_chain(mut words: Vec<String>) -> i32 {
        words.sort_by_key(|v| v.len());
        let n = words.len();
        let mut res = 1;
        let mut dp = vec![1; n];
        for i in 0..n {
            for j in 0..i {
                if words[i].len() == words[j].len() {
                    break;
                }
                let s1 = words[i].as_bytes();
                if cmp(words[i].as_bytes(), words[j].as_bytes(), 0, 0, 1) {
                    dp[i] = dp[i].max(dp[j] + 1);
                }
            }
            res = res.max(dp[i]);
        }
        res as i32
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
