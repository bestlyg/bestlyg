import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1186. 删除一次得到子数组最大和',
    url: 'https://leetcode.cn/problems/maximum-subarray-sum-with-one-deletion/submissions/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个整数数组，返回它的某个 非空 子数组（连续元素）在执行一次可选的删除操作后，所能得到的最大元素总和。换句话说，你可以从原数组中选出一个子数组，并可以决定要不要从中删除一个元素（只能删一次哦），（删除后）子数组中至少应当有一个元素，然后该子数组（剩下）的元素总和是所有子数组之中最大的。`,
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
            time: 32,
            memory: 22.6,
            desc: 'dp[i]表示以arr[i]为结尾的删0个和1个时的最大值',
            code: `#define MIN -0x3f3f3f3f
class Solution {
public:
    int maximumSum(vector<int>& arr) {
        int n = arr.size(), dp0 = MIN, dp1 = MIN, res = MIN;
        for (int i = 0; i < n; i++) {
            dp1 = max(dp0, dp1 + arr[i]);
            dp0 = max(dp0, 0) + arr[i];
            res = max(res, max(dp0, dp1));
        }
        return res;
    }
};`,
        },
        {
            script: Script.PY,
            time: 104,
            memory: 24.2,
            desc: '同上',
            code: `class Solution:
    def maximumSum(self, arr: List[int]) -> int:
        dp0 = dp1 = res = -inf
        for num in arr:
            dp1 = max(dp0, dp1 + num)
            dp0 = max(dp0, 0) + num
            res = max(res, max(dp0, dp1))
        return res`,
        },
        {
            script: Script.RUST,
            time: 8,
            memory: 3,
            desc: '同上',
            code: `impl Solution {
    pub fn maximum_sum(arr: Vec<i32>) -> i32 {
        use std::cmp::max;
        let (mut dp0, mut dp1, mut res) = (-0x3f3f3f3f, -0x3f3f3f3f, -0x3f3f3f3f);
        for num in arr {
            dp1 = max(dp0, dp1 + num);
            dp0 = max(dp0, 0) + num;
            res = max(res, max(dp0, dp1));
        }
        res
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
