import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '1819. 序列中不同最大公约数的数目',
  url: 'https://leetcode.cn/problems/rearrange-characters-to-make-target-string/',
  difficulty: Difficulty.简单,
  tag: [Tag.哈希表, Tag.字符串, Tag.计数],
  desc: `从 s 中取出字符并重新排列，返回可以形成 target 的 最大 副本数。`,
  solutions: [
    {
      script: Script.CPP,
      time: 1156,
      memory: 114.2,
      desc: '对每个数进行判断是否可能是最大公约数',
      code: `class Solution {
public:
    int gcd(int a, int b) {
        if (!b)return a;
        return gcd(b, a % b);
    }
    int countDifferentSubsequenceGCDs(vector<int>& nums) {
        int n = nums.size(), ans = 0, nmax = 0;
        unordered_set<int> s;
        for (auto &num : nums) {
            nmax = max(nmax, num);
            s.insert(num);
        }
        vector<bool> l(nmax + 1, false);
        for (int i = 1; i <= nmax; i++) {
            if (s.count(i)) {
                ans++;
                continue;
            }
            int cur = -1;
            for (int j = 2; i * j <= nmax && cur != i; j++) {
                if (!s.count(i * j)) continue;
                if (cur == -1) cur = i * j;
                else cur = gcd(cur, i * j);
            }
            if (cur == i) ans++;
        }
        return ans;
    }
};`,
    },
    {
      script: Script.RUST,
      time: 60,
      memory: 3.2,
      desc: '同上',
      code: `impl Solution {
    fn gcd(a: i32, b: i32) -> i32 {
        if b == 0 {
            a
        } else {
            Solution::gcd(b, a % b)
        }
    }
    pub fn count_different_subsequence_gc_ds(nums: Vec<i32>) -> i32 {
        let mut max = 0;
        let mut ans = 0;
        let mut l = [false; 200005];
        for num in nums {
            max = max.max(num);
            l[num as usize] = true;
        }
        for i in 1..=max {
            if l[i as usize] {
                ans += 1;
                continue;
            }
            let mut j = 2;
            let mut cur = -1;
            while j * i <= max && cur != i {
                let num = i * j;
                if l[num as usize] {
                    cur = if cur == -1 {
                        num
                    } else {
                        Solution::gcd(cur, num)
                    }
                }
                j += 1;
            }
            if cur == i {
                ans += 1;
            }
        }
        ans
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
