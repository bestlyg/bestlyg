import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '1200. 最小绝对差',
  url: 'https://leetcode.cn/problems/wiggle-sort-ii/',
  difficulty: Difficulty.困难,
  tag: [Tag.数学, Tag.双指针, Tag.字符串],
  desc: `给你一个正整数 n ，请你找出符合条件的最小整数，其由重新排列 n 中存在的每位数字组成，并且其值大于 n 。如果不存在这样的正整数，则返回 -1 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 60,
      memory: 31.8,
      desc: '遍历，对于每个点找到他的最小值',
      code: `class Solution {
  public:
    vector<vector<int>> minimumAbsDifference(vector<int>& arr) {
        vector<vector<int>> ans;
        sort(arr.begin(), arr.end());
        int nmin = INT_MAX;
        for (int l = 0, r = 1; r < arr.size(); r++) {
            while (l < r && abs(arr[l] - arr[r]) > nmin) l++;
            if (l == r) continue;
            int nextmin = abs(arr[l] - arr[r]);
            if (nextmin < nmin) ans.clear();
            nmin = nextmin;
            vector<int> item(2);
            item[0] = arr[l];
            item[1] = arr[r];
            ans.push_back(item);
        }
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
