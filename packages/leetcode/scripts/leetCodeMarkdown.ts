import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '面试题 05.02. 二进制数转字符串',
  url: 'https://leetcode.cn/problems/bianry-number-to-string-lcci/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `二进制数转字符串。给定一个介于0和1之间的实数（如0.72），类型为double，打印它的二进制表达式。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 6,
      desc: '遍历',
      code: `class Solution {
public:
    string printBin(double num) {
        string res = "0.";
        for (int i = 1; i < 32 && num > 0; i++) {
            if (num >= pow(2, -i)) num -= pow(2, -i), res += "1";
            else res += "0";
        }
        if (num) return "ERROR";
        return res;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 28,
      memory: 14.7,
      desc: '同上',
      code: `class Solution:
    def printBin(self, num: float) -> str:
        res = "0."
        for i in range(1, 32):
            if num <= 0:
                break
            if num >= pow(2, -i):
                num -= pow(2, -i)
                res += "1"
            else:
                res += "0"
        return "ERROR" if num else res`,
    },
    {
      script: Script.RUST,
      time: 0,
      memory: 2.4,
      desc: '同上',
      code: `impl Solution {
        pub fn print_bin(num: f64) -> String {
            let mut num = num;
            let mut res = String::from("0.");
            for i in 1..32 {
                if num == 0.0 {
                    break;
                }
                if num >= 2f64.powf(-i as f64) {
                    num -= 2f64.powf(-i as f64);
                    res.push('1');
                } else {
                    res.push('0');
                }
            }
            if num > 0.0 {
                "ERROR".to_string()
            } else {
                res
            }
        }
    }`,
    },
  ],
};

export default leetCodeMarkdown;
