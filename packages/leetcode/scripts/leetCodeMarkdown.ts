import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2679. 矩阵中的和',
    url: 'https://leetcode.cn/problems/sum-in-a-matrix/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个下标从 0 开始的二维整数数组 nums 。请你返回最后的 分数 。`,
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
            time: 176,
            memory: 67.4,
            desc: '堆',
            code: `class Solution {
public:
    int matrixSum(vector<vector<int>>& nums) {
        int n = nums.size(), m = nums[0].size();
        vector<priority_queue<int>> qs(n);
        for (int i = 0; i < n; i++) {
            auto &q = qs[i];
            for (auto &num : nums[i]) q.push(num);
        }
        int res = 0;
        for (int j = 0; j < m; j++) {
            priority_queue<int> q;
            for (int i = 0; i < n; i++) {
                q.push(qs[i].top());
                qs[i].pop();
            }
            res += q.top();
        }
        return res;
    }
};`,
        },
        {
            script: Script.CPP,
            time: 100,
            memory: 46.9,
            desc: '排序',
            code: `class Solution {
public:
    int matrixSum(vector<vector<int>>& nums) {
        int res = 0;
        for (auto &row : nums) sort(row.begin(), row.end());
        for (int j = nums[0].size() - 1; j >= 0; j--) {
            int val = 0;
            for (int i = 0; i < nums.size(); i++) val = max(val, nums[i][j]);
            res += val;
        }
        return res;
    }
};`,
        },
        {
            script: Script.PY,
            time: 132,
            memory: 33.6,
            desc: '同上',
            code: `class Solution:
    def matrixSum(self, nums: List[List[int]]) -> int:
        for l in nums:
            l.sort()
        res = 0
        for j in range(len(nums[0]) - 1, -1, -1):
            val = 0
            for i in range(len(nums)):
                val = max(val, nums[i][j])
            res += val
        return res`,
        },
        {
            script: Script.RUST,
            time: 20,
            memory: 3.6,
            desc: '同上',
            code: `impl Solution {
    pub fn matrix_sum(mut nums: Vec<Vec<i32>>) -> i32 {
        let mut res = 0;
        for row in &mut nums {
            row.sort()
        }
        for j in (0..nums[0].len()).rev() {
            let mut val = 0;
            for i in 0..nums.len() {
                val = val.max(nums[i][j]);
            }
            res += val;
        }
        res
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
