import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1023. 驼峰式匹配',
  url: 'https://leetcode.cn/problems/camelcase-matching/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `如果我们可以将小写字母插入模式串 pattern 得到待查询项 query，那么待查询项与给定模式串匹配。`,
  solutions: [
    {
      script: Script.CPP,
      time: 4,
      memory: 6.9,
      desc: '遍历',
      code: `class Solution {
public:
    vector<bool> camelMatch(vector<string>& queries, string pattern) {
        auto check = [&](string &s) {
            int pidx = 0;
            for (int i = 0; i < s.size(); i++) {
                if (pidx < pattern.size() && s[i] == pattern[pidx]) pidx++;
                else if (isupper(s[i])) return false;
            }
            return pidx == pattern.size();
        };
        vector<bool> res;
        for (auto &q : queries) res.push_back(check(q));
        return res;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 36,
      memory: 14.8,
      desc: '同上',
      code: `class Solution:
    def camelMatch(self, queries: List[str], pattern: str) -> List[bool]:
        def check(s: str):
            pidx = 0
            for c in s:
                if pidx < len(pattern) and c == pattern[pidx]:
                    pidx += 1
                elif c.isupper():
                    return False
            return pidx == len(pattern)
        return [check(s) for s in queries]`,
    },
    {
      script: Script.RUST,
      time: 0,
      memory: 2,
      desc: '同上',
      code: `impl Solution {
    pub fn camel_match(queries: Vec<String>, pattern: String) -> Vec<bool> {
        let pattern = pattern.chars().collect::<Vec<_>>();
        queries
            .into_iter()
            .map(|s| {
                let mut pidx = 0;
                for c in s.chars() {
                    if pidx < pattern.len() && c == pattern[pidx] {
                        pidx += 1
                    } else if c.is_uppercase() {
                        return false;
                    }
                }
                pidx == pattern.len()
            })
            .collect::<Vec<_>>()
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
