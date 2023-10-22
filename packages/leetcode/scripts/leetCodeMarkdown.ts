import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1402. 做菜顺序',
    url: 'https://leetcode.cn/problems/reducing-dishes',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `返回厨师在准备了一定数量的菜肴后可以获得的最大 like-time 系数 总和。`,
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
            time: 4,
            memory: 7.93,
            desc: '排序后贪心判断',
            code: `class Solution {
public:
    int maxSatisfaction(vector<int>& satisfaction) {
        sort(satisfaction.begin(), satisfaction.end());
        int n = satisfaction.size(), nsum = 0, vsum = 0, res = 0;
        for (int i = 0; i < n; i++) {
            nsum += (i + 1) * satisfaction[i];
            vsum += satisfaction[i];
        }
        res = max(res, nsum);
        for (int i = 1; i < n; i++) {
            if (satisfaction[i] >= 0) break;
            nsum -= vsum;
            vsum -= satisfaction[i - 1];
            res = max(res, nsum);
        }
        return res;
    }
};`,
        },
        {
            script: Script.PY,
            time: 24,
            memory: 15.69,
            desc: '同上',
            code: `class Solution:
    def maxSatisfaction(self, satisfaction: List[int]) -> int:
        satisfaction.sort()
        n = len(satisfaction)
        res = nsum = sum((i + 1) * satisfaction[i] for i in range(n))
        sumv = sum(satisfaction)
        for i in range(1, n):
            if satisfaction[i] >= 0: break
            nsum -= sumv
            sumv -= satisfaction[i - 1]
            res = max(res, nsum)

        return max(0, res)`,
        },
        {
            script: Script.RUST,
            time: 0,
            memory: 1.98,
            desc: '同上',
            code: `impl Solution {
    pub fn max_satisfaction(mut satisfaction: Vec<i32>) -> i32 {
        satisfaction.sort();
        let n = satisfaction.len();
        let mut res = 0;
        let mut nsum = 0;
        let mut vsum = 0;
        for i in 0..n {
            nsum += (i as i32 + 1) * satisfaction[i];
            vsum += satisfaction[i]
        }
        res = res.max(nsum);
        for i in 1..n {
            if satisfaction[i] >= 0 {
                break;
            }
            nsum -= vsum;
            vsum -= satisfaction[i - 1];
            res = res.max(nsum);
        }
        res
    }
}
`,
        },
    ],
};

export default leetCodeMarkdown;
