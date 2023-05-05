import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '2432. 处理用时最长的那个任务的员工',
  url: 'https://leetcode.cn/problems/the-employee-that-worked-on-the-longest-task/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `返回处理用时最长的那个任务的员工的 id 。`,
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
      time: 56,
      memory: 34.8,
      desc: '遍历',
      code: `class Solution {
public:
    int hardestWorker(int n, vector<vector<int>>& logs) {
        int prev = 0, resVal = 0, res;
        for (auto &log : logs) {
            int val = log[1] - prev;
            if (val > resVal || val == resVal && log[0] < res) resVal = val, res = log[0];
            prev = log[1];
        }
        return res;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 368,
      memory: 16.2,
      desc: '同上',
      code: `class Solution:
    def hardestWorker(self, n: int, logs: List[List[int]]) -> int:
        prev = 0
        resVal = 0
        res = 0
        for log in logs:
            val = log[1] - prev
            if val > resVal or val == resVal and log[0] < res:
                resVal = val
                res = log[0]
            prev = log[1]
        return res`,
    },
    {
      script: Script.RUST,
      time: 8,
      memory: 2,
      desc: '同上',
      code: `impl Solution {
    pub fn hardest_worker(n: i32, logs: Vec<Vec<i32>>) -> i32 {
        let mut prev = 0;
        let mut resVal = 0;
        let mut res = 0;
        for log in logs {
            let val = log[1] - prev;
            if val > resVal || val == resVal && log[0] < res {
                resVal = val;
                res = log[0];
            }
            prev = log[1];
        }
        res
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
