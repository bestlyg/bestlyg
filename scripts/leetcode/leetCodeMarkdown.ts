import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1725. 可以形成最大正方形的矩形数目',
  url: 'https://leetcode-cn.com/problems/number-of-rectangles-that-can-form-the-largest-square/',
  difficulty: Difficulty.简单,
  tag: [Tag.数组],
  desc: `请你统计有多少个矩形能够切出边长为 maxLen 的正方形，并返回矩形 数目 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 36,
      memory: 17.9,
      desc: '遍历',
      code: `class Solution {
   public:
    int countGoodRectangles(vector<vector<int>>& rectangles) {
        int len = INT_MIN, ans = 0;
        for (auto& data : rectangles) len = max(len, min(data[0], data[1]));
        for (auto& data : rectangles)
            if (len <= data[0] && len <= data[1]) ans++;
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
