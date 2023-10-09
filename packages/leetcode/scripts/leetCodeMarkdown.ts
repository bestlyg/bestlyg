import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2578. 最小和分割',
    url: 'https://leetcode.cn/problems/split-with-minimum-sum/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你返回 num1 和 num2 可以得到的和的 最小 值。`,
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
            time: 0,
            memory: 6.16,
            desc: '贪心',
            code: `class Solution {
public:
    int splitNum(int num) {
        vector<int> nums(10, 0);
        vector<int> res(2, 0);
        int cur = 0;
        for (; num; num /= 10) nums[num % 10]++;
        for (int i = 0; i < 10; i++) {
            for (; nums[i]; nums[i]--, cur ^= 1) {
                res[cur] = res[cur] * 10 + i;
            }
        }
        return res[0] + res[1];
    }
};`,
        },
        {
            script: Script.PY,
            time: 24,
            memory: 15.56,
            desc: '同上',
            code: `class Solution:
    def splitNum(self, num: int) -> int:
        nums = [0] * 10
        res = [0] * 2
        cur = 0
        while num:
            nums[num % 10] += 1
            num //= 10
        for i in range(10):
            while nums[i]:
                res[cur] = res[cur] * 10 + i
                nums[i] -= 1
                cur ^= 1
        return sum(res)`,
        },
        {
            script: Script.RUST,
            time: 0,
            memory: 2.03,
            desc: '同上',
            code: `impl Solution {
    pub fn split_num(num: i32) -> i32 {
        let mut num = num as usize;
        let mut nums = vec![0; 10];
        let mut res = vec![0; 2];
        let mut cur = 0;
        while num != 0 {
            nums[num % 10] += 1;
            num /= 10;
        }
        for i in 0..10 {
            while nums[i] != 0 {
                res[cur] = res[cur] * 10 + i;
                cur ^= 1;
                nums[i] -= 1;
            }
        }
        res.into_iter().sum::<usize>() as i32
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
