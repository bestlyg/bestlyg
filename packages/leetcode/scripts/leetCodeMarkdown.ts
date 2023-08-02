import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '822. 翻转卡片游戏',
    url: 'https://leetcode.cn/problems/card-flipping-game/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `哪个数是这些想要的数字中最小的数（找到这些数中的最小值）呢？如果没有一个数字符合要求的，输出 0。`,
    solutions: [
        // {
        //     date: new Date('2020/10/06').getTime(),
        //     script: Script.JS,
        //     time: 224,
        //     memory: 54.2,
        //     desc: 'dfs',
        //     code: ``,
        // },
        {
            script: Script.CPP,
            time: 40,
            memory: 24.54,
            desc: '哈希存储',
            code: `class Solution {
public:
    int flipgame(vector<int>& fronts, vector<int>& backs) {
        int n = fronts.size(), res = INT_MAX;
        unordered_map<int, vector<int>> mf, mb;
        for (int i = 0; i < n; i++) {
            mf[fronts[i]].push_back(i);
            mb[backs[i]].push_back(i);
        }
        auto check = [&](unordered_map<int, vector<int>> &m, vector<int> &l, int val) -> bool {
            for (auto &idx : m[val]) {
                if (l[idx] == val) return false;
            }
            return true;
        };
        for (int i = 0; i < n; i++) {
            if (!mf.count(fronts[i]) && !mb.count(fronts[i]) || check(mf, backs, fronts[i]) || check(mb, fronts, fronts[i])) {
                res = min(res, fronts[i]);
            }
            if (!mf.count(backs[i]) && !mb.count(backs[i]) || check(mf, backs, backs[i]) || check(mb, fronts, backs[i])) {
                res = min(res, backs[i]);
            }
        }
        return res == INT_MAX ? 0 : res;
    }
};`,
        },
        {
            script: Script.CPP,
            time: 20,
            memory: 18.66,
            desc: '哈希存储',
            code: `class Solution {
public:
    int flipgame(vector<int>& fronts, vector<int>& backs) {
        int n = fronts.size(), res = 3000;
        unordered_set<int> s;
        for (int i = 0; i < n; i++) {
            if (fronts[i] == backs[i]) s.insert(fronts[i]);
        }
        for (int i = 0; i < n; i++) {
            if (!s.count(fronts[i])) res = min(res, fronts[i]);
            if (!s.count(backs[i])) res = min(res, backs[i]);
        }
        return res % 3000;
    }
};`,
        },
        {
            script: Script.PY,
            time: 52,
            memory: 15.72,
            desc: '同上',
            code: `class Solution:
    def flipgame(self, fronts: List[int], backs: List[int]) -> int:
        n = len(fronts)
        res = 3000
        s = set()
        for i in range(n):
            if fronts[i] == backs[i]:
                s.add(fronts[i])
        for i in range(n):
            if not fronts[i] in s:
                res = min(res, fronts[i])
            if not backs[i] in s:
                res = min(res, backs[i])
        return res % 3000`,
        },
        {
            script: Script.RUST,
            time: 4,
            memory: 1.96,
            desc: '同上',
            code: `impl Solution {
    pub fn flipgame(fronts: Vec<i32>, backs: Vec<i32>) -> i32 {
        let n = fronts.len();
        let mut s = std::collections::HashSet::<i32>::new();
        let mut res = 3000;
        for i in 0..n {
            if fronts[i] == backs[i] {
                s.insert(fronts[i]);
            }
        }
        for i in 0..n {
            if !s.contains(&fronts[i]) {
                res = res.min(fronts[i]);
            }
            if !s.contains(&backs[i]) {
                res = res.min(backs[i]);
            }
        }
        res % 3000
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
