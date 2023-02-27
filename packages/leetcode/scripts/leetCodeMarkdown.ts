import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1144. 递减元素使数组呈锯齿状',
  url: 'https://leetcode.cn/problems/decrease-elements-to-make-array-zigzag//',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `返回将数组 nums 转换为锯齿数组所需的最小操作次数。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 7,
      desc: '遍历',
      code: `class Solution {
public:
    int movesToMakeZigzag(vector<int>& nums) {
        if (nums.size() == 1) return 0;
        return min(try1(nums), try2(nums));
    }
    int try1(vector<int> &nums) {
        int res = 0;
        for (int i = 1; i < nums.size(); i += 2) {
            int p = nums[i - 1];
            if (i + 1 < nums.size()) p = min(p, nums[i + 1]);
            if (nums[i] >= p) res += nums[i] - p + 1;
        }
        return res;
    }
    int try2(vector<int> &nums) {
        int res = 0;
        if (nums[0] >= nums[1]) res += nums[0] - nums[1] + 1;
        for (int i = 2; i < nums.size(); i += 2) {
            int p = nums[i - 1];
            if (i + 1 < nums.size()) p = min(p, nums[i + 1]);
            if (nums[i] >= p) res += nums[i] - p + 1;
        }
        return res;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 32,
      memory: 14.9,
      desc: '同上',
      code: `class Solution:
    def movesToMakeZigzag(self, nums: List[int]) -> int:
        n = len(nums)
        if n == 1:
            return 0
  
        def try1():
            res = 0
            for i in range(1, n, 2):
                p = nums[i-1]
                if i+1 < n:
                    p = min(p, nums[i+1])
                if nums[i] >= p:
                    res += nums[i] - p + 1
            return res
  
        def try2():
            res = 0
            if nums[0] >= nums[1]:
                res += nums[0] - nums[1] + 1
            for i in range(2, n, 2):
                p = nums[i - 1]
                if i + 1 < n:
                    p = min(p, nums[i + 1])
                if nums[i] >= p:
                    res += nums[i] - p + 1
            return res
        return min(try1(), try2())`,
    },
    {
      script: Script.RUST,
      time: 0,
      memory: 1.9,
      desc: '同上',
      code: `impl Solution {
    pub fn moves_to_make_zigzag(nums: Vec<i32>) -> i32 {
        let n = nums.len();
        if n == 1 {
            0
        } else {
            let try1 = || {
                let mut res = 0;
                let mut i = 1;
                while i < n {
                    let mut p = nums[i - 1];
                    if i + 1 < n {
                        p = p.min(nums[i + 1]);
                    }
                    if nums[i] >= p {
                        res += nums[i] - p + 1;
                    }
                    i += 2;
                }
                res
            };
            let try2 = || {
                let mut res = 0;
                if nums[0] >= nums[1] {
                    res += nums[0] - nums[1] + 1;
                }
                let mut i = 2;
                while i < n {
                    let mut p = nums[i - 1];
                    if i + 1 < n {
                        p = p.min(nums[i + 1]);
                    }
                    if nums[i] >= p {
                        res += nums[i] - p + 1;
                    }
                    i += 2;
                }
                res
            };
            try1().min(try2())
        }
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
