import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '2335. 装满杯子需要的最短总时长',
  url: 'https://leetcode.cn/problems/minimum-amount-of-time-to-fill-cups/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `给你一个下标从 0 开始、长度为 3 的整数数组 amount ，其中 amount[0]、amount[1] 和 amount[2] 分别表示需要装满冷水、温水和热水的杯子数量。返回装满所有杯子所需的 最少 秒数。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 11.5,
      desc: '堆',
      code: `class Solution {
public:
    int fillCups(vector<int>& amount) {
        priority_queue<int> q;
        for (auto &num : amount) if (num) q.push(num);
        int res = 0;
        while (q.size() >= 2) {
            int num1 = q.top(); q.pop();
            int num2 = q.top(); q.pop();
            if (num1 != 1) q.push(num1 - 1);
            if (num2 != 1) q.push(num2 - 1);
            res++;
        }
        if (q.size()) res += q.top();
        return res;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 40,
      memory: 14.9,
      desc: '同上',
      code: `class Solution:
    def fillCups(self, amount: List[int]) -> int:
        amount = [-v for v in amount if v]
        heapify(amount)
        res = 0
        while len(amount) >= 2:
            num1, num2 = heappop(amount), heappop(amount)
            if num1 < -1:
                heappush(amount, num1+1)
            if num2 < -1:
                heappush(amount, num2+1)
            res += 1
        if len(amount):
            res += -heappop(amount)
        return res`,
    },
    {
      script: Script.RUST,
      time: 0,
      memory: 2,
      desc: '同上',
      code: `impl Solution {
    pub fn fill_cups(amount: Vec<i32>) -> i32 {
        use std::collections::BinaryHeap;
        let mut heap = BinaryHeap::new();
        for num in amount {
            if num != 0 {
                heap.push(num)
            }
        }
        let mut res = 0;
        while heap.len() >= 2 {
            let (num1, num2) = (heap.pop().unwrap(), heap.pop().unwrap());
            if num1 != 1 {
                heap.push(num1 - 1);
            }
            if num2 != 1 {
                heap.push(num2 - 1)
            }
            res += 1
        }
        if !heap.is_empty() {
            res += heap.pop().unwrap();
        }
        res
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
