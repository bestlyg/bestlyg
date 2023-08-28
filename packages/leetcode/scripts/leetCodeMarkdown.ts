import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '57. 插入区间',
    url: 'https://leetcode.cn/problems/count-good-nodes-in-binary-tree/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一棵根为 root 的二叉树，请你返回二叉树中好节点的数目。`,
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
            memory: 16.22,
            desc: '遍历',
            code: `class Solution {
public:
    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
        vector<vector<int>> res;
        int n = intervals.size(), i = 0;
        while (i < n && intervals[i][1] < newInterval[0]) {
            res.push_back(intervals[i]);
            i += 1;
        }
        if (i == n) {
            res.push_back(newInterval);
        } else if (intervals[i][0] > newInterval[1]) {
            res.push_back(newInterval);
            while (i < n) {
                res.push_back(intervals[i]);
                i += 1;
            }
        } else {
            res.push_back(
                vector<int>{
                    min(intervals[i][0], newInterval[0]),
                    max(intervals[i][1], newInterval[1])
                }
            );
            i += 1;
            while (i < n) {
                if (res.back()[1] >= intervals[i][0]) {
                    res.back()[1] = max(res.back()[1], intervals[i][1]);
                } else {
                    res.push_back(intervals[i]);
                }
                i += 1;
            }
        }
        return res;
    }
};`,
        },
        {
            script: Script.PY,
            time: 60,
            memory: 17.75,
            desc: '同上',
            code: `class Solution:
    def insert(self, intervals: List[List[int]], newInterval: List[int]) -> List[List[int]]:
        res = []
        n = len(intervals)
        i = 0
        while i < n and intervals[i][1] < newInterval[0]:
            res.append(intervals[i])
            i += 1
        if i == n:
            res.append(newInterval)
        elif intervals[i][0] > newInterval[1]:
            res.append(newInterval)
            while i < n:
                res.append(intervals[i])
                i += 1
        else:
            res.append(
                [min(intervals[i][0], newInterval[0]),
                    max(intervals[i][1], newInterval[1])]
            )
            i += 1
            while i < n:
                if res[-1][1] >= intervals[i][0]:
                    res[-1][1] = max(res[-1][1], intervals[i][1])
                else:
                    res.append(intervals[i])
                i += 1
        return res`,
        },
        {
            script: Script.RUST,
            time: 0,
            memory: 2.54,
            desc: '同上',
            code: `impl Solution {
    pub fn insert(intervals: Vec<Vec<i32>>, new_interval: Vec<i32>) -> Vec<Vec<i32>> {
        use std::cmp::{max, min};
        let mut res = vec![];
        let n = intervals.len();
        let mut i = 0;
        while i < n && intervals[i][1] < new_interval[0] {
            res.push(intervals[i].clone());
            i += 1;
        }
        if i == n {
            res.push(new_interval);
        } else if intervals[i][0] > new_interval[1] {
            res.push(new_interval);
            while i < n {
                res.push(intervals[i].clone());
                i += 1;
            }
        } else {
            res.push(vec![
                min(intervals[i][0], new_interval[0]),
                max(intervals[i][1], new_interval[1]),
            ]);
            i += 1;
            while i < n {
                if res.last().unwrap()[1] >= intervals[i][0] {
                    res.last_mut().unwrap()[1] = max(res.last().unwrap()[1], intervals[i][1]);
                } else {
                    res.push(intervals[i].clone());
                }
                i += 1;
            }
        }
        res
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
