import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '2399. 检查相同字母间的距离',
  url: 'https://leetcode.cn/problems/check-distances-between-same-letters/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `如果 s 是一个 匀整 字符串，返回 true ；否则，返回 false 。`,
  solutions: [
    {
      script: Script.JS,
      time: 68,
      memory: 43.4,
      desc: '遍历',
      code: `var checkDistances = function (s, distance) {
        const cache = {};
        for (let i = 0; i < s.length; i++) {
          const prev = cache[s[i]];
          if (prev !== undefined) {
            const d = distance[s.codePointAt(i) - 'a'.codePointAt(0)];
            if (d !== i - prev - 1) return false;
          } else {
            cache[s[i]] = i;
          }
        }
        return true;
      };`,
      date: new Date('2022/09/04').getTime(),
    },
    {
      script: Script.CPP,
      time: 0,
      memory: 12.8,
      desc: '遍历',
      code: `class Solution {
public:
    bool checkDistances(string s, vector<int>& distance) {
        vector<int> list(26, -1);
        for (int i = 0; i < s.size(); i++) {
            if (list[s[i] - 'a'] == -1) list[s[i] - 'a'] = i;
            else if (i - list[s[i] - 'a'] - 1 != distance[s[i] - 'a']) return false;
        }
        return true;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 68,
      memory: 14.8,
      desc: '同上',
      code: `class Solution:
    def checkDistances(self, s: str, distance: List[int]) -> bool:
        l = [-1] * 26
        for i in range(len(s)):
            idx = ord(s[i]) - ord('a')
            if list[idx] == -1:
                list[idx] = i
            elif i - list[idx] - 1 != distance[idx]:
                return False
        return True`,
    },
    {
      script: Script.RUST,
      time: 0,
      memory: 2,
      desc: '同上',
      code: `impl Solution {
    pub fn check_distances(s: String, distance: Vec<i32>) -> bool {
        let s: Vec<usize> = s.chars().map(|v| v as usize).collect();
        let mut list = vec![-1i32; 26];
        for i in 0..s.len() {
            let idx = s[i] - 'a' as usize;
            if list[idx] == -1 {
                list[idx] = i as i32;
            } else if i as i32 - list[idx] - 1 != distance[idx] {
                return false;
            }
        }
        true
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
