import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '2299. 强密码检验器 II',
  url: 'https://leetcode.cn/problems/strong-password-checker-ii/',
  difficulty: Difficulty.简单,
  tag: [Tag.字符串],
  desc: `给你一个字符串 password ，如果它是一个 强 密码，返回 true，否则返回 false 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 5.9,
      desc: '遍历',
      code: `class Solution {
public:
    bool strongPasswordCheckerII(string password) {
        bool f[4] = {false};
        string spec = "!@#$%^&*()-+";
        for (int i = 0; i < password.size(); i++) {
            if (islower(password[i])) f[0] = true;
            if (isupper(password[i])) f[1] = true;
            if (isdigit(password[i])) f[2] = true;
            if (spec.find(password[i]) != string::npos) f[3] = true;
            if (i != 0 && password[i] == password[i - 1]) return false;
        }
        return f[0] && f[1] && f[2] && f[3] && password.size() >= 8;
    }
};`,
    },
    {
      script: Script.RUST,
      time: 0,
      memory: 2,
      desc: '同上',
      code: `impl Solution {
pub fn strong_password_checker_ii(password: String) -> bool {
    let spec = "!@#$%^&*()-+";
    let s = password.chars().collect::<Vec<char>>();
    let mut f = [false; 4];
    for i in 0..s.len() {
        if s[i].is_lowercase() {
            f[0] = true;
        }
        if s[i].is_uppercase() {
            f[1] = true;
        }
        if s[i].is_digit(10) {
            f[2] = true;
        }
        if spec.contains(s[i]) {
            f[3] = true;
        }
        if i > 0 && s[i] == s[i - 1] {
            return false;
        }
    }
    s.len() >= 8 && f[0] && f[1] && f[2] && f[3]
}`,
    },
    {
      script: Script.PY3,
      time: 40,
      memory: 14.9,
      desc: '同上',
      code: `class Solution:
def strongPasswordCheckerII(self, password: str) -> bool:
    spec = "!@#$%^&*()-+"
    f = [False for _ in range(4)]
    for i, c in enumerate(password):
        f[0] |= c.islower()
        f[1] |= c.isupper()
        f[2] |= c.isdigit()
        f[3] |= spec.find(c) != -1
        if i != 0 and password[i - 1] == c:
            return False
    return len(password) >= 8 and f[0] and f[1] and f[2] and f[3]`,
    },
  ],
};

export default leetCodeMarkdown;
