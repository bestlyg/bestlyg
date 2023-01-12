import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1807. 替换字符串中的括号内容',
  url: 'https://leetcode.cn/problems/evaluate-the-bracket-pairs-of-a-string/',
  difficulty: Difficulty.中等,
  tag: [Tag.数组, Tag.哈希表, Tag.字符串],
  desc: `给你一个字符串 s ，它包含一些括号对，每个括号中包含一个 非空 的键。请你返回替换 所有 括号对后的结果字符串。`,
  solutions: [
    {
      script: Script.CPP,
      time: 368,
      memory: 114.3,
      desc: '遍历',
      code: `class Solution {
public:
    string evaluate(string s, vector<vector<string>>& knowledge) {
        unordered_map<string, string> m;
        for (auto &item : knowledge) m[item[0]] = item[1];
        string ans = "";
        for (int i = 0; i < s.size(); i++) {
            if (s[i] != '(') ans += s[i];
            else {
                cout << "i = " << i << endl;
                int start = i + 1;
                while (s[i] != ')') i++;
                string key = s.substr(start, i - start);
                if (!m.count(key)) ans += "?";
                else ans += m[key];
            }
        }
        return ans;
    }
};`,
    },
    {
      script: Script.RUST,
      time: 76,
      memory: 33.9,
      desc: '同上',
      code: `use std::collections::HashMap;
impl Solution {
    pub fn evaluate(s: String, knowledge: Vec<Vec<String>>) -> String {
        let s = s.chars().collect::<Vec<char>>();
        let mut ans = String::new();
        let mut m = HashMap::<String, String>::new();
        for item in knowledge {
            m.insert(item[0].clone(), item[1].clone());
        }
        let default_value = "?".to_string();
        let mut i = 0;
        while i < s.len() {
            if s[i] != '(' {
                ans.push(s[i]);
            } else {
                let start = i + 1;
                while s[i] != ')' {
                    i += 1;
                }
                let key = s[start..i].iter().collect::<String>();
                let s: &String = m.get(&key).unwrap_or_else(||&default_value);
                ans.push_str(s);
            }
            i += 1;
        }
        ans
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
