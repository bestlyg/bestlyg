import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1574. 删除最短的子数组使剩余数组有序',
  url: 'https://leetcode.cn/problems/shortest-subarray-to-be-removed-to-make-array-sorted/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `给你一个整数数组 arr ，请你删除一个子数组（可以为空），使得 arr 中剩下的元素是 非递减 的。`,
  solutions: [
    {
      script: Script.CPP,
      time: 100,
      memory: 65.37,
      desc: '贪心的取左右最长递增',
      code: `class Solution {
public:
    int findLengthOfShortestSubarray(vector<int>& arr) {
        int n = arr.size(), right = n - 1;
        while (right - 1 >= 0 && arr[right - 1] <= arr[right]) right--;
        if (right == 0) return 0;
        int res = right;
        for (int left = 0; left < n; left++) {
            if (left && arr[left] < arr[left - 1]) break;
            while (right < n && arr[right] < arr[left]) right++;
            res = min(res, right - left - 1);
        }
        return res;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 72,
      memory: 29.8,
      desc: '同上',
      code: `class Solution:
    def findLengthOfShortestSubarray(self, arr: List[int]) -> int:
        n = len(arr)
        r = n-1
        while r - 1 >= 0 and arr[r-1] <= arr[r]:
            r -= 1
        if r == 0:
            return 0
        res = r
        for l in range(n):
            if l and arr[l] < arr[l-1]:
                break
            while r < n and arr[r] < arr[l]:
                r += 1
            res = min(res, r-l-1)
        return res`,
    },
    {
      script: Script.RUST,
      time: 12,
      memory: 3.5,
      desc: '同上',
      code: `impl Solution {
    pub fn find_length_of_shortest_subarray(arr: Vec<i32>) -> i32 {
        let n = arr.len();
        let mut right = n - 1;
        while right != 0 && arr[right - 1] <= arr[right] {
            right -= 1;
        }
        if right == 0 {
            0
        } else {
            let mut res = right;
            for left in 0..n {
                if left > 0 && arr[left] < arr[left - 1] {
                    break;
                }
                while right < n && arr[right] < arr[left] {
                    right += 1
                }
                res = res.min(right - left - 1)
            }
            res as i32
        }
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
