import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '6890. 找出分区值',
    url: 'https://leetcode.cn/problems/find-the-value-of-the-partition/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个 正 整数数组 nums 。返回表示分区值的整数。`,
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
            time: 104,
            memory: 57.8,
            desc: '排序后左差比较',
            code: `class Solution {
public:
    int findValueOfPartition(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        int res = INT_MAX;
        for (int i = 1; i < nums.size(); i++) {
            res = min(res, nums[i] - nums[i - 1]);
        }
        return res;
    }
};`,
        },
        {
            script: Script.PY3,
            time: 132,
            memory: 27.8,
            desc: '同上',
            code: `class Solution:
    def findValueOfPartition(self, nums: List[int]) -> int:
        nums.sort()
        return min(nums[i] - nums[i - 1] for i in range(1, len(nums)))`,
        },
        {
            script: Script.RUST,
            time: 24,
            memory: 3.5,
            desc: '同上',
            code: `impl Solution {
pub fn find_value_of_partition(mut nums: Vec<i32>) -> i32 {
    nums.sort();
    (1..nums.len())
        .into_iter()
        .map(|i| nums[i] - nums[i - 1])
        .min()
        .unwrap()
}
}`,
        },
    ],
};

export default leetCodeMarkdown;
