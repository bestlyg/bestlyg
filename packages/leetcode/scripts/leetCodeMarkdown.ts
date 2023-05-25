import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '2451. 差值数组不同的字符串',
  url: 'https://leetcode.cn/problems/odd-string-difference/',
  difficulty: Difficulty.简单,
  tag: [],
  desc: `给你一个字符串数组 words ，每一个字符串长度都相同，令所有字符串的长度都为 n 。`,
  solutions: [
//     {
//       script: Script.TS,
//       time: 56,
//       memory: 44.2,
//       desc: '存储nums后，valueOf中累加，toString中返回字符串',
//       code: `class ArrayWrapper {
//     constructor(public nums: number[]) {}
//     valueOf() {
//         return this.nums.reduce((sum, num) => sum + num, 0);
//     }
//     toString() {
//         return \`[\${this.nums.join(',')}]\`;
//     }
// };`,
//     },
        {
          script: Script.CPP,
          time: 4,
          memory: 7.4,
          desc: '哈希存储',
          code: `class Solution {
public:
    string oddString(vector<string>& words) {
        unordered_map<string, vector<string>> m;
        for (auto &w : words) {
            string key = "";            
            for (int i = 0; i < w.size() - 1; i++) key += to_string(w[i + 1] - w[i] + '0');
            m[key].push_back(w);
        }
        for (auto &item : m) {
            if (item.second.size() == 1) return item.second[0];
        }
        return words[0];
    }
};`,
        },
        {
          script: Script.PY3,
          time: 48,
          memory:15.9,
          desc: '同上',
          code: `class Solution:
    def oddString(self, words: List[str]) -> str:
        m = dict()
        for w in words:
            key = ""
            for i in range(len(w) - 1):
                key += chr(ord(w[i + 1]) - ord(w[i]) + ord('0'))
            if not key in m: m[key] = []
            m[key].append(w)
        for v in m.values():
            if len(v) == 1:
                return v[0]
        return words[0]`,
        },
        {
          script: Script.RUST,
          time: 0,
          memory: 2.1,
          desc: '同上',
          code: `pub fn str_to_vec(s: &String) -> Vec<char> {
    s.chars().collect()
}
impl Solution {
    pub fn odd_string(words: Vec<String>) -> String {
        let mut m = std::collections::HashMap::<String, Vec<String>>::new();
        for w in words {
            let mut key = String::new();
            {
                let w: Vec<char> = str_to_vec(&w);
                for i in 0..w.len() - 1 {
                    key.push((w[i + 1] as u8 - w[i] as u8 + b'0') as char);
                }
            }
            m.entry(key).or_insert(vec![]).push(w);
        }
        for (_, list) in m.into_iter() {
            if list.len() == 1 {
                return list[0].clone();
            }
        }
        String::new()
    }
}`,
        },
  ],
};

export default leetCodeMarkdown;
