import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '2309. 兼具大小写的最好英文字母',
  url: 'https://leetcode.cn/problems/smallest-string-with-a-given-numeric-value/',
  difficulty: Difficulty.中等,
  tag: [Tag.贪心, Tag.字符串],
  desc: `给你两个整数 n 和 k 。返回 长度 等于 n 且 数值 等于 k 的 字典序最小 的字符串。`,
  solutions: [
    {
      script: Script.CPP,
      time: 8,
      memory: 6.4,
      desc: '遍历',
      code: `class Solution {
public:
    string greatestLetter(string s) {
        string ans = "";
        int map[128] = {0};
        for (auto &c : s) {
            map[c]++;
            if (isupper(c) && map[tolower(c)] && (ans == "" || ans[0] < c) ||
                islower(c) && map[toupper(c)] && (ans == "" || ans[0] < toupper(c))) ans = toupper(c);
        }
        return ans;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 56,
      memory: 15,
      desc: '同上',
      code: `class Solution:
def greatestLetter(self, s: str) -> str:
    ans = ""
    sset = set()
    for i, c in enumerate(s):
        sset.add(c)
        if c.isupper() and c.lower() in sset and (ans == "" or ans[0] < c) or c.islower() and c.upper() in sset and (ans == "" or ans[0] < c.upper()):
             ans = c.upper()
    return ans`,
    },
    {
      script: Script.RUST,
      time: 4,
      memory: 2,
      desc: '同上',
      code: `impl Solution {
    pub fn greatest_letter(s: String) -> String {
        let s = s.chars().collect::<Vec<char>>();
        let mut ans = 0usize;
        let mut map = [0; 128];
        for c in s {
            map[c as usize] += 1;
            let upper_c = c.to_uppercase().next().unwrap() as usize;
            let lower_c = c.to_lowercase().next().unwrap() as usize;
            if map[upper_c] > 0 && map[lower_c] > 0 && ans < upper_c {
                ans = upper_c;
            }
        }
        if ans == 0 {
            "".to_string()
        } else {
            String::from(ans as u8 as char)
        }
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
