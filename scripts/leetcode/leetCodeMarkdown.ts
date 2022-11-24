import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '795. 区间子数组个数',
  url: 'https://leetcode.cn/problems/number-of-subarrays-with-bounded-maximum/',
  difficulty: Difficulty.中等,
  tag: [Tag.数组, Tag.双指针],
  desc: `给你一个整数数组 nums 和两个整数：left 及 right 。找出 nums 中连续、非空且其中最大元素在范围 [left, right] 内的子数组，并返回满足条件的子数组的个数。`,
  solutions: [
    {
      script: Script.CPP,
      time: 108,
      memory: 56.3,
      desc: '单调栈求出每个点最近比他大的左值和右值，判断当前点是最大值的情况',
      code: `class Solution {
public:
    int numSubarrayBoundedMax(vector<int>& nums, int left, int right) {
        int n = nums.size(), ans = 0;
        vector<int> llist(n, -1), rlist(n, n);
        stack<int> s;
        for (int i = 0; i < n; i++) {
            while (s.size() && nums[s.top()] <= nums[i]) {
                rlist[s.top()] = i;
                s.pop();
            }
            llist[i] = s.empty() ? -1 : s.top();
            s.push(i);
        }
        for (int i = 0; i < n; i++) {
            if (nums[i] > right || nums[i] < left) continue;
            int left = i - llist[i] - 1, right = rlist[i] - i;
            ans += left + right + (left * (right - 1));
        }
        return ans;
    }
};`,
    },
    {
      script: Script.CPP,
      time: 48,
      memory: 51.1,
      desc: '一次遍历，统计出不包含>right的值且最少包含一个>=left的值的个数',
      code: `class Solution {
public:
    int numSubarrayBoundedMax(vector<int>& nums, int left, int right) {
        int n = nums.size(), ans = 0, prev = -1, cur = -1;
        for (int i = 0; i < n; i++) {
            if (nums[i] <= right && nums[i] >= left) cur = i;
            else if (nums[i] > right) prev = i, cur = -1;
            if (cur != -1) ans += cur - prev;
        }
        return ans;
    }
};`
    },
  ],
};
export default leetCodeMarkdown;
