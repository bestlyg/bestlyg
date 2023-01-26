import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1663. 具有给定数值的最小字符串',
  url: 'https://leetcode.cn/problems/smallest-string-with-a-given-numeric-value/',
  difficulty: Difficulty.中等,
  tag: [Tag.贪心, Tag.字符串],
  desc: `给你两个整数 n 和 k 。返回 长度 等于 n 且 数值 等于 k 的 字典序最小 的字符串。`,
  solutions: [
    {
      script: Script.CPP,
      time: 64,
      memory: 26.5,
      desc: '贪心遍历',
      code: `class Solution {
public:
    string getSmallestString(int n, int k) {
        k -= n;
        string ans = "";
        while (n--) ans += "a";
        for (int i = ans.size() - 1; i >= 0 && k; i--) {
            if (k >= 25) ans[i] = 'z', k -= 25;
            else ans[i] += k, k = 0;
        }
        return ans;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 7856,
      memory: 17.3,
      desc: '同上',
      code: `class Solution:
    def getSmallestString(self, n: int, k: int) -> str:
        ans = ''.join(['a'] * n)
        k -= n
        for i in range(n - 1, -1, -1):
            if k >= 25:
                ans = ans[:i] + "z" + ans[i + 1:]
                k -= 25
            else:
                ans = ans[:i] + chr(k + ord('a')) + ans[i + 1:]
                k = 0
            if not k:
                break
        return ans`,
    },
    {
      script: Script.RUST,
      time: 8,
      memory: 2.5,
      desc: '同上',
      code: `impl Solution {
    pub fn get_smallest_string(n: i32, k: i32) -> String {
        let mut k = k;
        k -= n;
        let mut ans = vec!['a'; n as usize];
        let mut i = n as usize - 1;
        while k != 0 {
            if k >= 25 {
                ans[i] = 'z';
                k -= 25;
            } else {
                ans[i] = ('a' as i32 + k) as u8 as char;
                k = 0
            }
            i -= 1;
        }
        ans.into_iter().collect::<String>()
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
