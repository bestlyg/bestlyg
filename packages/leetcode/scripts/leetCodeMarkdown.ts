import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2511. 最多可以摧毁的敌人城堡数目',
    url: 'https://leetcode.cn/problems/maximum-enemy-forts-that-can-be-captured',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你返回 最多 可以摧毁的敌人城堡数目。`,
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
            time: 4,
            memory: 7.41,
            desc: '遍历',
            code: `class Solution {
public:
    int captureForts(vector<int>& forts) {
        int res = 0, p0 = -1, p1 = -1;
        for (int i = 0; i < forts.size(); i++) {
            int fort = forts[i];
            if (fort == 1) {
                if (p0 != -1 && p0 > p1) res = max(res, i - 1 - p0);
                p1 = i;
            } else if (fort == -1) {
                if (p1 != -1 && p1 > p0) res = max(res, i - 1 - p1);
                p0 = i;
            }
        }
        return res;
    }
};`,
        },
        {
            script: Script.PY,
            time: 60,
            memory: 15.82,
            desc: '同上',
            code: `class Solution:
    def captureForts(self, forts: List[int]) -> int:
        res = 0
        p0 = p1 = -1
        for i in range(len(forts)):
            fort = forts[i]
            if fort == 1:
                if p0 != -1 and p0 > p1:
                    res = max(res, i - p0 - 1)
                p1 = i
            elif fort == -1:
                if p1 != -1 and p1 > p0:
                    res = max(res, i - p1 - 1)
                p0 = i
        return res`,
        },
        {
            script: Script.RUST,
            time: 0,
            memory: 1.93,
            desc: '同上',
            code: `impl Solution {
    pub fn capture_forts(forts: Vec<i32>) -> i32 {
        let mut res = 0i32;
        let (mut p0, mut p1) = (-1i32, -1i32);
        for i in 0..forts.len() {
            let fort = forts[i];
            if fort == 1 {
                if p0 != -1 && p0 > p1 {
                    res = res.max((i as i32) - 1 - p0);
                }
                p1 = i as i32;
            } else if fort == -1 {
                if p1 != -1 && p1 > p0 {
                    res = res.max((i as i32) - 1 - p1);
                }
                p0 = i as i32;
            }
        }
        res as i32
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
