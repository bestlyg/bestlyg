import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1156. 单字符重复子串的最大长度',
    url: 'https://leetcode.cn/problems/swap-for-longest-repeated-character-substring/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个字符串 text，你只能交换其中两个字符一次或者什么都不做，然后得到一些单字符重复的子串。返回其中最长的子串的长度。`,
    solutions: [
        //     {
        //       script: Script.TS,
        //       time: 76,
        //       memory: 45.3,
        //       desc: 'dfs',
        //       code: `// 特殊标识符，在左右相等时返回
        // }`,
        //     },
        {
            script: Script.CPP,
            time: 4,
            memory: 7.9,
            desc: '按字符统计数据',
            code: `#define pii pair<int, int>
#define X first
#define Y second
class Solution {
public:
    int maxRepOpt1(string text) {
        vector<vector<pii>> m(26);
        int res = 0, n = text.size();
        for (int i = 0; i < n; i++) {
            int start = i;
            while (i + 1 < n && text[i + 1] == text[start]) i++;
            m[text[start] - 'a'].push_back(make_pair(start, i));
            res = max(res, i - start + 1);
        }
        for (auto &list : m) {
            int n = list.size();
            for (int i = 0; i < n; i++) {
                if (n != 1) res = max(res, list[i].Y - list[i].X + 2);
                if (i + 1 < n && list[i].Y + 1 == list[i + 1].X - 1) {
                    int val = list[i].Y - list[i].X + 1 + list[i + 1].Y - list[i + 1].X + 1;
                    if (!(i == 0 && i + 2 == n)) val += 1;
                    res = max(res, val);
                }
            }
        }
        return res;
    }
};`,
        },
        {
            script: Script.PY3,
            time: 100,
            memory: 18.1,
            desc: '同上',
            code: `class Solution:
    def maxRepOpt1(self, text: str) -> int:
        m = [[] for _ in range(26)]
        res = 0
        n = len(text)
        i = 0
        while i < n:
            start = i
            while i + 1 < n and text[i + 1] == text[start]:
                i += 1
            m[ord(text[start]) - ord('a')].append((start, i))
            res = max(res, i - start + 1)
            i += 1
        for list in m:
            n = len(list)
            for i in range(n):
                if n != 1:
                    res = max(res, list[i][1] - list[i][0] + 2)
                if i + 1 < n and list[i][1] + 1 == list[i + 1][0] - 1:
                    val = list[i][1] - list[i][0] + 1 + \
                        list[i + 1][1] - list[i + 1][0] + 1
                    if not (i == 0 and i + 2 == n):
                        val += 1
                    res = max(res, val)
        return res`,
        },
                {
                    script: Script.RUST,
                    time: 0,
                    memory: 2.3,
                    desc: '同上',
                    code: `pub fn str_to_vec(s: &String) -> Vec<char> {
    s.chars().collect()
}
impl Solution {
    pub fn max_rep_opt1(text: String) -> i32 {
        let text = str_to_vec(&text);
        let mut m = vec![vec![]; 26];
        let mut res = 0;
        let mut n = text.len();
        {
            let mut i = 0;
            while i < n {
                let start = i;
                while i + 1 < n && text[i + 1] == text[start] {
                    i += 1;
                }
                m[text[start] as usize - 'a' as usize].push((start, i));
                res = res.max(i - start + 1);
                i += 1;
            }
        }
        for list in m {
            let n = list.len();
            for i in 0..n {
                if n != 1 {
                    res = res.max(list[i].1 - list[i].0 + 2);
                }
                if i + 1 < n && list[i].1 + 1 == list[i + 1].0 - 1 {
                    let mut val = list[i].1 - list[i].0 + 1 + list[i + 1].1 - list[i + 1].0 + 1;
                    if !(i == 0 && i + 2 == n) {
                        val += 1;
                    }
                    res = res.max(val);
                }
            }
        }
        res as i32
    }
}`,
                },
    ],
};

export default leetCodeMarkdown;
