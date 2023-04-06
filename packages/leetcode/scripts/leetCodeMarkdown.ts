import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1017. 负二进制转换',
  url: 'https://leetcode.cn/problems/convert-to-base-2/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `给你一个整数 n ，以二进制字符串的形式返回该整数的 负二进制（base -2）表示。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory:5.8,
      desc: '遍历',
      code: `class Solution {
public:
    string baseNeg2(int n) {
        return n == 0 ? "0" :
               n == 1 ? "1" :
               n % 2 != 0 ? baseNeg2((n - 1) / -2) + "1" :
               baseNeg2(n / -2) + "0";
    }
};`,
    },
    {
      script: Script.PY3,
      time: 40,
      memory: 14.7,
      desc: '同上',
      code: `class Solution:
    def baseNeg2(self, n: int) -> str:
        if n == 0:
            return "0"
        elif n == 1:
            return "1"
        elif n % 2 != 0:
            return self.baseNeg2((n - 1) / -2) + "1"
        else:
            return self.baseNeg2(n / -2) + "0"`,
    },
    {
      script: Script.RUST,
      time: 0,
      memory: 2.2,
      desc: '同上',
      code: `impl Solution {
    pub fn base_neg2(n: i32) -> String {
        if n == 0 {
            "0".to_string()
        } else if n == 1 {
            "1".to_string()
        } else if n % 2 != 0 {
            Solution::base_neg2((n - 1) / -2) + "1"
        } else {
            Solution::base_neg2(n / -2) + "0"
        }
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
