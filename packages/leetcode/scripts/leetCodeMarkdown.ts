import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1031. 两个非重叠子数组的最大和',
  url: 'https://leetcode.cn/problems/maximum-sum-of-two-non-overlapping-subarrays/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `给你一个整数数组 nums 和两个整数 firstLen 和 secondLen，请你找出并返回两个非重叠 子数组 中元素的最大和，长度分别为 firstLen 和 secondLen 。`,
  solutions: [
    //     {
    //       script: Script.TS,
    //       time: 76,
    //       memory: 45.9,
    //       desc: '遍历',
    //       code: `function sortPeople(names: string[], heights: number[]): string[] {
    //   return new Array(names.length)
    //     .fill(0)
    //     .map((_, i) => i)
    //     .sort((a, b) => heights[b] - heights[a])
    //     .map(i => names[i]);
    // }`,
    //       date: new Date('2022/09/25').getTime(),
    //     },
    {
      script: Script.CPP,
      time: 12,
      memory: 8.4,
      desc: '遍历',
      code: `vector<int> get_sums(vector<int> &arr) {
    vector<int> sums(1, 0);
    for (auto &num : arr) sums.push_back(sums.back() + num);
    return sums;
}
class Solution {
public:
    int maxSumTwoNoOverlap(vector<int>& nums, int firstLen, int secondLen) {
        int n = nums.size(), res = 0;
        auto sums = get_sums(nums);
        for (int i = 0; i + firstLen <= n; i++) {
            int num = sums[i + firstLen] - sums[i];
            for (int j = 0; j + secondLen < i; j++) res = max(res, sums[j + secondLen] - sums[j] + num);
            for (int j = i + firstLen; j + secondLen <= n; j++) res = max(res, sums[j + secondLen] - sums[j] + num);
        }
        return res;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 260,
      memory: 15,
      desc: '同上',
      code: `class Solution:
    def maxSumTwoNoOverlap(self, nums: List[int], firstLen: int, secondLen: int) -> int:
        sums = [0]
        for num in nums:
            sums.append(sums[-1] + num)
        n = len(nums)
        res = i = 0
        while i + firstLen <= n:
            num = sums[i+firstLen] - sums[i]
            j = 0
            while j + secondLen < i:
                res = max(res, sums[j + secondLen] - sums[j] + num)
                j += 1
            j = i + firstLen
            while j + secondLen <= n:
                res = max(res, sums[j + secondLen] - sums[j] + num)
                j += 1
            i += 1
        return res`,
    },
    {
      script: Script.RUST,
      time: 4,
      memory: 2.2,
      desc: '同上',
      code: `fn get_sums(arr: &Vec<i32>) -> Vec<i32> {
    let mut sums = vec![0];
    for num in arr {
        sums.push(sums.last().unwrap() + *num);
    }
    sums
}

impl Solution {
    pub fn max_sum_two_no_overlap(nums: Vec<i32>, first_len: i32, second_len: i32) -> i32 {
        use std::cmp::max;
        let sums = get_sums(&nums);
        let (first_len, second_len) = (first_len as usize, second_len as usize);
        let n = nums.len();
        let mut res = 0;
        let mut i = 0;
        while i + first_len <= n {
            let num = sums[i + first_len] - sums[i];
            let mut j = 0;
            while j + second_len < i {
                res = max(res, sums[j + second_len] - sums[j] + num);
                j += 1;
            }
            j = i + first_len;
            while j + second_len <= n {
                res = max(res, sums[j + second_len] - sums[j] + num);
                j += 1;
            }
            i += 1
        }
        res
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
