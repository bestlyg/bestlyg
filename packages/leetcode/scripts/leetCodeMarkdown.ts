import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1419. 数青蛙',
  url: 'https://leetcode.cn/problems/minimum-number-of-frogs-croaking/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `请你返回模拟字符串中所有蛙鸣所需不同青蛙的最少数目。`,
  solutions: [
//     {
//       script: Script.TS,
//       time: 184,
//       memory: 48.3,
//       desc: '遍历',
//       code: `function isValid(s: string): boolean {
//     while (s != "") {
//         const n = s.replace("abc", "");
//         if (n == s) return false;
//         s = n;
//     }
//     return s == "";
// };`,
//     },
    {
      script: Script.CPP,
      time: 24,
      memory: 9,
      desc: '遍历',
      code: `class Solution {
public:
    int minNumberOfFrogs(string croakOfFrogs) {
        int n = croakOfFrogs.size(), wait[5] = {0}, res = 0;
        unordered_map<char, int> m;
        m['c'] = 0; m['r'] = 1; m['o'] = 2; m['a'] = 3; m['k'] = 4;
        for (int i = 0; i < n; i++) {
            int idx = m[croakOfFrogs[i]];
            if (idx == 0) {
                if (wait[4] == 0) res++;
                else wait[4] -= 1;
                wait[idx]++;
            } else {
                if (wait[idx - 1] == 0) return -1;
                wait[idx - 1]--;
                wait[idx]++;
            }
        }
        return wait[4] == res ? res : -1;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 172,
      memory: 16.6,
      desc: '同上',
      code: `class Solution:
    def minNumberOfFrogs(self, croakOfFrogs: str) -> int:
        n = len(croakOfFrogs)
        wait = [0] * 5
        res = 0
        m = {}
        m['c'] = 0
        m['r'] = 1
        m['o'] = 2
        m['a'] = 3
        m['k'] = 4
        for i in range(n):
            idx = m[croakOfFrogs[i]]
            if idx == 0:
                if wait[4] == 0:
                    res += 1
                else:
                    wait[4] -= 1
                wait[idx] += 1
            else:
                if wait[idx - 1] == 0:
                    return -1
                wait[idx-1] -= 1
                wait[idx] += 1
        return res if wait[4] == res else -1`,
    },
    {
      script: Script.RUST,
      time: 4,
      memory: 2.6,
      desc: '同上',
      code: `fn get_idx(c: char) -> usize {
    match c {
        'c' => 0,
        'r' => 1,
        'o' => 2,
        'a' => 3,
        'k' => 4,
        _ => 0,
    }
}
fn str_to_vec(s: &String) -> Vec<char> {
    s.chars().collect()
}
impl Solution {
    pub fn min_number_of_frogs(croak_of_frogs: String) -> i32 {
        let croak_of_frogs = str_to_vec(&croak_of_frogs);
        let n = croak_of_frogs.len();
        let mut wait = vec![0; 5];
        let mut res = 0;
        for i in 0..croak_of_frogs.len() {
            let idx = get_idx(croak_of_frogs[i]);
            if idx == 0 {
                if wait[4] == 0 {
                    res += 1
                } else {
                    wait[4] -= 1;
                }
                wait[idx] += 1;
            } else {
                if wait[idx - 1] == 0 {
                    return -1;
                };
                wait[idx - 1] -= 1;
                wait[idx] += 1
            }
        }
        return if wait[4] == res { res } else { -1 };
    }
}
`,
    },
  ],
};

export default leetCodeMarkdown;
