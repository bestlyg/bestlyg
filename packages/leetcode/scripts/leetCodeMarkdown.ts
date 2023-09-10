import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '210. 课程表 II',
    url: 'https://leetcode.cn/problems/course-schedule/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你判断是否可能完成所有课程的学习？如果可以，返回 true ；否则，返回 false 。`,
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
        //     date: new Date('2020.08.05').getTime(),
        //     script: Script.TS,
        //     time: 96,
        //     memory: 40.3,
        //     desc: '归并排序',
        //     code: ``,
        // },
        // {
        //     script: Script.CPP,
        //     time: 24,
        //     memory: 17.9,
        //     desc: '拓扑排序',
        //     code: ``,
        // },
        {
            script: Script.PY,
            time: 48,
            memory: 17.51,
            desc: 'bfs',
            code: `class Solution:
    def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:
        used_count = 0
        arr = [[set(),set()] for _ in range(numCourses)]
        for [item1, item2] in prerequisites:
            arr[item1][0].add(item2)
            arr[item2][1].add(item1)
        q = [i for i in range(numCourses) if not len(arr[i][0])]
        res = []
        while len(q):
            cur = q.pop()
            res.append(cur)
            for child in arr[cur][1]:
                arr[child][0].remove(cur)
                if not len(arr[child][0]):
                    q.append(child)
        return res if numCourses == len(res) else []`,
        },
        // {
        //     script: Script.RUST,
        //     time: 0,
        //     memory: 2.7,
        //     desc: '同上',
        //     code: ``,
        // },
    ],
};

export default leetCodeMarkdown;
