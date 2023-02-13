import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1234. 替换子串得到平衡字符串',
  url: 'https://leetcode.cn/problems/replace-the-substring-for-balanced-string/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `请返回待替换子串的最小可能长度。`,
  solutions: [
    {
      script: Script.CPP,
      time: 16,
      memory: 7.5,
      desc: '双指针，找出所有可以匹配的段落',
      code: `class Solution {
public:
    int id(char c) {
        switch (c) {
            case 'Q': return 0;
            case 'W': return 1;
            case 'E': return 2;
            case 'R': return 3;
        }
        return -1;
    }
    bool isBalance(int *cnt, int target) {
        return cnt[0] <= target && cnt[1] <= target && cnt[2] <= target && cnt[3] <= target;
    }
    int balancedString(string s) {
        int n = s.size(), m = n / 4, cnt[4] = {0};
        for (auto &c : s) cnt[id(c)] += 1;
        if (isBalance(cnt, m)) return 0;
        int ans = 0x3f3f3f3f;
        for (int l = 0, r = 0; r < n; r++) {
            cnt[id(s[r])]--;
            while (l < r && isBalance(cnt, m)) {
                cnt[id(s[l])]++;
                if (isBalance(cnt, m)) l++;
                else { cnt[id(s[l])]--; break; }
            }
            if (isBalance(cnt, m)) ans = min(ans, r - l + 1);
        }
        return ans;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 348,
      memory: 15.4,
      desc: '同上',
      code: `class Solution:
    def balancedString(self, s: str) -> int:
        n = len(s)
        m = int(n/4)
        cnt = [0] * 4

        def getId(c: str) -> int:
            match c:
                case 'Q': return 0
                case 'W': return 1
                case 'E': return 2
                case 'R': return 3
            return -1

        def isBalance() -> bool:
            nonlocal m, cnt
            return cnt[0] <= m and cnt[1] <= m and cnt[2] <= m and cnt[3] <= m

        for c in s:
            cnt[getId(c)] += 1
        if isBalance():
            return 0
        ans = 0x3f3f3f3f
        l = 0
        for r in range(0, n):
            cnt[getId(s[r])] -= 1
            while l < r and isBalance():
                cnt[getId(s[l])] += 1
                if isBalance():
                    l += 1
                else:
                    cnt[getId(s[l])] -= 1
                    break
            if isBalance():
                ans = min(ans, r - l+1)
        return ans`,
    },
    {
      script: Script.RUST,
      time: 8,
      memory:2.5,
      desc: '同上',
      code: `impl Solution {
    pub fn balanced_string(s: String) -> i32 {
        let s = s.chars().collect::<Vec<char>>();
        let n = s.len();
        let m = (n / 4) as i32;
        let mut cnt = [0; 4];
        let id = |c| match c {
            'Q' => 0,
            'W' => 1,
            'E' => 2,
            'R' => 3,
            _ => 0,
        };
        let is_balance = |cnt: &[i32; 4]| cnt[0] <= m && cnt[1] <= m && cnt[2] <= m && cnt[3] <= m;
        for c in s.iter() {
            cnt[id(*c)] += 1;
        }
        if is_balance(&cnt) {
            0
        } else {
            let mut ans = 0x3f3f3f3f;
            let mut l = 0;
            for r in 0..n {
                cnt[id(s[r])] -= 1;
                while l < r && is_balance(&cnt) {
                    cnt[id(s[l])] += 1;
                    if is_balance(&cnt) {
                        l += 1;
                    } else {
                        cnt[id(s[l])] -= 1;
                        break;
                    }
                }
                if is_balance(&cnt) {
                    ans = ans.min(r - l + 1);
                }
            }
            ans as i32
        }
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
