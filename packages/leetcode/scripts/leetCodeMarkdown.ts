import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2698. 求一个整数的惩罚数',
    url: 'https://leetcode.cn/problems/find-the-punishment-number-of-an-integer',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个正整数 n ，请你返回 n 的 惩罚数 。`,
    solutions: [
        // {
        //     date: new Date('2020.04.26').getTime(),
        //     script: Script.JS,
        //     time: 384,
        //     memory: 44.78,
        //     desc: '归并排序',
        //     code: ``,
        // },
        // {
        //     date: new Date('2020.12.28').getTime(),
        //     script: Script.TS,
        //     time: 120,
        //     memory: 44.6,
        //     desc: 'dp',
        //     code: ``,
        // },
        {
            script: Script.CPP,
            time: 316,
            memory: 5.92,
            desc: 'dfs计算当前值是否可行',
            code: `class Solution {
public:
    bool check(int num) {
        string s = to_string(num * num);
        function<bool(int, int)> dfs = [&](int idx, int target) -> bool {
            if (idx == s.size()) return target == 0;
            for (int cnt = 1; cnt <= s.size() - idx; cnt++) {
                if (dfs(idx + cnt, target - stoi(s.substr(idx, cnt)))) return true;
            }
            return false;
        };
        return dfs(0, num);
    }
    int punishmentNumber(int n) {
        int res = 0;
        for (int i = 1; i <= n; i++) res += check(i) ? i * i : 0;
        return res;
    }
};`,
        },
        {
            script: Script.PY,
            time: 1416,
            memory: 15.71,
            desc: '同上',
            code: `def check(num: int) -> bool:
        s = str(num * num)
        def dfs(idx: int, target: int) -> bool:
            if idx == len(s): return target == 0
            for cnt in range(1, len(s) - idx + 1):
                if dfs(idx + cnt, target - int(s[idx: idx + cnt])): return True
            return False

        return dfs(0, num)

    class Solution:
        def punishmentNumber(self, n: int) -> int:
            return sum(i * i if check(i) else 0 for i in range(1, n + 1))`,
        },
        {
            script: Script.RUST,
            time: 124,
            memory: 1.9,
            desc: '同上',
            code: `fn check(num: i32) -> bool {
    let s = num.pow(2).to_string().chars().collect::<Vec<_>>();
    fn dfs(s: &Vec<char>, idx: usize, target: i32) -> bool {
        if idx == s.len() {
            target == 0
        } else {
            for cnt in 1..=(s.len() - idx) {
                if dfs(
                    s,
                    idx + cnt,
                    target - &s[idx..idx + cnt].iter().collect::<String>().parse::<i32>().unwrap(),
                ) {
                    return true;
                }
            }
            false
        }
    }
    dfs(&s, 0, num)
}

impl Solution {
    pub fn punishment_number(n: i32) -> i32 {
        (1..=n).map(|i| if check(i) { i * i } else { 0 }).sum()
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
