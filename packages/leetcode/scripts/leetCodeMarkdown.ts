import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2455. 可被三整除的偶数的平均值',
    url: 'https://leetcode.cn/problems/average-value-of-even-numbers-that-are-divisible-by-three/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个由正整数组成的整数数组 nums ，返回其中可被 3 整除的所有偶数的平均值。`,
    solutions: [
        //     {
        //       script: Script.TS,
        //       time: 76,
        //       memory: 45.3,
        //       desc: 'dfs',
        //       code: `// 特殊标识符，在左右相等时返回
        // }`,
        //     },
        {
            script: Script.CPP,
            time: 8,
            memory: 13.3,
            desc: '遍历',
            code: `class Solution {
public:
    int averageValue(vector<int>& nums) {
        int sum = 0, cnt = 0;
        for (auto &num : nums) {
            if (num % 6 == 0) sum += num, cnt++;
        }
        return cnt ? sum / cnt : 0;
    }
};`,
        },
        {
            script: Script.PY3,
            time: 84,
            memory: 15.9,
            desc: '同上',
            code: `class Solution:
    def averageValue(self, nums: List[int]) -> int:
        sum = cnt = 0
        for num in nums:
            if num % 6 == 0:
                sum += num
                cnt += 1
        return 0 if not cnt else sum // cnt`,
        },
        {
            script: Script.RUST,
            time: 0,
            memory: 2.1,
            desc: '同上',
            code: `impl Solution {
    pub fn average_value(nums: Vec<i32>) -> i32 {
        let (mut sum, mut cnt) = (0, 0);
        for num in nums {
            if num % 6 == 0 {
                sum += num;
                cnt += 1;
            }
        }
        if cnt == 0 {
            0
        } else {
            sum / cnt
        }
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
