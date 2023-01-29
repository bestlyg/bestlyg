import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '2315. 统计星号',
  url: 'https://leetcode.cn/problems/count-asterisks/',
  difficulty: Difficulty.简单,
  tag: [Tag.字符串],
  desc: `请你返回 不在 竖线对之间，s 中 '*' 的数目。`,
  solutions: [
    {
      script: Script.CPP,
      time: 4,
      memory: 6.5,
      desc: '遍历',
      code: `class Solution {
public:
    int countAsterisks(string s) {
        istringstream iss(s);
        string tmp;
        int ans = 0;
        for (int i = 0; getline(iss, tmp, '|'); i++) {
            if (i % 2 == 0) 
                for (auto &c : tmp) if (c == '*') ans++;
        }
        return ans;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 48,
      memory: 15,
      desc: '同上',
      code: `class Solution:
    def countAsterisks(self, s: str) -> int:
        list = s.split('|')
        ans = 0
        for i in range(len(list)):
            if i % 2 == 0:
                for c in list[i]:
                    if c == '*':
                        ans += 1
        return ans`,
    },
    {
      script: Script.RUST,
      time: 0,
      memory: 2.1,
      desc: '同上',
      code: `impl Solution {
    pub fn count_asterisks(s: String) -> i32 {
        let list = s.split('|').collect::<Vec<_>>();
        let mut ans = 0;
        for i in 0..list.len() {
            if i % 2 == 0 {
                for c in list[i].chars() {
                    if c == '*' {
                        ans += 1
                    }
                }
            }
        }
        ans
    }
}`,
    },
    {
      script: Script.TS,
      time: 68,
      memory: 43.9,
      desc: '同上',
      code: `function countAsterisks(s: string): number {
        return s.split('|').filter((_, i) => i % 2 === 0).reduce((sum, cur) => sum + cur.split('').filter(v => v === '*').length, 0)
    };`,
    },
  ],
};

export default leetCodeMarkdown;
