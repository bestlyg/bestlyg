import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '918. 环形子数组的最大和',
    url: 'https://leetcode.cn/problems/maximum-sum-circular-subarray/',
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
            time: 100,
            memory: 48,
            desc: '前缀和统计，单调队列记录区间最大值',
            code: `class Solution {
public:
    int maxSubarraySumCircular(vector<int>& nums) {
        int n = nums.size();
        vector<int> sums(1, 0);
        for (auto &num : nums) {
            sums.push_back(num + sums.back());
        }
        for (auto &num : nums) {
            sums.push_back(num + sums.back());
        }
        deque<int> q;
        for (int i = 1; i <= n; i++) {
            while (q.size() && sums[q.back()] > sums[i]) q.pop_back();
            q.push_back(i);
        }
        int res = INT_MIN;
        for (int i = n + 1; i < sums.size(); i++) {
            res = max(res, nums[i - n - 1]);
            while (q.size() && q.front() < i - n) q.pop_front();
            while (q.size() && sums[q.back()] > sums[i]) q.pop_back();
            if (q.size()) res = max(res, sums[i] - sums[q.front()]);
            q.push_back(i);
        }
        return res;
    }
};`,
        },
        {
            script: Script.PY,
            time: 396,
            memory: 22.3,
            desc: '同上',
            code: `class Solution:
    def maxSubarraySumCircular(self, nums: List[int]) -> int:
        n = len(nums)
        sums = [0]
        for num in nums:
            sums.append(num + sums[-1])
        for num in nums:
            sums.append(num + sums[-1])
        q = deque()
        for i in range(1, n+1):
            while len(q) and sums[q[-1]] > sums[i]:
                q.pop()
            q.append(i)
        res = -inf
        for i in range(n+1, len(sums)):
            res = max(res, nums[i-n-1])
            while len(q) and q[0] < i - n:
                q.popleft()
            while len(q) and sums[q[-1]] > sums[i]:
                q.pop()
            if len(q):
                res = max(res, sums[i] - sums[q[0]])
            q.append(i)
        return res`,
        },
        {
            script: Script.RUST,
            time: 16,
            memory: 2.8,
            desc: '同上',
            code: `impl Solution {
    pub fn max_subarray_sum_circular(nums: Vec<i32>) -> i32 {
        let n = nums.len();
        let mut sums = vec![0];
        for num in &nums {
            sums.push(sums.last().unwrap() + num);
        }
        for num in &nums {
            sums.push(sums.last().unwrap() + num);
        }
        let mut q = std::collections::VecDeque::<usize>::new();
        for i in 1..=n {
            while !q.is_empty() && sums[*q.back().unwrap()] > sums[i] {
                q.pop_back();
            }
            q.push_back(i);
        }
        let mut res = i32::MIN;
        for i in (n + 1)..sums.len() {
            res = res.max(nums[i - n - 1]);
            while !q.is_empty() && *q.front().unwrap() < i - n {
                q.pop_front();
            }
            while !q.is_empty() && sums[*q.back().unwrap()] > sums[i] {
                q.pop_back();
            }
            if !q.is_empty() {
                res = res.max(sums[i] - sums[*q.front().unwrap()]);
            }
            q.push_back(i);
        }
        res
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
