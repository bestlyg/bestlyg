import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '2437. 有效时间的数目',
  url: 'https://leetcode.cn/problems/number-of-valid-clock-times/',
  difficulty: Difficulty.简单,
  tag: [],
  desc: `请你返回一个整数 answer ，将每一个 ? 都用 0 到 9 中一个数字替换后，可以得到的有效时间的数目。`,
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
      time: 0,
      memory: 5.9,
      desc: '枚举',
      code: `class Solution {
public:
    int countTime(string time) {
        vector<int> idxs;
        for (int i = 0; i < time.size(); i++) {
            if (time[i] == '?') idxs.push_back(i);
        }
        int res = 0;
        if (idxs.empty()) {
            return check(time) ? 1 : 0;
        }
        function<void(int, string)> dfs = [&](int idx, string time) {
            if (idx == idxs.size()) {
                if (check(time)) res++;
                return;
            }
            for (int i = 0; i <= 9; i++) {
                time[idxs[idx]] = i + '0';
                dfs(idx + 1, time);
            }
        };
        dfs(0, time);
        return res;
    }
    bool check(string &time) {
        int h = (time[0] - '0') * 10 + (time[1] - '0'), 
            m = (time[3] - '0') * 10 + (time[4] - '0'); 
        if (h >= 24 || m >= 60) return false;
        return true;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 48,
      memory: 15.9,
      desc: '同上',
      code: `class Solution:
    def countTime(self, time: str) -> int:
        time = list(time)
        def check(time: str) -> bool:
            h = (ord(time[0]) - ord('0')) * 10 + ord(time[1]) - ord('0')
            m = (ord(time[3]) - ord('0')) * 10 + ord(time[4]) - ord('0')
            return h < 24 and m < 60
        idxs = []
        for i in range(len(time)):
            if time[i] == '?':
                idxs.append(i)
        if len(idxs) == 0:
            return 1 if check(time) else 0
        res = 0

        def dfs(idx: int, time: List[str]):
            nonlocal res
            if idx == len(idxs):
                if check(time):
                    res += 1
            else:
                for i in range(0, 10):
                    time[idxs[idx]] = chr(i + ord('0'))
                    dfs(idx+1, time)
        dfs(0, time)
        return res`,
    },
    {
      script: Script.RUST,
      time: 0,
      memory: 1.9,
      desc: '同上',
      code: `fn str_to_vec(s: &String) -> Vec<char> {
    s.chars().collect()
}
impl Solution {
    pub fn count_time(time: String) -> i32 {
        let time = str_to_vec(&time);
        let mut idxs = vec![];
        for i in 0..time.len() {
            if time[i] == '?' {
                idxs.push(i);
            }
        }
        if idxs.is_empty() {
            if Solution::check(&time) {
                1
            } else {
                0
            }
        } else {
            let mut res = 0;
            Solution::dfs(&mut res, &idxs, 0, time);
            res
        }
    }
    fn check(time: &Vec<char>) -> bool {
        let h = (time[0] as u8 - b'0') * 10 + (time[1] as u8 - b'0');
        let m = (time[3] as u8 - b'0') * 10 + (time[4] as u8 - b'0');
        h < 24 && m < 60
    }
    fn dfs(res: &mut i32, idxs: &Vec<usize>, idx: usize, mut time: Vec<char>) {
        if idx == idxs.len() {
            if Solution::check(&time) {
                *res += 1;
            }
        } else {
            for i in 0..10 {
                time[idxs[idx]] = (i + b'0') as char;
                Solution::dfs(res, idxs, idx + 1, time.clone());
            }
        }
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
