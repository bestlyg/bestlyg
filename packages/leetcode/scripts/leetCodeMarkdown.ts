import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist:! true,
    name: '2208. 将数组和减半的最少操作次数',
    url: 'https://leetcode.cn/problems/minimum-operations-to-halve-array-sum/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个正整数数组 nums 。每一次操作中，你可以从 nums 中选择 任意 一个数并将它减小到 恰好 一半。（注意，在后续操作中你可以对减半过的数继续执行操作）请你返回将 nums 数组和 至少 减少一半的 最少 操作数。`,
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
            time: 248,
            memory: 87.3,
            desc: '堆，每次减当前最大数',
            code: `class Solution {
public:
    int halveArray(vector<int>& nums) {
        int res = 0;
        double sum = 0, cur;
        priority_queue<double> q;
        for (auto &num : nums) {
            sum += num;
            q.push(num);
        }
        cur = sum;
        while (cur > sum / 2) {
            double top = q.top() / 2;
            q.pop();
            cur -= top;
            q.push(top);
            res += 1;
        }
        return res;
    }
};`,
        },
        {
            script: Script.PY,
            time: 400,
            memory: 30.6,
            desc: '同上',
            code: `class Solution:
    def halveArray(self, nums: List[int]) -> int:
        res = 0
        sum = 0.0
        q: List[float] = []
        for num in nums:
            sum += float(num)
            heappush(q, float(-num))
        cur = sum
        while cur > sum / 2:
            top = -heappop(q) / 2
            heappush(q, -top)
            cur -= top
            res += 1
        return res`,
        },
        {
            script: Script.RUST,
            time: 44,
            memory: 4.1,
            desc: '同上',
            code: `pub use std::cmp::Ordering;
#[derive(PartialEq)]
struct RevNum(f64);
impl Eq for RevNum {}
impl PartialOrd for RevNum {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        if other.0 > self.0 {
            Some(Ordering::Less)
        } else if other.0 < self.0 {
            Some(Ordering::Greater)
        } else {
            Some(Ordering::Equal)
        }
    }
}
impl Ord for RevNum {
    fn cmp(&self, other: &RevNum) -> Ordering {
        other.0.partial_cmp(&self.0).unwrap()
    }
}

impl Solution {
    pub fn halve_array(nums: Vec<i32>) -> i32 {
        let mut res = 0;
        let mut sum = 0.0;
        let mut cur = 0.0;
        let mut q = std::collections::BinaryHeap::new();
        for num in nums {
            let num = num as f64;
            sum += num;
            q.push(RevNum(num));
        }
        cur = sum;
        while cur > sum / 2.0 {
            let top = q.pop().unwrap().0 / 2.0;
            q.push(RevNum(top));
            cur -= top;
            res += 1;
        }
        res
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
