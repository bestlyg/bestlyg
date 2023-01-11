import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '2283. 判断一个数的数字计数是否等于数位的值',
  url: 'https://leetcode.cn/problems/check-if-number-has-equal-digit-count-and-digit-value/',
  difficulty: Difficulty.简单,
  tag: [Tag.哈希表, Tag.字符串, Tag.计数],
  desc: `如果对于 每个 0 <= i < n 的下标 i ，都满足数位 i 在 num 中出现了 num[i]次，那么请你返回 true ，否则返回 false 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 4,
      memory: 5.7,
      desc: '遍历',
      code: `class Solution {
public:
    bool digitCount(string num) {
        int n = num.size(), l[10] = {0};
        for (auto &c : num) l[c - '0']++;
        for (int i = 0; i < n; i++) {
            if (num[i] - '0' != l[i]) return false;
        }
        return true;
    }
};`,
    },
    {
      script: Script.RUST,
      time: 0,
      memory: 2.2,
      desc: '同上',
      code: `impl Solution {
    pub fn digit_count(num: String) -> bool {
        let mut l = [0; 10];
        let n = num.len();
        let num = num.chars().collect::<Vec<char>>();
        for c in num.iter() {
            l[*c as usize - '0' as usize] += 1;
        }
        for i in 0..n {
            if num[i] as usize - '0' as usize != l[i] {
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
