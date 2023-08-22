import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '849. 到最近的人的最大距离',
    url: 'https://leetcode.cn/problems/maximize-distance-to-closest-person/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `返回他到离他最近的人的最大距离。`,
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
            time: 16,
            memory: 16.14,
            desc: '遍历时记录前一个1',
            code: `class Solution {
public:
    int maxDistToClosest(vector<int>& seats) {
        int prev = -1, idx = 0, res = INT_MIN;
        while (idx < seats.size()) {
            if (seats[idx] == 1) {
                if (prev == -1) res = max(res, idx);
                else res = max(res, (idx - prev) / 2);
                prev = idx;
            }
            idx += 1;
        }
        res = max(res, (int)seats.size() - 1 - prev);
        return res;
    }
};`,
        },
        {
            script: Script.PY,
            time: 52,
            memory: 16.38,
            desc: '同上',
            code: `class Solution:
    def maxDistToClosest(self, seats: List[int]) -> int:
        prev = -1
        idx = 0
        res = -inf
        while idx < len(seats):
            if seats[idx] == 1:
                if prev == -1:
                    res = max(res, idx)
                else:
                    res = max(res, (idx - prev) // 2)
                prev = idx
            idx += 1
        res = max(res, len(seats) - 1 - prev)
        return res`,
        },
        {
            script: Script.RUST,
            time: 0,
            memory: 2.15,
            desc: '同上',
            code: `impl Solution {
    pub fn max_dist_to_closest(seats: Vec<i32>) -> i32 {
        let mut prev = -1;
        let mut idx = 0;
        let mut res = i32::MIN;
        while idx < seats.len() {
            if seats[idx] == 1 {
                let idx = idx as i32;
                res = res.max(if prev == -1 { idx } else { (idx - prev) / 2 });
                prev = idx;
            }
            idx += 1;
        }
        res = res.max(seats.len() as i32 - 1 - prev);
        res
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
