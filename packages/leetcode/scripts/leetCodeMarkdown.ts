import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1003. 检查替换后的词是否有效',
  url: 'https://leetcode.cn/problems/check-if-word-is-valid-after-substitutions/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `给你一个字符串 s ，请你判断它是否 有效 。`,
  solutions: [
    {
      script: Script.TS,
      time: 184,
      memory: 48.3,
      desc: '遍历',
      code: `function isValid(s: string): boolean {
    while (s != "") {
        const n = s.replace("abc", "");
        if (n == s) return false;
        s = n;
    }
    return s == "";
};`,
    },
    {
      script: Script.CPP,
      time: 328,
      memory: 8.4,
      desc: '一直找abc子串，替换成空串，直到不能再替换。',
      code: `class Solution {
public:
    bool isValid(string s) {
        string next;
        do {
            int p = s.find("abc", 0);
            if (p == -1) return false;
            next = s.replace(p, 3, "");
        } while (next != "");
        return true;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 56,
      memory: 16.2,
      desc: '同上',
      code: `class Solution:
    def isValid(self, s: str) -> bool:
        while s != "":
            n = s.replace("abc", "")
            if n == s: return False
            s = n
        return s == ""`,
    },
    {
      script: Script.RUST,
      time: 4,
      memory: 2.1,
      desc: '同上',
      code: `impl Solution {
    pub fn is_valid(mut s: String) -> bool {
        while s != "" {
            let n = s.replace("abc", "");
            if n == s {
                return false;
            }
            s = n;
        }
        s == ""
    }
}
`,
    },
  ],
};

export default leetCodeMarkdown;
