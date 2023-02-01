import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '2552. 统计上升四元组',
  url: 'https://leetcode.cn/problems/count-increasing-quadruplets/',
  difficulty: Difficulty.困难,
  tag: [],
  desc: `给你一个长度为 n 下标从 0 开始的整数数组 nums ，它包含 1 到 n 的所有数字，请你返回上升四元组的数目。`,
  solutions: [
    {
      script: Script.CPP,
      time: 272,
      memory: 10.6,
      desc: '枚举l，对于每一个l，查找可能的j，记录j的132模式个数，即i<j<k&&v[i]<v[k]<v[j]',
      code: `class Solution {
public:
    typedef long long ll;
    ll countQuadruplets(vector<int>& nums) {
        int n = nums.size();
        ll ans = 0;
        vector<int> list(n, 0);
        for (int l = 0; l < n; l++) {
            for (int j = 0; j < l - 1; j++) {
                if (nums[j] < nums[l]) ans += list[j];
            }
            for (int j = 0, cnt = 0; j < l; j++) {
                if (nums[j] > nums[l]) list[j] += cnt;
                if (nums[j] < nums[l]) cnt++;
            }
        }
        return ans;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 2284,
      memory: 15.2,
      desc: '同上',
      code: `class Solution:
    def countQuadruplets(self, nums: List[int]) -> int:
        n = len(nums)
        ans = 0
        list = [0] * n
        for l in range(n):
            for j in range(l):
                if nums[j] < nums[l]:
                    ans += list[j]
            cnt = 0
            for j in range(l):
                if nums[j] > nums[l]:
                    list[j] += cnt
                if nums[j] < nums[l]:
                    cnt += 1
        return ans`,
    },
    {
      script: Script.RUST,
      time: 72,
      memory: 2.1,
      desc: '同上',
      code: `impl Solution {
    pub fn count_quadruplets(nums: Vec<i32>) -> i64 {
        let n = nums.len();
        let mut list = vec![0; n];
        let mut ans = 0;
        for l in 0..n {
            for j in 0..l {
                if nums[j] < nums[l] {
                    ans += list[j];
                }
            }
            let mut cnt = 0;
            for j in 0..l {
                if nums[j] > nums[l] {
                    list[j] += cnt;
                }
                if nums[j] < nums[l] {
                    cnt += 1;
                }
            }
        }
        ans
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
