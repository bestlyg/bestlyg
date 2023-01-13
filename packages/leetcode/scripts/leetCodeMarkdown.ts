import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '2287. 重排字符形成目标字符串',
  url: 'https://leetcode.cn/problems/rearrange-characters-to-make-target-string/',
  difficulty: Difficulty.简单,
  tag: [Tag.哈希表, Tag.字符串, Tag.计数],
  desc: `从 s 中取出字符并重新排列，返回可以形成 target 的 最大 副本数。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 6,
      desc: '遍历',
      code: `class Solution {
public:
    int rearrangeCharacters(string s, string target) {
        int l1[26] = {0}, l2[26] = {0}, ans = 0x7fffffff;
        for (auto &c : s) l1[c - 'a']++;
        for (auto &c : target) l2[c - 'a']++;
        for (int i = 0; i < 26; i++) {
            if (l2[i] == 0) continue;
            ans = min(ans, l1[i] / l2[i]);
        }
        return ans;
    }
};`,
    },
    {
      script: Script.RUST,
      time: 0,
      memory: 2.2,
      desc: '同上',
      code: `impl Solution {
    pub fn rearrange_characters(s: String, target: String) -> i32 {
        let mut ans = i32::MAX;
        let (mut l1, mut l2) = ([0; 26], [0; 26]);
        s.chars().for_each(|c| {
            l1[c as usize - 'a' as usize] += 1;
        });
        target.chars().for_each(|c| {
            l2[c as usize - 'a' as usize] += 1;
        });
        for i in 0..26 {
            if l2[i] != 0 {
                ans = ans.min(l1[i] / l2[i]);
            }
        }
        ans
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
