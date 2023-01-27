import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1664. 生成平衡数组的方案数',
  url: 'https://leetcode.cn/problems/ways-to-make-a-fair-array/',
  difficulty: Difficulty.中等,
  tag: [Tag.数组, Tag.动态规划],
  desc: `如果一个数组满足奇数下标元素的和与偶数下标元素的和相等，该数组就是一个 平衡数组 。请你返回删除操作后，剩下的数组 nums 是 平衡数组 的 方案数 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 108,
      memory: 92,
      desc: '遍历',
      code: `class Solution {
public:
    int waysToMakeFair(vector<int>& nums) {
        int l[2] = {0}, r[2] = {0}, ans = 0;
        for (int i = 0; i < nums.size(); i++) r[i % 2] += nums[i];
        for (int i = 0; i < nums.size(); i++) {
            r[i % 2] -= nums[i];
            if (l[0] + r[1] == l[1] + r[0]) ans++;
            l[i % 2] += nums[i];
        }
        return ans;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 328,
      memory: 19.7,
      desc: '同上',
      code: `class Solution:
def waysToMakeFair(self, nums: List[int]) -> int:
    l = [0] * 2
    r = [0] * 2
    ans = 0
    for i, num in enumerate(nums):
        r[i % 2] += num
    for i, num in enumerate(nums):
        r[i % 2] -= num
        if l[0] + r[1] == l[1] + r[0]:
            ans += 1
        l[i % 2] += num
    return ans`,
    },
    {
      script: Script.RUST,
      time: 8,
      memory: 2.5,
      desc: '同上',
      code: `impl Solution {
    pub fn ways_to_make_fair(nums: Vec<i32>) -> i32 {
        let mut l = [0; 2];
        let mut r = [0; 2];
        let mut ans = 0;
        for i in 0..nums.len() {
            r[i % 2] += nums[i];
        }
        for i in 0..nums.len() {
            r[i % 2] -= nums[i];
            if l[0] + r[1] == l[1] + r[0] {
                ans += 1;
            }
            l[i % 2] += nums[i];
        }
        ans
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
