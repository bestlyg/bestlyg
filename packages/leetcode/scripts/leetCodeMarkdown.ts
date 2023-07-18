import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1851. 包含每个查询的最小区间',
    url: 'https://leetcode.cn/problems/minimum-interval-to-include-each-query/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个二维整数数组 intervals ，其中 intervals[i] = [lefti, righti] 表示第 i 个区间开始于 lefti 、结束于 righti（包含两侧取值，闭区间）。区间的 长度 定义为区间中包含的整数数目，更正式地表达是 righti - lefti + 1 。再给你一个整数数组 queries 。第 j 个查询的答案是满足 lefti <= queries[j] <= righti 的 长度最小区间 i 的长度 。如果不存在这样的区间，那么答案是 -1 。以数组形式返回对应查询的所有答案。`,
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
            time: 440,
            memory: 106.5,
            desc: '排序后用堆记录区间最值',
            code: `#define SORT(list, fn) sort(list.begin(), list.end(), [&](auto &v1, auto &v2){ fn });
class Solution {
public:
    vector<int> minInterval(vector<vector<int>>& intervals, vector<int>& queries) {
        vector<int> res(queries.size(), -1);
        SORT(intervals, {
            return v1[0] != v2[0] ? v1[0] < v2[0] : v1[1] < v2[1];
        });
        vector<int> idxs;
        for (int i = 0; i < queries.size(); i++) idxs.push_back(i);
        SORT(idxs, {
            return queries[v1] < queries[v2];
        });
        auto cmp = [&](int i1, int i2) {
            int n1 = intervals[i1][1] - intervals[i1][0] + 1,
                n2 = intervals[i2][1] - intervals[i2][0] + 1;
            return n2 < n1;
        };
        priority_queue<int, vector<int>, decltype(cmp)> q(cmp);
        int iidx = 0;
        for (auto &idx : idxs) {
            int cur = queries[idx];
            while (iidx < intervals.size() && intervals[iidx][0] <= cur) {
                q.push(iidx++);
            }
            while (q.size() && intervals[q.top()][1] < cur) {
                q.pop();
            }
            if (q.size()) {
                auto &interval = intervals[q.top()];
                res[idx] = interval[1] - interval[0] + 1;
            }
        }
        return res;
    }
};`,
        },
        {
            script: Script.PY,
            time: 944,
            memory: 64.9,
            desc: '同上',
            code: `class Solution:
    def minInterval(self, intervals: List[List[int]], queries: List[int]) -> List[int]:
        class CmpNode:
            def __init__(self, idx: int) -> None:
                self.idx = idx

            def __lt__(self, o: 'CmpNode') -> bool:
                n1 = intervals[self.idx][1] - intervals[self.idx][0] + 1
                n2 = intervals[o.idx][1] - intervals[o.idx][0] + 1
                return n1 < n2
        res = [-1 for _ in range(len(queries))]
        intervals.sort(key=lambda v: v[0])
        idxs = [i for i in range(len(queries))]
        idxs.sort(key=lambda v: queries[v])
        q: List[CmpNode] = []
        iidx = 0
        for idx in idxs:
            cur = queries[idx]
            while iidx < len(intervals) and intervals[iidx][0] <= cur:
                heappush(q, CmpNode(iidx))
                iidx += 1
            while len(q) and intervals[q[0].idx][1] < cur:
                heappop(q)
            if len(q):
                interval = intervals[q[0].idx]
                res[idx] = interval[1] - interval[0] + 1
        return res`,
        },
        {
            script: Script.RUST,
            time: 88,
            memory: 12.1,
            desc: '同上',
            code: `#[derive(Clone, PartialEq, Eq, Ord)]
struct Node<'a> {
    idx: usize,
    intervals: &'a Vec<Vec<i32>>,
}
impl<'a> Node<'a> {
    fn new(idx: usize, intervals: &'a Vec<Vec<i32>>) -> Self {
        Node { idx, intervals }
    }
    fn len(&self) -> i32 {
        self.intervals[self.idx][1] - self.intervals[self.idx][0] + 1
    }
}
impl PartialOrd for Node<'_> {
    fn partial_cmp(&self, o: &Self) -> Option<std::cmp::Ordering> {
        o.len().partial_cmp(&self.len())
    }
}

impl Solution {
    pub fn min_interval(mut intervals: Vec<Vec<i32>>, queries: Vec<i32>) -> Vec<i32> {
        let mut res = vec![-1; queries.len()];
        intervals.sort_by_key(|v| v[0]);
        let mut idxs = vec![0; queries.len()]
            .into_iter()
            .enumerate()
            .map(|v| v.0)
            .collect::<Vec<_>>();
        idxs.sort_by_key(|i| queries[*i]);
        let mut q = std::collections::BinaryHeap::<Node>::new();
        let mut iidx = 0;
        for idx in idxs {
            let cur = queries[idx];
            while iidx < intervals.len() && intervals[iidx][0] <= cur {
                q.push(Node::new(iidx, &intervals));
                iidx += 1;
            }
            while !q.is_empty() && intervals[q.peek().unwrap().idx][1] < cur {
                q.pop();
            }
            if !q.is_empty() {
                res[idx] = q.peek().unwrap().len();
            }
        }
        res
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
