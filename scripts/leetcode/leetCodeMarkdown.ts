import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1200. 最小绝对差',
  url: 'https://leetcode-cn.com/problems/minimum-absolute-difference/',
  difficulty: Difficulty.简单,
  tag: [Tag.数组, Tag.排序],
  desc: `请你找到所有具有最小绝对差的元素对，并且按升序的顺序返回。`,
  solutions: [
    {
      script: Script.CPP,
      time: 52,
      memory: 32.3,
      desc: '排序',
      code: `class Solution {
   public:
    vector<vector<int>> minimumAbsDifference(vector<int>& arr) {
        vector<vector<int>> ans;
        sort(arr.begin(), arr.end());
        int prev = arr[0], nmax = INT_MAX;
        for (int i = 1; i < arr.size(); i++) {
            int num = arr[i];
            if (num - prev <= nmax) {
                if (num - prev < nmax) ans.clear();
                vector<int> item;
                item.push_back(prev);
                item.push_back(num);
                ans.push_back(item);
                nmax = num - prev;
            }
            prev = num;
        }
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
