import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2050. 并行课程 III',
    url: 'https://leetcode.cn/problems/parallel-courses-iii/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你返回完成所有课程所需要的 最少 月份数。`,
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
            time: 636,
            memory: 222.5,
            desc: '拓扑排序+堆',
            code: `#define X first
#define Y second
#define pii pair<int, int>
struct Node {
    unordered_set<int> p, c;
};
class Solution {
public:
    int minimumTime(int n, vector<vector<int>>& relations, vector<int>& time) {
        unordered_set<int> start;
        for (int i = 0; i < n; i++) start.insert(i);

        vector<Node> list(n);
        for (auto &item : relations) {
            list[item[0] - 1].c.insert(item[1] - 1);
            list[item[1] - 1].p.insert(item[0] - 1);
            start.erase(item[1] - 1);
        }

        int res = 0;
        auto cmp = [&](pii a, pii b) -> bool {
            return b.Y < a.Y;
        };
        priority_queue<pii, vector<pii>, decltype(cmp)> q(cmp);
        for (auto &v : start) {
            q.push(make_pair(v, time[v]));
        }
        while (q.size()) {
            auto cur = q.top();
            res = max(res, cur.Y);
            q.pop();
            for (auto &c : list[cur.X].c) {
                list[c].p.erase(cur.X);
                if (list[c].p.empty()) {
                    q.push(make_pair(c, cur.Y + time[c]));
                }
            }
        }
        return res;
    }
};`,
        },
        {
            script: Script.CPP,
            time: 388,
            memory: 161.2,
            desc: 'dfs',
            code: `class Solution {
public:
    int minimumTime(int n, vector<vector<int>>& relations, vector<int>& time) {
        vector<vector<int>> list(n);
        for (auto &item : relations) {
            list[item[1] - 1].push_back(item[0] - 1);
        }
        unordered_map<int, int> cache;
        function<int(int)> dfs = [&](int cur) -> int {
            if (cache[cur]) return cache[cur];
            int val = 0;
            for (auto &p : list[cur]) val = max(val, dfs(p));
            return cache[cur] = val + time[cur];
        };
        int res = 0;
        for (int i = 0; i < n; i++) res = max(res, dfs(i));
        return res;
    }
};`,
        },
        {
            script: Script.PY,
            time: 296,
            memory: 141.8,
            desc: '同上',
            code: `class Solution:
    def minimumTime(self, n: int, relations: List[List[int]], time: List[int]) -> int:
        list = [[] for _ in range(n)]
        for item in relations:
            list[item[1]-1].append(item[0]-1)

        @cache
        def dfs(cur: int) -> int:
            if len(list[cur]) == 0: return time[cur]
            return max(dfs(i) for i in list[cur]) + time[cur]
        return max(dfs(i) for i in range(n))`,
        },
        {
            script: Script.RUST,
            time: 64,
            memory: 11.9,
            desc: '同上',
            code: `impl Solution {
    pub fn minimum_time(n: i32, relations: Vec<Vec<i32>>, time: Vec<i32>) -> i32 {
        use std::collections::HashMap;
        let n = n as usize;
        let mut list = vec![vec![]; n];
        for item in relations {
            let (i0, i1) = (item[0] as usize - 1, item[1] as usize - 1);
            list[i1].push(i0);
        }
        let mut cache = HashMap::<usize, i32>::new();
        fn dfs(
            cache: &mut HashMap<usize, i32>,
            list: &Vec<Vec<usize>>,
            time: &Vec<i32>,
            cur: usize,
        ) -> i32 {
            if cache.contains_key(&cur) {
                *cache.get(&cur).unwrap()
            } else {
                let res = list[cur]
                    .iter()
                    .map(|p| dfs(cache, list, time, *p))
                    .max()
                    .unwrap_or(0)
                    + time[cur];
                cache.insert(cur, res);
                res
            }
        }
        (0..n)
            .into_iter()
            .map(|i| dfs(&mut cache, &list, &time, i))
            .max()
            .unwrap()
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
