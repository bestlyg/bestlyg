import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '56. 合并区间',
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
        // {
        //     script: Script.CPP,
        //     time: 0,
        //     memory: 6.65,
        //     desc: '遍历',
        //     code: ``,
        // },
        {
            script: Script.PY,
            time: 56,
            memory: 19.6,
            desc: '同上',
            code: `class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        intervals.sort(key=lambda o: o[0])
        res = []
        for [start, end] in intervals:
            if not len(res) or res[-1][1] < start:
                res.append([start, end])
            else:
                res[-1][1] = max(res[-1][1], end)
        return res`,
        },
        {
            script: Script.RUST,
            time: 8,
            memory: 2.83,
            desc: '同上',
            code: `impl Solution {
    pub fn merge(mut intervals: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        intervals.sort_by_key(|o| o[0]);
        let mut res: Vec<Vec<i32>> = vec![];
        for item in intervals {
            if res.is_empty() || res.last().unwrap()[1] < item[0] {
                res.push(item);
            } else {
                res.last_mut().unwrap()[1] = res.last_mut().unwrap()[1].max(item[1]);
            }
        }
        res
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
