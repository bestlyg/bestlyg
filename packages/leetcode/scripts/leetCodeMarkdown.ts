import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1654. 到家的最少跳跃次数',
    url: 'https://leetcode.cn/problems/minimum-jumps-to-reach-home/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个整数数组 forbidden ，其中 forbidden[i] 是跳蚤不能跳到的位置，同时给你整数 a， b 和 x ，请你返回跳蚤到家的最少跳跃次数。如果没有恰好到达 x 的可行方案，请你返回 -1 。`,
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
        //     date: new Date('2021.05.13').getTime(),
        //     script: Script.TS,
        //     time: 220,
        //     memory: 48.3,
        //     desc: '归并排序',
        //     code: ``,
        // },
        {
            script: Script.CPP,
            time: 60,
            memory: 18.09,
            desc: 'bfs',
            code: `class Solution {
public:
    typedef pair<int, bool> Node;
    int minimumJumps(vector<int>& forbidden, int a, int b, int x) {
        unordered_set<int> s(forbidden.begin(), forbidden.end());
        queue<Node> q;
        q.push(make_pair(0, false));
        unordered_map<int, int> m;
        m[0] |= 0b01;
        int size = 1, step = 0;
        while (q.size()) {
            auto cur = q.front();
            q.pop();
            if (cur.first == x) return step;
            if (cur.first < 4000 && (m[cur.first + a] & 0b01) == 0 && !s.count(cur.first + a)) {
                m[cur.first + a] |= 0b01;
                q.push(make_pair(cur.first + a, false));
            }
            if (cur.first - b >= 0 && !cur.second && (m[cur.first - b] & 0b10) == 0 && !s.count(cur.first - b)) {
                m[cur.first - b] |= 0b10;
                q.push(make_pair(cur.first - b, true));
            }
            size -= 1;
            if (size == 0) {
                size = q.size();
                step += 1;
            }
        }
        return -1;
    }
};`,
        },
        {
            script: Script.PY,
            time: 120,
            memory: 16.05,
            desc: '同上',
            code: `class Solution:
    def minimumJumps(self, forbidden: List[int], a: int, b: int, x: int) -> int:
        s = set(forbidden)
        q = deque()
        q.append((0, False))
        m = Counter()
        m[0] |= 0b01
        size = 1
        step = 0
        while len(q):
            cur = q.popleft()
            if cur[0] == x:
                return step
            if cur[0] < 4000 and (m[cur[0] + a] & 0b01) == 0 and not cur[0] + a in s:
                m[cur[0] + a] |= 0b01
                q.append((cur[0]+a, False))
            if cur[0] - b >= 0 and not cur[1] and (m[cur[0] - b] & 0b10) == 0 and not cur[0] - b in s:
                m[cur[0] - b] |= 0b10
                q.append((cur[0]-b, True))
            size -= 1
            if size == 0:
                size = len(q)
                step += 1
        return -1`,
        },
        {
            script: Script.RUST,
            time: 12,
            memory: 2.24,
            desc: '同上',
            code: `impl Solution {
    pub fn minimum_jumps(forbidden: Vec<i32>, a: i32, b: i32, x: i32) -> i32 {
        let mut s = std::collections::HashSet::<i32>::new();
        for num in forbidden {
            s.insert(num);
        }
        let mut q = std::collections::VecDeque::<(i32, bool)>::new();
        q.push_back((0, false));
        let mut m = std::collections::HashMap::<i32, i32>::new();
        m.insert(0, 0b01);
        let mut size = 1;
        let mut step = 0;
        while let Some(cur) = q.pop_front() {
            if cur.0 == x {
                return step;
            }
            if cur.0 < 4000
                && (*m.get(&(cur.0 + a)).unwrap_or(&0) & 0b01) == 0
                && !s.contains(&(cur.0 + a))
            {
                let item = m.entry(cur.0 + a).or_insert(0);
                *item |= 0b01;
                q.push_back((cur.0 + a, false));
            }
            if cur.0 - b >= 0
                && !cur.1
                && (*m.get(&(cur.0 - b)).unwrap_or(&0) & 0b10) == 0
                && !s.contains(&(cur.0 - b))
            {
                let item = m.entry(cur.0 - b).or_insert(0);
                *item |= 0b10;
                q.push_back((cur.0 - b, true));
            }
            size -= 1;
            if size == 0 {
                size = q.len();
                step += 1;
            }
        }
        -1
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
