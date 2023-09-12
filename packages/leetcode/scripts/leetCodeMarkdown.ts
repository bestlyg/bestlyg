import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1462. 课程表 IV',
    url: 'https://leetcode.cn/problems/course-schedule-iv',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `你也得到一个数组 queries ，其中 queries[j] = [uj, vj]。对于第 j 个查询，您应该回答课程 uj 是否是课程 vj 的先决条件。返回一个布尔数组 answer ，其中 answer[j] 是第 j 个查询的答案。`,
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
            time: 816,
            memory: 164.73,
            desc: '提前预处理',
            code: `class Solution {
public:
    vector<bool> checkIfPrerequisite(int numCourses, vector<vector<int>>& prerequisites, vector<vector<int>>& queries) {
        vector<unordered_set<int>> parr(numCourses);
        for (auto &item : prerequisites) {
            parr[item[1]].insert(item[0]);
        }
        unordered_map<int, unordered_set<int>> m;
        function<unordered_set<int>(int)> find_parent = [&](int idx) {
            if (m.count(idx)) return m[idx];
            unordered_set<int> res(parr[idx].begin(), parr[idx].end());
            if (parr[idx].size()) {
                for (auto &p : parr[idx]) {
                    for (auto &item : find_parent(p)) {
                        res.insert(item);
                    }
                }
            }
            return m[idx] = res;
        };
        for (int idx = 0; idx < numCourses; idx++) {
            parr[idx] = find_parent(idx);
        }
        vector<bool> res;
        for (auto &query : queries) {
            res.push_back(parr[query[1]].count(query[0]));
        }
        return res;
    }
};`,
        },
        {
            script: Script.PY,
            time: 80,
            memory: 19.1,
            desc: '同上',
            code: `class Solution:
    def checkIfPrerequisite(self, numCourses: int, prerequisites: List[List[int]], queries: List[List[int]]) -> List[bool]:
        parr = [set() for _ in range(numCourses)]
        for [item1, item2] in prerequisites:
            parr[item2].add(item1)
        @cache
        def find_parent(idx: int) -> set:
            res = set(parr[idx])
            if len(parr[idx]):
                for p in parr[idx]:
                    res |= find_parent(p)
            return res
        for idx in range(numCourses):
            parr[idx] = find_parent(idx)
        return [query[0] in parr[query[1]] for query in queries]`,
        },
        {
            script: Script.RUST,
            time: 60,
            memory: 3.11,
            desc: '同上',
            code: `impl Solution {
    pub fn check_if_prerequisite(
        num_courses: i32,
        prerequisites: Vec<Vec<i32>>,
        queries: Vec<Vec<i32>>,
    ) -> Vec<bool> {
        use std::collections::{HashMap, HashSet};
        let num_courses = num_courses as usize;
        let mut parr = vec![HashSet::<usize>::new(); num_courses];
        for item in prerequisites {
            let (item1, item2) = (item[0] as usize, item[1] as usize);
            parr[item2].insert(item1);
        }
        let mut m = HashMap::new();
        fn dfs(m: &mut HashMap<usize, HashSet<usize>>, parr: &Vec<HashSet<usize>>, idx: usize) {
            if m.contains_key(&idx) {
                return;
            }
            let mut item = HashSet::new();
            for p in &parr[idx] {
                item.insert(*p);
                dfs(m, parr, *p);
                for p in m.get(p).unwrap() {
                    item.insert(*p);
                }
            }
            m.insert(idx, item);
        }
        for idx in 0..num_courses {
            dfs(&mut m, &parr, idx);
        }
        queries
            .into_iter()
            .map(|query| {
                m.get(&(query[1] as usize))
                    .unwrap()
                    .contains(&(query[0] as usize))
            })
            .collect()
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
