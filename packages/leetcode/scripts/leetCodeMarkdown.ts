import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1163. 按字典序排在最后的子串',
  url: 'https://leetcode.cn/problems/last-substring-in-lexicographical-order/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `给你一个字符串 s ，找出它的所有子串并按字典序排列，返回排在最后的那个子串。`,
  solutions: [
//     {
//       script: Script.TS,
//       time: 372,
//       memory: 102,
//       desc: 'trie',
//       code: `type Fn = (...params: any) => any;

// const EmptyResult = Symbol('EmptyResult');

// class Trie {
//   children = new Map<any, Trie>();
//   result: any = EmptyResult;
//   constructor(public val: any) {}
// }

// function memoize(fn: Fn): Fn {
//   const root = new Trie(null);
//   return function (...args: any[]) {
//     let node = root;
//     for (const arg of args) {
//       let next = node.children.get(arg);
//       if (!next) node.children.set(arg, (next = new Trie(arg)));
//       node = next;
//     }
//     if (node.result !== EmptyResult) return node.result;
//     return (node.result = fn(...args));
//   };
// }`,
//     },
    {
      script: Script.CPP,
      time: 44,
      memory: 25.8,
      desc: '先找到最末尾的字符，再对该字符为起点到结尾的字符串进行比较',
      code: `class Solution {
public:
    string lastSubstring(string s) {
        int n = s.size(), imax = 0;
        vector<int> idxs;
        for (int i = 0; i < n; i++) {
            if (s[imax] < s[i]) imax = i, idxs.clear();
            if (s[imax] == s[i]) idxs.push_back(i);
        }
        imax = 0;
        for (int i = 1; i < idxs.size(); i++) {
            int i1 = idxs[imax] + 1, i2 = idxs[i] + 1;
            while (i2 < n && s[i1] == s[i2]) i1++, i2++;
            if (i2 == n) break;
            if (s[i1] < s[i2]) imax = i;
        }
        return s.substr(idxs[imax], n - idxs[imax]);
    }
};`,
    },
    {
      script: Script.PY3,
      time: 6360,
      memory: 18,
      desc: '同上',
      code: `class Solution:
  def lastSubstring(self, s: str) -> str:
      return max(s[i:] for i in range(len(s)))`,
    },
    {
      script: Script.RUST,
      time: 16,
      memory: 5.9,
      desc: '同上',
      code: `fn str_to_vec(s: &String) -> Vec<char> {
    s.chars().collect()
}
impl Solution {
    pub fn last_substring(s: String) -> String {
        let s = str_to_vec(&s);
        let n = s.len();
        let mut imax = 0;
        let mut idxs = vec![];
        for i in 0..n {
            if (s[imax] as u8) < (s[i] as u8) {
                imax = i;
                idxs.clear();
            }
            if (s[imax] as u8) == (s[i] as u8) {
                idxs.push(i);
            }
        }
        imax = 0;
        for i in 1..idxs.len() {
            let (mut i1, mut i2) = (idxs[imax] + 1, idxs[i] + 1);
            while i2 < n && s[i1] == s[i2] {
                i1 += 1;
                i2 += 1;
            }
            if i2 == n {
                break;
            }
            if s[i1] < s[i2] {
                imax = i;
            }
        }
        String::from_utf8(s[idxs[imax]..].iter().map(|v| *v as u8).collect()).unwrap()
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
