import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '796. 旋转字符串',
  url: 'https://leetcode-cn.com/problems/array-of-doubled-pairs/',
  difficulty: Difficulty.中等,
  tag: [Tag.贪心, Tag.数组, Tag.哈希表, Tag.排序],
  desc: `给定一个长度为偶数的整数数组 arr，只有对 arr 进行重组后可以满足 “对于每个 0 <= i < len(arr) / 2，都有 arr[2 * i + 1] = 2 * arr[2 * i]” 时，返回 true；否则，返回 false。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 6,
      desc: '遍历',
      code: `class Solution {
   public:
    int n;
    bool rotateString(string s, string goal) {
        n = s.size();
        vector<int> list;
        for (int i = 0; i < n; i++) {
            if (s[i] == goal[0]) list.push_back(i);
        }
        for (auto &start : list) {
            if (check(s, goal, start)) return true;
        }
        return false;
    }
    bool check(string &s, string &goal, int start) {
        for (int i = 0; i < n; i++, start = (start + 1) % n) {
            if (s[start] != goal[i]) return false;
        }
        return true;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
