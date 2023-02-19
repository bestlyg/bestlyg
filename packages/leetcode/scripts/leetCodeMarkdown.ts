import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '6363. 找出对应 LCP 矩阵的字符串',
  url: 'https://leetcode.cn/problems/find-the-string-with-lcp/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `给你一个 n x n 的矩阵 lcp 。返回与 lcp 对应的、按字典序最小的字符串 word 。如果不存在这样的字符串，则返回空字符串。`,
  solutions: [
    {
      script: Script.CPP,
      time: 168,
      memory: 67.1,
      desc: '贪心的构造出字符串，再通过lcp验证字符串是否成立',
      code: `class Solution {
public:
    string findTheString(vector<vector<int>>& lcp) {
        int n = lcp.size(), i = 0;
        string s;
        for (int j = 0; j < n; j++) s += "#";
        for (char c = 'a'; c <= 'z'; c++) {
            while (i < n && s[i] != '#') i++;
            if (i == n) break;
            for (int j = i; j < n; j++)
                if (lcp[i][j]) s[j] = c;
        }
        if (s.find('#') != string::npos) return "";
        for (int i = n - 1; i >= 0; i--) {
            for (int j = n - 1; j >= 0; j--) {
                if (s[i] == s[j]) {
                    if (i == n - 1 || j == n - 1) {
                        if (lcp[i][j] != 1) return "";
                    } else if (lcp[i][j] != lcp[i + 1][j + 1] + 1) return "";
                } else if (lcp[i][j]) return "";
            }
        }
        return s;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 320,
      memory: 45.2,
      desc: '同上',
      code: `class Solution:
    def findTheString(self, lcp: List[List[int]]) -> str:
        n = len(lcp)
        i = 0
        s = [''] * n
        for c in ascii_lowercase:
            while i < n and s[i] != '':
                i += 1
            if i == n:
                break
            for j in range(i, n):
                if lcp[i][j]:
                    s[j] = c
        if '' in s:
            return ''
        for i in range(n-1, -1, -1):
            for j in range(n-1, -1, -1):
                if s[i] == s[j]:
                    if i == n - 1 or j == n - 1:
                        if lcp[i][j] != 1:
                            return ''
                    elif lcp[i][j] != lcp[i+1][j+1] + 1:
                        return ''
                elif lcp[i][j]:
                    return ''
        return ''.join(s)`,
    },
    {
      script: Script.RUST,
      time: 28,
      memory: 9.4,
      desc: '同上',
      code: `impl Solution {
    pub fn find_the_string(lcp: Vec<Vec<i32>>) -> String {
        let n = lcp.len();
        let mut list = vec!['\\0'; n];
        let mut c = 'a';
        let mut i = 0;
        while (c as u8) <= ('z' as u8) {
            while i < n && list[i] != '\\0' {
                i += 1;
            }
            if i == n {
                break;
            }
            for j in i..n {
                if lcp[i][j] != 0 {
                    list[j] = c;
                }
            }
            c = ((c as u8) + 1) as char;
        }
        if list.contains(&'\\0') {
            String::new()
        } else {
            for i in (0..n).rev() {
                for j in (0..n).rev() {
                    if list[i] == list[j] {
                        if i == n - 1 || j == n - 1 {
                            if lcp[i][j] != 1 {
                                return String::new();
                            }
                        } else if lcp[i][j] != lcp[i + 1][j + 1] + 1 {
                            return String::new();
                        }
                    } else if lcp[i][j] != 0 {
                        return String::new();
                    }
                }
            }
            String::from_utf8(list.into_iter().map(|c| c as u8).collect::<Vec<u8>>()).unwrap()
        }
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
