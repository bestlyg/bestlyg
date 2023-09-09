import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '207. 课程表',
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
        {
            date: new Date('2020.08.05').getTime(),
            script: Script.TS,
            time: 96,
            memory: 40.3,
            desc: '归并排序',
            code: `function canFinish(numCourses: number, prerequisites: number[][]): boolean {
    const inDegree:number[] = Array(numCourses).fill(0) //入度的数组
    const map:any = new Map() 
    for (let i = 0; i < prerequisites.length; i++) {
        inDegree[prerequisites[i][0]]++ //遍历课程，第一项都是依赖后一项的所以入度都加1
        if (map.has(prerequisites[i][1])) { //push依赖prerequisites[i][1]的课程
            map.get(prerequisites[i][1]).push(prerequisites[i][0])
        } else { //map中没有此课程，添加进去并把value设置成数组用来push依赖prerequisites[i][1]的课程
            map.set(prerequisites[i][1], [prerequisites[i][0]])
        }
    }
    const queue:number[] = []//数组队列
    for (let i = 0; i < inDegree.length; i++) {
        if (inDegree[i] == 0) {//如果入度为0表示可先学习课程push到队列
            queue.push(i)
        }
    }
    let count:number = 0//选课次数
    while (queue.length) {
        const selected = queue.shift()//可选课程
        count++ 
        const preSelect = map.get(selected) //依赖此课程的所有课程（是个数组）
            if (preSelect && preSelect.length) {
                //依赖此课程的课程入度都减1
                for (let i = 0; i < preSelect.length; i++) {
                    inDegree[preSelect[i]]--
                    if (inDegree[preSelect[i]] == 0) {//入度为0可以学习push到队列
                        queue.push(preSelect[i])
                    }
                }
            }
    }
    return count == numCourses
};`,
        },
        {
            script: Script.CPP,
            time: 24,
            memory: 17.9,
            desc: '拓扑排序',
            code: `class Solution {
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        int used_count = 0;
        vector<unordered_set<int>> parr(numCourses);
        vector<unordered_set<int>> carr(numCourses);
        for (auto &item : prerequisites)
            carr[item[0]].insert(item[1]),
            parr[item[1]].insert(item[0]);
        vector<int> q;
        for (int i = 0; i < numCourses; i++) {
            if (parr[i].empty()) q.push_back(i);
        }
        while (q.size()) {
            int cur = q.back();
            used_count++;
            q.pop_back();
            for (auto &child : carr[cur]) {
                parr[child].erase(cur);
                if (parr[child].empty()) q.push_back(child);
            }
        }
        return used_count == numCourses;
    }
};`,
        },
        {
            script: Script.PY,
            time: 48,
            memory: 16.1,
            desc: '同上',
            code: `class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        used_count = 0
        arr = [[set(),set()] for _ in range(numCourses)]
        for [item1, item2] in prerequisites:
            arr[item2][0].add(item1)
            arr[item1][1].add(item2)
        q = [i for i in range(numCourses) if not len(arr[i][0])]
        while len(q):
            cur = q.pop()
            used_count += 1
            for child in arr[cur][1]:
                arr[child][0].remove(cur)
                if not len(arr[child][0]):
                    q.append(child)
        return used_count == numCourses`,
        },
        {
            script: Script.RUST,
            time: 0,
            memory: 2.7,
            desc: '同上',
            code: `impl Solution {
    pub fn can_finish(num_courses: i32, prerequisites: Vec<Vec<i32>>) -> bool {
        use std::collections::HashSet;
        let num_courses = num_courses as usize;
        let mut used_count = 0;
        let mut parr: Vec<HashSet<usize>> = vec![Default::default(); num_courses];
        let mut carr: Vec<HashSet<usize>> = vec![Default::default(); num_courses];
        for item in prerequisites {
            let item0 = item[0] as usize;
            let item1 = item[1] as usize;
            carr[item0].insert(item1);
            parr[item1].insert(item0);
        }
        let mut q: Vec<usize> = vec![];
        for i in 0..num_courses {
            if parr[i].is_empty() {
                q.push(i);
            }
        }
        while let Some(cur) = q.pop() {
            used_count += 1;
            for child in &carr[cur] {
                parr[*child].remove(&cur);
                if parr[*child].is_empty() {
                    q.push(*child);
                }
            }
        }
        used_count == num_courses
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
