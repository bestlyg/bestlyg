import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '969. 煎饼排序',
  url: 'https://leetcode-cn.com/problems/XltzEq/',
  difficulty: Difficulty.简单,
  tag: [Tag.双指针, Tag.字符串],
  desc: `给定一个字符串 s ，验证 s 是否是 回文串 ，只考虑字母和数字字符，可以忽略字母的大小写。`,
  solutions: [
    {
      script: Script.CPP,
      time: 4,
      memory: 11,
      desc: '每次翻转把最大值翻转到首位，再翻转到结尾',
      code: `class Solution {
   public:
    vector<int> pancakeSort(vector<int>& arr) {
        vector<int> ans;
        _pancakeSort(ans, arr, 0, arr.size() - 1);
        return ans;
    }
    void _pancakeSort(vector<int>& ans, vector<int>& arr, int start, int end) {
        if (end == 0) return;
        int vmax = start;
        for (int i = start; i <= end; i++) {
            if (arr[i] > arr[vmax]) vmax = i;
        }
        if (vmax != end) {
            reverse(arr, 0, vmax);
            ans.push_back(vmax + 1);
            reverse(arr, 0, end);
            ans.push_back(end + 1);
        }
        _pancakeSort(ans, arr, start, end - 1);
    }
    void reverse(vector<int>& arr, int start, int end) {
        for (int l = start, r = end; l < r; l++, r--) {
            swap(arr[l], arr[r]);
        }
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
