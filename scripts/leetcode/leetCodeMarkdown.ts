import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '532. 数组中的 k-diff 数对',
  url: 'https://leetcode.cn/problems/k-diff-pairs-in-an-array/',
  difficulty: Difficulty.中等,
  tag: [Tag.数组, Tag.哈希表, Tag.双指针, Tag.二分查找, Tag.排序],
  desc: `给你一个整数数组 nums 和一个整数 k，请你在数组中找出 不同的 k-diff 数对，并返回不同的 k-diff 数对 的数目。`,
  solutions: [
    {
      script: Script.CPP,
      time: 16,
      memory: 13.9,
      desc: '排序后，针对于每个点查找差值为k的点的数量',
      code: `class Solution {
   public:
    int findPairs(vector<int> &nums, int k) {
        map<int, int> m;
        for (auto &num : nums) m[num]++;
        if (k == 0) return check0(m);
        int ans = 0;
        vector<int> list;
        for (auto &item : m) list.push_back(item.first);
        int n = list.size(), l1 = 0, l2 = 0;
        for (int r = 0; r < n; r++) {
            while (l2 < r && list[r] - list[l2] >= k) l2++;
            while (l1 < l2 && list[r] - list[l1] > k) l1++;
            ans += l2 - l1;
        }
        return ans;
    }
    int check0(map<int, int> &m) {
        int ans = 0;
        for (auto &item : m) {
            if (item.second > 1) ans++;
        }
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
