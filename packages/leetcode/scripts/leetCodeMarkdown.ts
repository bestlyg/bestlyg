import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1016. 子串能表示从 1 到 N 数字的二进制串',
  url: 'https://leetcode.cn/problems/binary-string-with-substrings-representing-1-to-n/',
  difficulty: Difficulty.简单,
  tag: [],
  desc: `给定一个二进制字符串 s 和一个正整数 n，如果对于 [1, n] 范围内的每个整数，其二进制表示都是 s 的 子字符串 ，就返回 true，否则返回 false 。`,
  solutions: [
    //     {
    //       script: Script.TS,
    //       time: 28,
    //       memory: 11.7,
    //       desc: '对于s统计所有出现的数字',
    //       code: `class Solution {
    // public:
    //     bool queryString(string s, int n) {
    //         unordered_set<int> sset;
    //         int len = s.size();
    //         for (int i = 0; i < len; i++) {
    //             int num = 0;
    //             for (int j = i; j < len && j - i + 1 < 32; j++) {
    //                 num = (num << 1) | (s[j] - '0');
    //                 sset.insert(num);
    //             }
    //         }
    //         for (int i = 1; i <= n; i++) {
    //             if (!sset.count(i)) return false;
    //         }
    //         return true;
    //     }
    // };`,
    //     },
    {
      script: Script.CPP,
      time: 4,
      memory: 6.3,
      desc: '对于s统计所有出现的数字',
      code: `class Solution {
public:
    bool queryString(string s, int n) {
        unordered_set<int> sset;
        int len = s.size();
        for (int i = 0; i < len; i++) {
            int num = 0;
            for (int j = i; j < len && j - i + 1 < 32; j++) {
                num = (num << 1) | (s[j] - '0');
                if (num <= n) sset.insert(num);
                else break;
            }
        }
        sset.erase(0);
        return sset.size() == n;
    }
};`,
    },
    {
      script: Script.CPP,
      time: 0,
      memory: 6.1,
      desc: '对于所有n计算二进制字符串是否存在s里',
      code: `class Solution {
public:
    bool queryString(string s, int n) {
        for (int num = 1; num <= n; num++) {
            string bin = bitset<32>(num).to_string(); 
            bin = bin.substr(bin.find('1'));
            if (s.find(bin) == string::npos) return false;
        }
        return true;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 52,
      memory: 16.1,
      desc: '同上',
      code: `class Solution:
    def queryString(self, s: str, n: int) -> bool:
        return all(bin(num)[2:] in s for num in range(1, n + 1))`,
    },
    {
      script: Script.RUST,
      time: 0,
      memory: 2.2,
      desc: '同上',
      code: `impl Solution {
    pub fn query_string(s: String, n: i32) -> bool {
        for num in 1..=n {
            let snum = format!("{:b}", num);
            if !s.contains(&snum) {
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
