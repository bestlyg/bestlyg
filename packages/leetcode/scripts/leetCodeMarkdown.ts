import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '42. 接雨水',
    url: 'https://leetcode.cn/problems/max-value-of-equation/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `定一个长度为 n 的环形整数数组 nums ，返回 nums 的非空 子数组 的最大可能和 。`,
    solutions: [
        // {
        //     date: new Date('2020/10/06').getTime(),
        //     script: Script.JS,
        //     time: 224,
        //     memory: 54.2,
        //     desc: 'dfs',
        //     code: ``,
        // },
        {
            script: Script.CPP,
            time: 16,
            memory: 19.6,
            desc: '统计左右最大高度',
            code: `class Solution {
public:
    int trap(vector<int>& height) {
        int sum = 0, n = height.size();
        vector<int> r(n, 0);
        for (int i = n - 1, cur = 0; i >= 0; i--) {
            r[i] = cur;
            cur = max(cur, height[i]);
        }
        for (int i = 0, cur = 0; i < n; i++) {
            cur = max(cur, height[i]);
            sum += max(0, min(cur, r[i]) - height[i]);
        }
        return sum;
    }
};`,
        },
        {
            script: Script.PY,
            time: 68,
            memory: 17.7,
            desc: '同上',
            code: `class Solution:
    def trap(self, height: List[int]) -> int:
        sum = 0
        n = len(height)
        cur = 0
        r = [0] * n
        for i in range(n-1, -1, -1):
            r[i] = cur
            cur = max(cur, height[i])
        cur = 0
        for i in range(n):
            cur = max(cur, height[i])
            sum += max(0, min(cur, r[i])-height[i])
        return sum`,
        },
        {
            script: Script.RUST,
            time: 0,
            memory: 2.2,
            desc: '同上',
            code: `impl Solution {
    pub fn trap(height: Vec<i32>) -> i32 {
        let mut sum = 0;
        let n = height.len();
        let mut cur = 0;
        let mut r = vec![0; n];
        for i in (0..n).rev() {
            r[i] = cur;
            cur = cur.max(height[i]);
        }
        cur = 0;
        for i in 0..n {
            cur = cur.max(height[i]);
            sum += 0.max(cur.min(r[i]) - height[i]);
        }
        sum
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
