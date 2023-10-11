import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2512. 奖励最顶尖的 K 名学生',
    url: 'https://leetcode.cn/problems/reward-top-k-students',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个整数 k ，请你返回按照得分 从高到低 最顶尖的 k 名学生。`,
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
        //     date: new Date('2020.12.28').getTime(),
        //     script: Script.TS,
        //     time: 120,
        //     memory: 44.6,
        //     desc: 'dp',
        //     code: ``,
        // },
        {
            script: Script.CPP,
            time: 264,
            memory: 54.2,
            desc: '哈希后排序',
            code: `class Solution {
public:
    vector<int> topStudents(vector<string>& positive_feedback, vector<string>& negative_feedback, vector<string>& report, vector<int>& student_id, int k) {
        unordered_set<string> pset(positive_feedback.begin(), positive_feedback.end()), nset(negative_feedback.begin(), negative_feedback.end());
        int n = report.size();
        vector<int> arr;
        for (int i = 0; i < n; i++) {
            istringstream iss(report[i]);
            string tmp;
            int res = 0;
            while (getline(iss, tmp, ' ')) {
                if (pset.count(tmp)) res += 3;
                else if (nset.count(tmp)) res -= 1;
            }
            arr.push_back(res);
        }
        vector<int> idxs;
        for (int i = 0; i < n; i++) idxs.push_back(i);
        sort(idxs.begin(), idxs.end(), [&](auto &a, auto &b) {
            if (arr[a] != arr[b]) return arr[b] < arr[a];
            return student_id[a] < student_id[b];
        });
        vector<int> res;
        for (int i = 0; i < k; i++) res.push_back(student_id[idxs[i]]);
        return res;
    }
};`,
        },
        {
            script: Script.PY,
            time: 172,
            memory: 23.4,
            desc: '同上',
            code: `class Solution:
    def topStudents(self, positive_feedback: List[str], negative_feedback: List[str], report: List[str], student_id: List[int], k: int) -> List[int]:
        pset = set(positive_feedback)
        nset = set(negative_feedback)
        n = len(report)
        arr = [sum(3 if s in pset else -1 for s in filter(lambda o: o in pset or o in nset, report[i].split(' '))) for i in range(n)]
        idxs = [i for i in range(n)]
        idxs.sort(key = lambda i: (arr[i], -student_id[i]), reverse = True)
        return [student_id[i] for i in idxs[:k]]`,
        },
        {
            script: Script.RUST,
            time: 48,
            memory: 5.72,
            desc: '同上',
            code: `impl Solution {
    pub fn top_students(
        positive_feedback: Vec<String>,
        negative_feedback: Vec<String>,
        report: Vec<String>,
        student_id: Vec<i32>,
        k: i32,
    ) -> Vec<i32> {
        use std::collections::HashSet;
        use std::cmp::Ordering;
        let pset = positive_feedback.into_iter().collect::<HashSet<_>>();
        let nset = negative_feedback.into_iter().collect::<HashSet<_>>();
        let n = report.len();
        let arr = (0..n)
            .map(|i| {
                report[i]
                    .split(' ')
                    .map(|s| {
                        if pset.contains(s) {
                            3
                        } else if nset.contains(s) {
                            -1
                        } else {
                            0
                        }
                    })
                    .sum()
            })
            .collect::<Vec<i32>>();
        let mut idxs = (0..n).collect::<Vec<usize>>();
        idxs.sort_by(|i1, i2| {
            let res = arr[*i2].cmp(&arr[*i1]);
            if res == Ordering::Equal {
                student_id[*i1].cmp(&student_id[*i2])
            } else {
                res
            }
        });
        idxs.into_iter()
            .enumerate()
            .filter(|(i, _)| *i < k as usize)
            .map(|(_, i)| student_id[i])
            .collect()
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
