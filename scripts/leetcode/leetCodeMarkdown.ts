import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '762. 二进制表示中质数个计算置位',
  url: 'https://leetcode-cn.com/problems/array-of-doubled-pairs/',
  difficulty: Difficulty.中等,
  tag: [Tag.贪心, Tag.数组, Tag.哈希表, Tag.排序],
  desc: `给定一个长度为偶数的整数数组 arr，只有对 arr 进行重组后可以满足 “对于每个 0 <= i < len(arr) / 2，都有 arr[2 * i + 1] = 2 * arr[2 * i]” 时，返回 true；否则，返回 false。`,
  solutions: [
    {
      script: Script.CPP,
      time: 36,
      memory: 5.8,
      desc: '遍历',
      code: `class Solution {
   public:
    int countPrimeSetBits(int left, int right) {
        int ans = 0;
        for (int i = left; i <= right; i++) {
            if (is_prime(cnt(i))) ans++;
        }
        return ans;
    }
    int cnt(int num) {
        int ans = 0;
        for (; num; num >>= 1) {
            if ((num & 1) == 1) ans++;
        }
        return ans;
    }
    bool is_prime(int num) {
        if (num == 0 || num == 1) return 0;
        for (int i = 2; i < num; i++) {
            if (num % i == 0) return 0;
        }
        return 1;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
