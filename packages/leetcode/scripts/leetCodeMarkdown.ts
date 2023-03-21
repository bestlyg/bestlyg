import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '2469. 温度转换',
  url: 'https://leetcode.cn/problems/numbers-with-repeated-digits/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `给定正整数 n，返回在 [1, n] 范围内具有 至少 1 位 重复数字的正整数的个数。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 5.9,
      desc: '直接计算',
      code: `class Solution {
public:
    vector<double> convertTemperature(double celsius) {
        return vector<double>{ celsius + 273.15, celsius * 1.80 + 32.00 };
    }
};`,
    },
    {
      script: Script.PY3,
      time: 32,
      memory: 14.8,
      desc: '同上',
      code: `class Solution:
    def convertTemperature(self, celsius: float) -> List[float]:
        return [celsius + 273.15, celsius * 1.80 + 32.00]`,
    },
    {
      script: Script.RUST,
      time: 0,
      memory: 1.9,
      desc: '同上',
      code: `impl Solution {
    pub fn convert_temperature(celsius: f64) -> Vec<f64> {
        vec![celsius + 273.15, celsius * 1.80 + 32.00]
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
