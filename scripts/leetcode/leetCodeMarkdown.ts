import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '870. 优势洗牌',
  url: 'https://leetcode.cn/problems/advantage-shuffle/',
  difficulty: Difficulty.中等,
  tag: [Tag.贪心, Tag.数组, Tag.双指针, Tag.排序],
  desc: `返回 nums1 的任意排列，使其相对于 nums2 的优势最大化。`,
  solutions: [
    {
      script: Script.CPP,
      time: 164,
      memory: 58.3,
      desc: '排序下标数组后，从大往小判断',
      code: `class Solution {
public:
    vector<int> advantageCount(vector<int>& nums1, vector<int>& nums2) {
        int n = nums1.size();
        vector<int> ans(n), inums1(n), inums2(n);
        for (int i = 0; i < n; i++) inums1[i] = inums2[i] = i;
        sort(inums1.begin(), inums1.end(), [&](int i1, int i2){ return nums1[i1] < nums1[i2]; });
        sort(inums2.begin(), inums2.end(), [&](int i1, int i2){ return nums2[i1] < nums2[i2]; });
        int e1 = n - 1, s1 = 0, i2 = n - 1;
        while (e1 >= s1) {
            if (nums1[inums1[e1]] > nums2[inums2[i2]]) ans[inums2[i2]] = nums1[inums1[e1--]];
            else ans[inums2[i2]] = nums1[inums1[s1++]];
            i2--;
        }
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
