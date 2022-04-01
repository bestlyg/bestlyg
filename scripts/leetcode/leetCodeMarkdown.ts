import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '954. 二倍数对数组',
  url: 'https://leetcode-cn.com/problems/array-of-doubled-pairs/',
  difficulty: Difficulty.中等,
  tag: [Tag.贪心, Tag.数组, Tag.哈希表, Tag.排序],
  desc: `给定一个长度为偶数的整数数组 arr，只有对 arr 进行重组后可以满足 “对于每个 0 <= i < len(arr) / 2，都有 arr[2 * i + 1] = 2 * arr[2 * i]” 时，返回 true；否则，返回 false。`,
  solutions: [
    {
      script: Script.CPP,
      time: 100,
      memory: 56.9,
      desc: '排序后检查',
      code: `class Solution {
   public:
    bool canReorderDoubled(vector<int> &arr) {
        deque<int> q1, q2;
        unordered_map<int, int> m;
        sort(arr.begin(), arr.end());
        for (auto &num : arr) {
            m[num]++;
            if (num >= 0 && (q1.empty() || q1.back() != num))
                q1.push_back(num);
            else if (num < 0 && (q2.empty() || q2.front() != num))
                q2.push_front(num);
        }
        return check(m, q1) && check(m, q2);
    }
    bool check(unordered_map<int, int> &m, deque<int> q) {
        while (q.size()) {
            int num = q.front();
            q.pop_front();
            if (m[num] == 0) continue;
            if (m[num * 2] < m[num]) return false;
            m[num * 2] -= m[num];
        }
        return true;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
