import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '167. 两数之和 II - 输入有序数组',
    url: 'https://leetcode.cn/problems/maximum-split-of-positive-even-integers/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个整数 finalSum 。请你将它拆分成若干个 互不相同 的正偶数之和，且拆分出来的正偶数数目 最多 。`,
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
            time: 8,
            memory: 15.2,
            desc: '二分',
            code: `class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        int n = numbers.size();
        for (int i = 0; i < n; i++) {
            int l = i + 1, r = n;
            while (l < r) {
                int m = (l + r) / 2, val = numbers[m] + numbers[i];
                if (val < target) l = m + 1;
                else r = m;
            }
            if (l != n && numbers[i] + numbers[l] == target) return { i + 1, l + 1};
        }
        return {};
    }
};`,
        },
        {
            script: Script.PY,
            time: 112,
            memory: 17.1,
            desc: '同上',
            code: `class Solution:
    def twoSum(self, numbers: List[int], target: int) -> List[int]:
        n = len(numbers)
        for i in range(n):
            l = i + 1
            r = n
            while l < r:
                m = (l + r) // 2
                val = numbers[i] + numbers[m]
                if val < target:
                    l = m + 1
                else:
                    r = m
            if l != n and numbers[i] + numbers[l] == target:
                return [i+1, l+1]
        return []`,
        },
        {
            script: Script.RUST,
            time: 4,
            memory: 2.1,
            desc: '同上',
            code: `impl Solution {
    pub fn two_sum(numbers: Vec<i32>, target: i32) -> Vec<i32> {
        let n = numbers.len();
        for i in 0..n {
            let mut l = i + 1;
            let mut r = n;
            while l < r {
                let m = (l + r) / 2;
                let val = numbers[i] + numbers[m];
                if val < target {
                    l = m + 1;
                } else {
                    r = m;
                }
            }
            if l != n && numbers[i] + numbers[l] == target {
                return vec![(i as i32) + 1, (l as i32) + 1];
            }
        }
        return vec![];
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
