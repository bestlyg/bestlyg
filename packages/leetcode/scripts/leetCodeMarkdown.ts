import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '630. 课程表 III',
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
        {
            script: Script.CPP,
            time: 256,
            memory: 53.61,
            desc: '拓扑排序',
            code: `class Solution {
public:
    int scheduleCourse(vector<vector<int>>& courses) {
        int sum = 0;
        priority_queue<int> q;
        sort(courses.begin(), courses.end(), [&](auto &a, auto &b) {
            return a[1] < b[1];
        });
        for (auto &course : courses) {
            sum += course[0];
            q.push(course[0]);
            if (sum > course[1]) {
                sum -= q.top();
                q.pop();
            }
        }
        return q.size();
    }
};`,
        },
        {
            script: Script.PY,
            time: 124,
            memory: 19.54,
            desc: '同上',
            code: `class Solution:
    def scheduleCourse(self, courses: List[List[int]]) -> int:
        courses.sort(key=lambda o: o[1])
        q = []
        sum = 0
        for [d, e] in courses:
            sum += d
            heappush(q, -d)
            if sum > e:
                sum -= -heappop(q)
        return len(q)
`,
        },
        {
            script: Script.RUST,
            time: 32,
            memory: 29.7,
            desc: '同上',
            code: `impl Solution {
    pub fn schedule_course(mut courses: Vec<Vec<i32>>) -> i32 {
        courses.sort_by_key(|o| o[1]);
        let mut sum = 0;
        let mut q = std::collections::BinaryHeap::<i32>::new();
        for course in courses {
            sum += course[0];
            q.push(course[0]);
            if sum > course[1] {
                sum -= q.pop().unwrap();
            }
        }
        q.len() as i32
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
