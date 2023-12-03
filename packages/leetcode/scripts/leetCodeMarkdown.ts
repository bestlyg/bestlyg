import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '1423. 可获得的最大点数',
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
            time: 92,
            memory: 26.23,
            desc: '滑动窗口记录左右两侧',
            code: `class Solution:
    def maxScore(self, cardPoints: List[int], k: int) -> int:
        n = len(cardPoints)
        l = sum(cardPoints[0:k])
        r = 0
        ans = l
        for i in range(k):
            r += cardPoints[n - 1 - i]
            l -= cardPoints[k - 1 - i]
            ans = max(ans, l + r)
        return ans`,
        },
        {
            script: Script.RUST,
            time: 8,
            memory: 3.19,
            desc: '同上',
            code: `impl Solution {
    pub fn max_score(card_points: Vec<i32>, k: i32) -> i32 {
        let k = k as usize;
        let n = card_points.len();
        let mut l = card_points[0..k].iter().sum::<i32>();
        let mut r = 0;
        let mut ans = l;
        for i in 0..k {
            r += card_points[n - 1 - i];
            l -= card_points[k - 1 - i];
            ans = ans.max(l + r);
        }
        ans
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
