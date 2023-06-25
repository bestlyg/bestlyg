import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1401. 圆和矩形是否有重叠',
    url: 'https://leetcode.cn/problems/circle-and-rectangle-overlapping/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个以 (radius, xCenter, yCenter) 表示的圆和一个与坐标轴平行的矩形 (x1, y1, x2, y2) ，其中 (x1, y1) 是矩形左下角的坐标，而 (x2, y2) 是右上角的坐标。如果圆和矩形有重叠的部分，请你返回 true ，否则返回 false 。换句话说，请你检测是否 存在 点 (xi, yi) ，它既在圆上也在矩形上（两者都包括点落在边界上的情况）。`,
    solutions: [
        //         {
        //             script: Script.TS,
        //             time: 156,
        //             memory: 69,
        //             desc: '对于每个是对象的value，进行dfs',
        //             code: `type Obj = Record<any, any>;

        // function compactObject(obj: Obj): Obj {
        //     const res: any = Array.isArray(obj) ? [] : {};
        //     for (const [k, v] of Object.entries(obj)) {
        //         if (Boolean(v)) {
        //             const newv = typeof v === 'object' ? compactObject(v) : v;
        //             if (Array.isArray(obj)) res.push(newv);
        //             else res[k] = newv;
        //         }
        //     }
        //     return res;
        // };`,
        // },
        {
            script: Script.CPP,
            time: 0,
            memory: 5.7,
            desc: '对于圆在矩形的四边和在四个远郊区都进行检测',
            code: `class Solution {
public:
    bool checkOverlap(int radius, int xCenter, int yCenter, int x1, int y1, int x2, int y2) {
        double xCenter2 = 1.0 * (x2 + x1) / 2, yCenter2 = 1.0 * (y2 + y1) / 2, d2 = yCenter2 - y1, d1 = xCenter2 - x1;
        auto check = [&](double x1, double y1, double x2, double y2, double d) { return fabs(x1 - x2) * fabs(x1 - x2) + fabs(y1 - y2) * fabs(y1 - y2) <= d * d; };
        return xCenter2 - d1 <= xCenter && xCenter <= xCenter2 + d1 && yCenter2 - d2 <= yCenter && yCenter <= yCenter2 + d2 ||
               xCenter2 - d1 <= xCenter && xCenter <= xCenter2 + d1 && yCenter2 <= yCenter && yCenter <= yCenter2 + d2 + radius ||
               xCenter2 - d1 <= xCenter && xCenter <= xCenter2 + d1 && yCenter2 - d2 - radius <= yCenter && yCenter <= yCenter2 ||
               yCenter2 - d2 <= yCenter && yCenter <= yCenter2 + d2 && xCenter2 <= xCenter && xCenter <= xCenter2 + d1 + radius ||
               yCenter2 - d2 <= yCenter && yCenter <= yCenter2 + d2 && xCenter2 - d1 - radius <= xCenter && xCenter <= xCenter2 ||
               check(xCenter, yCenter, x1, y1, radius) ||
               check(xCenter, yCenter, x1, y2, radius) ||
               check(xCenter, yCenter, x2, y1, radius) ||
               check(xCenter, yCenter, x2, y2, radius)
               ;
               
    }
};`,
        },
        {
            script: Script.CPP,
            time: 4,
            memory: 5.6,
            desc: '计算两个形状的最近距离',
            code: `class Solution {
public:
    bool checkOverlap(int radius, int xCenter, int yCenter, int x1, int y1, int x2, int y2) {
        int x = clamp(xCenter, x1, x2) - xCenter, y = clamp(yCenter, y1, y2) - yCenter;
        return pow(x, 2) + pow(y, 2) <= pow(radius, 2);
    }
};`,
        },
        {
            script: Script.PY3,
            time: 40,
            memory: 16,
            desc: '同上',
            code: `class Solution:
    def checkOverlap(self, radius: int, xCenter: int, yCenter: int, x1: int, y1: int, x2: int, y2: int) -> bool:
        x = max(min(xCenter, x2), x1) - xCenter
        y = max(min(yCenter, y2), y1) - yCenter
        return pow(x, 2) + pow(y, 2) <= pow(radius, 2)
`,
        },
        {
            script: Script.RUST,
            time: 0,
            memory: 1.9,
            desc: '同上',
            code: `impl Solution {
    pub fn check_overlap(
        radius: i32,
        x_center: i32,
        y_center: i32,
        x1: i32,
        y1: i32,
        x2: i32,
        y2: i32,
    ) -> bool {
        let x = x_center.clamp(x1, x2) - x_center;
        let y = y_center.clamp(y1, y2) - y_center;
        x.pow(2) + y.pow(2) <= radius.pow(2)
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
