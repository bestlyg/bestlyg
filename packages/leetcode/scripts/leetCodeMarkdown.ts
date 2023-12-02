import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1094. 拼车',
    url: 'https://leetcode.cn/problems/car-pooling',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `当且仅当你可以在所有给定的行程中接送所有乘客时，返回 true，否则请返回 false。`,
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
        // {
        //     date: new Date('2022.06.20').getTime(),
        //     script: Script.CPP,
        //     time: 200,
        //     memory: 66.95,
        //     desc: '有序集合',
        //     code: ``,
        // },
        {
            script: Script.PY,
            time: 40,
            memory: 16.64,
            desc: '排序后优先队列计数',
            code: `class Solution:
    def carPooling(self, trips: List[List[int]], capacity: int) -> bool:
        trips.sort(key = lambda o: (o[1], o[2]))
        size = 0
        q = []
        for [num, f, t] in trips:
            while q and q[0][0] <= f: size -= heappop(q)[1]
            if size + num > capacity: return False
            heappush(q, (t, num))
            size += num
        return True`,
        },
        {
            script: Script.RUST,
            time: 0,
            memory: 2.07,
            desc: '同上',
            code: `impl Solution {
    pub fn car_pooling(mut trips: Vec<Vec<i32>>, capacity: i32) -> bool {
        trips.sort_by_key(|o| o[1]);
        let mut size = 0;
        let mut q = std::collections::BinaryHeap::<(i32, i32)>::new();
        for item in trips {
            let (num, f, t) = (item[0], item[1], item[2]);
            while q.len() > 0 && -(*q.peek().unwrap()).0 <= f {
                size -= q.pop().unwrap().1;
            }
            if size + num > capacity {
                return false;
            }
            q.push((-t, num));
            size += num;
        }
        true
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
