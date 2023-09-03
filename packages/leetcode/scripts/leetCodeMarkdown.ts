import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1921. 消灭怪物的最大数量',
    url: 'https://leetcode.cn/problems/eliminate-maximum-number-of-monsters',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `返回在你输掉游戏前可以消灭的怪物的 最大 数量。`,
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
            time: 104,
            memory: 86.8,
            desc: '排序',
            code: `class Solution {
public:
    int eliminateMaximum(vector<int>& dist, vector<int>& speed) {
        vector<double> arr;
        for (int i = 0; i < dist.size(); i++) arr.push_back(1.0 * dist[i] / speed[i]);
        sort(arr.begin(), arr.end());
        for (int i = 0; i < dist.size(); i++) {
            if (i >= arr[i]) return i;
        }
        return dist.size();
    }
};`,
        },
        {
            script: Script.PY,
            time: 168,
            memory: 30.3,
            desc: '同上',
            code: `class Solution:
    def eliminateMaximum(self, dist: List[int], speed: List[int]) -> int:
        arr = [dist[i] / speed[i] for i in range(len(dist))]
        arr.sort()
        for i in range(len(dist)):
            if i >= arr[i]: return i
        return len(dist)`,
        },
        {
            script: Script.RUST,
            time: 32,
            memory: 4.1,
            desc: '同上',
            code: `impl Solution {
    pub fn eliminate_maximum(dist: Vec<i32>, speed: Vec<i32>) -> i32 {
        let mut arr = vec![];
        for i in 0..dist.len() {
            arr.push(dist[i] as f64 / speed[i] as f64);
        }
        arr.sort_by(|a, b| a.partial_cmp(b).unwrap());
        for i in 0..dist.len() {
            if i as f64 >= arr[i] {
                return i as i32;
            }
        }
        dist.len() as i32
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
