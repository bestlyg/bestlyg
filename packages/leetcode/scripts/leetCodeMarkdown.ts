import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1625. 执行操作后字典序最小的字符串',
  url: 'https://leetcode.cn/problems/lexicographically-smallest-string-after-applying-operations//////',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `请你返回在 s 上执行上述操作任意次后可以得到的 字典序最小 的字符串。`,
  solutions: [
    {
      script: Script.CPP,
      time: 340,
      memory: 99,
      desc: 'bfs',
      code: `class Solution {
public:
    string findLexSmallestString(string s, int a, int b) {
        set<string> sset;
        sset.insert(s);
        queue<string> q;
        q.push(s);
        auto t1 = [&](string s) {
            for (int i = 1; i < s.size(); i += 2) s[i] = ((s[i] - '0' + a) % 10) + '0';
            return s;
        };
        auto t2 = [&](string &s) {
            return s.substr(s.size() - b, b + 1) + s.substr(0, s.size() - b);
        };
        while (q.size()) {
            string cur = q.front();
            q.pop();
            string n1 = t1(cur), n2 = t2(cur);
            if (!sset.count(n1)) sset.insert(n1), q.push(n1);
            if (!sset.count(n2)) sset.insert(n2), q.push(n2);
        }
        return *sset.begin();
    }
};`,
    },
    {
      script: Script.PY3,
      time: 1652,
      memory: 17.6,
      desc: '同上',
      code: `class Solution:
    def findLexSmallestString(self, s: str, a: int, b: int) -> str:
        set = SortedSet()
        set.add(s)
        q = Queue()
        q.put(s)

        def t1(s: str):
            res = ""
            for i in range(len(s)):
                if i % 2:
                    res += str((ord(s[i]) - ord('0') + a) % 10)
                else:
                    res += s[i]
            return res

        def t2(s: str):
            return s[len(s)-b:] + s[0:len(s)-b]
        while q.qsize():
            cur = q.get()
            n1, n2 = t1(cur), t2(cur)
            if not n1 in set:
                set.add(n1)
                q.put(n1)
            if not n2 in set:
                set.add(n2)
                q.put(n2)
        return set.pop(0)`,
    },
    {
      script: Script.RUST,
      time: 104,
      memory: 3.9,
      desc: '同上',
      code: `impl Solution {
    pub fn find_lex_smallest_string(s: String, a: i32, b: i32) -> String {
        let mut set = std::collections::BTreeSet::<String>::new();
        set.insert(s.clone());
        let mut q = std::collections::VecDeque::<String>::new();
        q.push_back(s.clone());
        let t1 = |s: String| -> String {
            let mut s = s.chars().map(|v| v as u8).collect::<Vec<u8>>();
            let mut i = 1;
            while i < s.len() {
                s[i] = (s[i] - '0' as u8 + a as u8) % 10 + '0' as u8;
                i += 2;
            }
            String::from_utf8(s).unwrap()
        };
        let t2 = |s: String| -> String {
            let s = s.chars().collect::<Vec<char>>();
            let s1 = &s[s.len() - b as usize..];
            let s2 = &s[0..s.len() - b as usize];
            let s1 = String::from_utf8(s1.iter().map(|v| *v as u8).collect::<Vec<u8>>()).unwrap();
            let s2 = String::from_utf8(s2.iter().map(|v| *v as u8).collect::<Vec<u8>>()).unwrap();
            [s1, s2].concat()
        };
        while !q.is_empty() {
            let cur = q.pop_front().unwrap();
            let (n1, n2) = (t1(cur.clone()), t2(cur.clone()));
            if !set.contains(&n1) {
                set.insert(n1.clone());
                q.push_front(n1.clone());
            }
            if !set.contains(&n2) {
                set.insert(n2.clone());
                q.push_front(n2.clone());
            }
        }
        set.into_iter().next().unwrap()
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
