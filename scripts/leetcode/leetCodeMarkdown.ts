import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '710. 黑名单中的随机数',
  url: 'https://leetcode.cn/problems/random-pick-with-blacklist/',
  difficulty: Difficulty.困难,
  tag: [Tag.哈希表, Tag.数学, Tag.二分查找, Tag.排序, Tag.随机化],
  desc: `给定一个整数 n 和一个 无重复 黑名单整数数组 blacklist 。设计一种算法，从 [0, n - 1] 范围内的任意整数中选取一个 未加入 黑名单 blacklist 的整数。任何在上述范围内且不在黑名单 blacklist 中的整数都应该有 同等的可能性 被返回。`,
  solutions: [
    {
      script: Script.CPP,
      time: 112,
      memory: 68.6,
      desc: '修改随机范围把范围内不可能取到的值映射出去',
      code: `class Solution {
   public:
    int n;
    unordered_map<int, int> m;
    Solution(int n, vector<int> &blacklist) {
        srand(time(0));
        int size = blacklist.size(), nextN = n - size;
        unordered_set<int> s;
        for (auto &num : blacklist) {
            if (num >= nextN) s.emplace(num);
        }
        int i = nextN;
        for (auto &num : blacklist) {
            if (num >= nextN) continue;
            while (s.count(i)) i++;
            m[num] = i++;
        }
        this->n = nextN;
    }
    int pick() {
        int num = floor(random() % n);
        return m.count(num) ? m[num] : num;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
