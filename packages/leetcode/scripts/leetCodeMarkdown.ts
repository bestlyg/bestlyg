import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1465. 切割后面积最大的蛋糕',
    url: 'https://leetcode.cn/problems/maximum-area-of-a-piece-of-cake-after-horizontal-and-vertical-cuts',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你按数组 horizontalCuts 和 verticalCuts 中提供的水平和竖直位置切割后，请你找出 面积最大 的那份蛋糕，并返回其 面积 。`,
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
            time: 64,
            memory: 31.09,
            desc: '排序后计算间隔',
            code: `class Solution {
public:
    int maxArea(int h, int w, vector<int>& horizontalCuts, vector<int>& verticalCuts) {
        long long resH = 0, resW = 0;
        sort(horizontalCuts.begin(), horizontalCuts.end());
        horizontalCuts.insert(horizontalCuts.begin(), 0);
        horizontalCuts.push_back(h);
        for (int i = 1; i < horizontalCuts.size(); i++) resH = max(resH, (long long)horizontalCuts[i] - horizontalCuts[i - 1]);
        sort(verticalCuts.begin(), verticalCuts.end());
        verticalCuts.insert(verticalCuts.begin(), 0);
        verticalCuts.push_back(w);
        for (int i = 1; i < verticalCuts.size(); i++) resW = max(resW, (long long)verticalCuts[i] - verticalCuts[i - 1]);
        return resH * resW % ((long long)1e9 + 7);
    }
};`,
        },
        {
            script: Script.PY,
            time: 108,
            memory: 27.1,
            desc: '同上',
            code: `class Solution:
    def maxArea(self, h: int, w: int, horizontalCuts: List[int], verticalCuts: List[int]) -> int:
        res = [0, 0]
        horizontalCuts.sort()
        horizontalCuts = [0] + horizontalCuts + [h]
        for i in range(1, len(horizontalCuts)):
            res[0] = max(res[0], horizontalCuts[i] - horizontalCuts[i - 1])
        
        verticalCuts.sort()
        verticalCuts = [0] + verticalCuts + [w]
        for i in range(1, len(verticalCuts)):
            res[1] = max(res[1], verticalCuts[i] - verticalCuts[i - 1])
        return res[0] * res[1] % (10 ** 9 + 7)`,
        },
        {
            script: Script.RUST,
            time: 16,
            memory: 4.29,
            desc: '同上',
            code: `impl Solution {
    pub fn max_area(h: i32, w: i32, horizontal_cuts: Vec<i32>, vertical_cuts: Vec<i32>) -> i32 {
        let mut horizontal_cuts = horizontal_cuts
            .into_iter()
            .map(|v| v as i64)
            .collect::<Vec<_>>();
        horizontal_cuts.sort();
        horizontal_cuts.insert(0, 0);
        horizontal_cuts.push(h as i64);
        let mut h = 0;
        for i in 1..horizontal_cuts.len() {
            h = h.max(horizontal_cuts[i] - horizontal_cuts[i - 1]);
        }
        let mut vertical_cuts = vertical_cuts
            .into_iter()
            .map(|v| v as i64)
            .collect::<Vec<_>>();
        vertical_cuts.sort();
        vertical_cuts.insert(0, 0);
        vertical_cuts.push(w as i64);
        let mut w = 0;
        for i in 1..vertical_cuts.len() {
            w = w.max(vertical_cuts[i] - vertical_cuts[i - 1]);
        }
        (h * w % (10i64.pow(9) + 7)) as i32
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
