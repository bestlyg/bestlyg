import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '831. 隐藏个人信息',
  url: 'https://leetcode.cn/problems/masking-personal-information/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `给你一条个人信息字符串 s ，可能表示一个 邮箱地址 ，也可能表示一串 电话号码 。返回按如下规则 隐藏 个人信息后的结果。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 6,
      desc: '模拟',
      code: `class Solution {
public:
    string maskPII(string s) {
        if (isEmail(s)) return formatEmail(s);
        return formatPhone(s);
    }
    bool isEmail(string &s) {
        return s.find('@') != string::npos;
    }
    string formatEmail(string &s) {
        string res = "";
        res += tolower(s[0]);
        res += "*****";
        int i = 0;
        while (s[i + 1] != '@') i++;
        while (i < s.size()) res += tolower(s[i++]);
        return res;
    }
    string formatPhone(string &s) {
        string formats = "", res = "";
        for (auto &c : s) 
            if (isdigit(c)) formats += c;
        switch(formats.size() - 10) {
            case 1: res += "+*-"; break;
            case 2: res += "+**-"; break;
            case 3: res += "+***-"; break;
        }
        res += "***-***-" + formats.substr(formats.size() - 4, 4);
        return res;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 44,
      memory: 15,
      desc: '同上',
      code: `class Solution:
    def maskPII(self, s: str) -> str:
        def isEmail(s: str):
            return s.find('@') != -1

        def formatEmail(s: str):
            res = ""
            res += s[0].lower() + '*****'
            i = 0
            while s[i+1] != '@':
                i += 1
            while i < len(s):
                res += s[i].lower()
                i += 1
            return res

        def formatPhone(s: str):
            formats, res = "", ""
            for c in s:
                if c.isdigit():
                    formats += c
            pre = len(formats) - 10
            if pre == 1:
                res += "+*-"
            elif pre == 2:
                res += "+**-"
            elif pre == 3:
                res += "+***-"
            res += "***-***-" + formats[-4:]
            return res

        return formatEmail(s) if isEmail(s) else formatPhone(s)`,
    },
    {
      script: Script.RUST,
      time: 0,
      memory: 2.3,
      desc: '同上',
      code: `impl Solution {
    pub fn mask_pii(s: String) -> String {
        let s = s.chars().collect::<Vec<char>>();
        fn format_email(s: &Vec<char>) -> String {
            let mut res = String::new();
            res.push_str(&s[0].to_lowercase().to_string());
            res.push_str("*****");
            let mut i = 0;
            while s[i + 1] != '@' {
                i += 1;
            }
            while i < s.len() {
                res.push_str(&s[i].to_lowercase().to_string());
                i += 1;
            }
            res
        }

        fn format_phone(s: &Vec<char>) -> String {
            let mut formats = vec![];
            for c in s {
                if c.is_numeric() {
                    formats.push(*c);
                }
            }
            let mut res = String::new();
            match formats.len() - 10 {
                1 => res.push_str("+*-"),
                2 => res.push_str("+**-"),
                3 => res.push_str("+***-"),
                _ => {}
            }
            res.push_str("***-***-");
            res.push_str(
                &String::from_utf8(
                    formats[formats.len() - 4..]
                        .iter()
                        .map(|v| *v as u8)
                        .collect::<Vec<u8>>(),
                )
                .unwrap(),
            );
            res
        }
        if s.contains(&'@') {
            format_email(&s)
        } else {
            format_phone(&s)
        }
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
