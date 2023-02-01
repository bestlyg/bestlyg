import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '2325. 解密消息',
  url: 'https://leetcode.cn/problems/decode-the-message/',
  difficulty: Difficulty.简单,
  tag: [Tag.哈希表, Tag.字符串],
  desc: `返回解密后的消息。`,
  solutions: [
    {
      script: Script.CPP,
      time: 24,
      memory: 15.9,
      desc: '遍历',
      code: `class Solution {
public:
    string decodeMessage(string key, string message) {
        char list[26] = {0};
        for (int i = 0, p = 'a'; i < key.size(); i++) {
            if (key[i] != ' ' && list[key[i] - 'a'] == 0) list[key[i] - 'a'] = p++;
        }
        string ans = "";
        for (auto &c : message) {
            if (c == ' ') ans += " ";
            else ans += list[c - 'a'];
        }
        return ans;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 48,
      memory: 15.1,
      desc: '同上',
      code: `class Solution:
    def decodeMessage(self, key: str, message: str) -> str:
        list = [''] * 26
        p = 'a'
        for c in key:
            i = ord(c) - ord('a')
            if c != ' ' and list[i] == '':
                list[i] = p
                p = chr(ord(p) + 1)
        ans = ''
        for c in message:
            if c == ' ':
                ans += ' '
            else:
                ans += list[ord(c) - ord('a')]
        return ans`,
    },
    {
      script: Script.RUST,
      time: 0,
      memory: 2.1,
      desc: '同上',
      code: `impl Solution {
    pub fn decode_message(key: String, message: String) -> String {
        let message = message.chars().collect::<Vec<char>>();
        let key = key.chars().collect::<Vec<char>>();
        let mut list = ['\\0'; 26];
        let mut ans = String::new();
        let mut p = 'a';
        for c in key {
            let i = c as usize - 'a' as usize;
            if c != ' ' && list[i] == '\\0' {
                list[i] = p;
                p = (p as u8 + 1) as char;
            }
        }
        for c in message {
            if c == ' ' {
                ans.push(' ');
            } else {
                ans.push(list[c as usize - 'a' as usize]);
            }
        }
        ans
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
