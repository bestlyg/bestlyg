import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '6321. 执行操作后的最大 MEX',
  url: 'https://leetcode.cn/problems/smallest-missing-non-negative-integer-after-operations///',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `返回在执行上述操作 任意次 后，nums 的最大 MEX 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 224,
      memory: 117.9,
      desc: '先对所有数字进行取模归并，再依次寻找',
      code: `class Solution {
public:
    int findSmallestInteger(vector<int>& nums, int value) {
        unordered_map<int,int> m;
        for (auto &num: nums) m[(num % value + value) % value]++;
        for (int i = 0; ;i++) {
            if (m[i%value]) m[i%value]--;
            else return i;
        }
        return 0;

    }
};`,
    },
    {
      script: Script.PY3,
      time: 356,
      memory: 35.3,
      desc: '同上',
      code: `class Solution:
    def findSmallestInteger(self, nums: List[int], value: int) -> int:
        m = Counter()
        for num in nums:
            m[(num % value + value) % value] += 1
        i = 0
        while True:
            if m[i % value]:
                m[i % value] -= 1
            else:
                return i
            i += 1`,
    },
    {
      script: Script.RUST,
      time: 56,
      memory: 6.6,
      desc: '同上',
      code: `impl Solution {
    pub fn find_smallest_integer(nums: Vec<i32>, value: i32) -> i32 {
        let mut m = std::collections::HashMap::<i32, usize>::new();
        for num in nums {
            *m.entry((num % value + value) % value).or_insert(0) += 1;
        }
        let mut i = 0;
        loop {
            let item = m.get_mut(&(i % value));
            if let Some(v) = item {
                if *v == 0 {
                    return i;
                } else {
                    *v -= 1;
                }
            } else {
                return i as i32;
            }
            i += 1;
        }
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
