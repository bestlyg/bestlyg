import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1499. 满足不等式的最大值',
    url: 'https://leetcode.cn/problems/max-value-of-equation/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `定一个长度为 n 的环形整数数组 nums ，返回 nums 的非空 子数组 的最大可能和 。`,
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
            time: 268,
            memory: 87.5,
            desc: '单调队列统计区间最大值',
            code: `class Solution {
public:
    int findMaxValueOfEquation(vector<vector<int>>& points, int k) {
        int res = INT_MIN;
        deque<int> q;
        for (int i = 0; i < points.size(); i++) {
            auto &cur = points[i];
            while (q.size() && cur[0] - points[q.front()][0] > k) q.pop_front();
            if (q.size()) res = max(res, cur[0] + cur[1] + points[q.front()][1] - points[q.front()][0]);
            while (q.size() && points[q.back()][1] - points[q.back()][0] < cur[1] - cur[0]) q.pop_back();
            q.push_back(i);
        }
        return res;
    }
};`,
        },
        {
            script: Script.PY,
            time: 352,
            memory: 53.2,
            desc: '同上',
            code: `class Solution:
    def findMaxValueOfEquation(self, points: List[List[int]], k: int) -> int:
        res = -inf
        q = deque()
        for cur in points:
            while len(q) and cur[0] - q[0][0] > k:
                q.popleft()
            if len(q):
                res = max(res, cur[0]+cur[1]+q[0][1]-q[0][0])
            while len(q) and q[-1][1] - q[-1][0] < cur[1] - cur[0]:
                q.pop()
            q.append(cur)
        return res`,
        },
        {
            script: Script.RUST,
            time: 28,
            memory: 10.9,
            desc: '同上',
            code: `impl Solution {
    pub fn find_max_value_of_equation(points: Vec<Vec<i32>>, k: i32) -> i32 {
        let mut q = std::collections::VecDeque::<Vec<i32>>::new();
        let mut res = i32::MIN;
        for cur in points {
            while let Some(prev) = q.front() {
                if cur[0] - prev[0] > k {
                    q.pop_front();
                } else {
                    break;
                }
            }
            if let Some(prev) = q.front() {
                res = res.max(cur[0] + cur[1] + prev[1] - prev[0]);
            }
            while let Some(prev) = q.back() {
                if prev[1] - prev[0] < cur[1] - cur[0] {
                    q.pop_back();
                } else {
                    break;
                }
            }
            q.push_back(cur);
        }
        res
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
