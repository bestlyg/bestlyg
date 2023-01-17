import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1814. 统计一个数组中好对子的数目',
  url: 'https://leetcode.cn/problems/count-nice-pairs-in-an-array/',
  difficulty: Difficulty.中等,
  tag: [Tag.数组, Tag.哈希表, Tag.数学, Tag.计数],
  desc: `请你返回好下标对的数目。`,
  solutions: [
    {
      script: Script.CPP,
      time: 84,
      memory: 55.5,
      desc: '双指针递归',
      code: `const int mod = 1e9 + 7;
class Solution {
public:
    int countNicePairs(vector<int>& nums) {
        unordered_map<int, int> m;
        int ans = 0;
        for (auto &num : nums) ans = (ans + m[num - rev(num)]++) % mod;
        return ans;
    }
    int rev(int num) {
        int ans = 0;
        for (; num; num /= 10) ans = ans * 10 + num % 10;
        return ans;
    }
};`,
    },
    {
      script: Script.RUST,
      time: 24,
      memory: 3.7,
      desc: '同上',
      code: `use std::collections::HashMap;
const MOD: i32 = 1000000007;
impl Solution {
    pub fn count_nice_pairs(nums: Vec<i32>) -> i32 {
        let mut m = HashMap::<i32, i32>::new();
        let mut ans = 0;
        for num in nums {
            let k = num - Solution::rev(num);
            let v = if m.contains_key(&k) {
                m.get_mut(&k).unwrap()
            } else {
                m.insert(k, 0);
                m.get_mut(&k).unwrap()
            };
            ans = (ans + *v) % MOD;
            *v += 1;
        }
        ans
    }
    fn rev(num: i32) -> i32 {
        let mut num = num;
        let mut ans = 0;
        while num != 0 {
            ans = ans * 10 + num % 10;
            num /= 10;
        }
        ans
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
