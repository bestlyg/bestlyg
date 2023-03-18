import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1616. 分割两个字符串得到回文串',
  url: 'https://leetcode.cn/problems/split-two-strings-to-make-palindrome/////',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `请你判断 aprefix + bsuffix 或者 bprefix + asuffix 能否构成回文串。`,
  solutions: [
    {
      script: Script.CPP,
      time: 52,
      memory: 28.5,
      desc: '贪心a前缀和b后缀最大匹配个数，a后缀和b前缀最大匹配个数',
      code: `class Solution {
public:
    bool checkPalindromeFormation(string a, string b) {
        int n = a.size(), cnt = 0;
        while (cnt < n && a[cnt] == b[n - 1 - cnt]) cnt++;
        if (cnt >= n / 2 || check(a.substr(cnt, n - cnt * 2)) || check(b.substr(cnt, n - cnt * 2))) return true;
        cnt = 0;
        while (cnt < n && b[cnt] == a[n - 1 - cnt]) cnt++;
        if (cnt >= n / 2 || check(a.substr(cnt, n - cnt * 2)) || check(b.substr(cnt, n - cnt * 2))) return true;
        return false;
    }
    bool check(string s) {
        for (int l = 0, r = s.size() - 1; l < r; l++, r--)
            if (s[l] != s[r]) return false;
        return true;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 108,
      memory: 15.6,
      desc: '同上',
      code: `class Solution:
    def checkPalindromeFormation(self, a: str, b: str) -> bool:
        def check(s: str):
            l, r = 0, len(s)-1
            while l < r:
                if s[l] != s[r]:
                    return False
                l += 1
                r -= 1
            return True

        n, cnt = len(a), 0
        while cnt < n and a[cnt] == b[n-1-cnt]:
            cnt += 1
        if cnt >= n//2 or check(a[cnt:n-cnt]) or check(b[cnt:n-cnt]):
            return True
        cnt = 0
        while cnt < n and b[cnt] == a[n-1-cnt]:
            cnt += 1
        if cnt >= n//2 or check(a[cnt:n-cnt]) or check(b[cnt:n-cnt]):
            return True
        return False`,
    },
    {
      script: Script.RUST,
      time: 12,
      memory: 3.1,
      desc: '同上',
      code: `impl Solution {
    pub fn check_palindrome_formation(a: String, b: String) -> bool {
        let check = |s: &[char]| {
            let (mut l, mut r) = (0, s.len() - 1);
            while l < r {
                if s[l] != s[r] {
                    return false;
                }
                l += 1;
                r -= 1;
            }
            true
        };
        let a = a.chars().collect::<Vec<char>>();
        let b = b.chars().collect::<Vec<char>>();
        let (n, mut cnt) = (a.len(), 0);
        while cnt < n && a[cnt] == b[n - 1 - cnt] {
            cnt += 1;
        }
        if cnt >= n / 2 || check(&a[cnt..n - cnt]) || check(&b[cnt..n - cnt]) {
            return true;
        }
        cnt = 0;
        while cnt < n && b[cnt] == a[n - 1 - cnt] {
            cnt += 1;
        }
        if cnt >= n / 2 || check(&a[cnt..n - cnt]) || check(&b[cnt..n - cnt]) {
            return true;
        }
        false
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
