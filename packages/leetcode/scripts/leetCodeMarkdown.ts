import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '2341. 数组能形成多少数对',
  url: 'https://leetcode.cn/problems/maximum-number-of-pairs-in-array/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `返回一个下标从 0 开始、长度为 2 的整数数组 answer 作为答案，其中 answer[0] 是形成的数对数目，answer[1] 是对 nums 尽可能执行上述操作后剩下的整数数目。`,
  solutions: [
    {
      script: Script.CPP,
      time: 4,
      memory: 8.9,
      desc: '遍历',
      code: `class Solution {
public:
    vector<int> numberOfPairs(vector<int>& nums) {
        int list[105] = {0};
        vector<int> res(2, 0);
        for (auto &num : nums) {
            list[num] ^= 1;
            if (list[num] == 0) res[0]++;
        }
        for (int i = 0; i < 105; i++) res[1] += list[i];
        return res;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 36,
      memory: 14.9,
      desc: '同上',
      code: `class Solution:
    def numberOfPairs(self, nums: List[int]) -> List[int]:
        l = [0] * 105
        res = [0] * 2
        for num in nums:
            l[num] ^= 1
            if l[num] == 0:
                res[0] += 1
        for i in range(105):
            res[1] += l[i]
        return res`,
    },
    {
      script: Script.RUST,
      time: 0,
      memory:2.1,
      desc: '同上',
      code: `impl Solution {
        pub fn number_of_pairs(nums: Vec<i32>) -> Vec<i32> {
            let mut list = [0; 105];
            let mut ans = vec![0; 2];
            for num in nums {
                let num = num as usize;
                list[num] ^= 1;
                if list[num] == 0 {
                    ans[0] += 1;
                }
            }
            for i in 0..105 {
                ans[1] += list[i];
            }
            ans
        }
    }`,
    },
  ],
};

export default leetCodeMarkdown;

