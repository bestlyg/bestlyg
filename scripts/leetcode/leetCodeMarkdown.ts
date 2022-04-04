import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '307. 区域和检索 - 数组可修改',
  url: 'https://leetcode-cn.com/problems/array-of-doubled-pairs/',
  difficulty: Difficulty.中等,
  tag: [Tag.贪心, Tag.数组, Tag.哈希表, Tag.排序],
  desc: `给定一个长度为偶数的整数数组 arr，只有对 arr 进行重组后可以满足 “对于每个 0 <= i < len(arr) / 2，都有 arr[2 * i + 1] = 2 * arr[2 * i]” 时，返回 true；否则，返回 false。`,
  solutions: [
    {
      script: Script.CPP,
      time: 372,
      memory: 146.4,
      desc: '树状数组',
      code: `class FenwickTree {
   public:
    int n;
    vector<int> arr;
    FenwickTree(int n) : n(n + 1), arr(vector<int>(n + 1, 0)) {}
    int lowbit(int num) { return num & -num; }
    void add(int idx, int num) {
        idx += 1;
        while (idx < n) {
            arr[idx] += num;
            idx += lowbit(idx);
        }
    }
    int at(int idx) { return query(idx) - query(idx - 1); }
    int query(int idx) {
        idx += 1;
        int num = 0;
        while (idx) {
            num += arr[idx];
            idx -= lowbit(idx);
        }
        return num;
    }
};
class NumArray {
   public:
    FenwickTree tree;
    NumArray(vector<int>& nums) : tree(nums.size()) {
        for (int i = 0; i < nums.size(); i++) {
            tree.add(i, nums[i]);
        }
    }
    void update(int index, int val) { tree.add(index, val - tree.at(index)); }
    int sumRange(int left, int right) {
        return tree.query(right) - tree.query(left - 1);
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
