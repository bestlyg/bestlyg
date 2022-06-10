import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1037. 有效的回旋镖',
  url: 'https://leetcode.cn/problems/koko-eating-bananas/',
  difficulty: Difficulty.中等,
  tag: [Tag.数组, Tag.二分查找],
  desc: `返回她可以在 h 小时内吃掉所有香蕉的最小速度 k（k 为整数）。`,
  solutions: [
    {
      script: Script.TS,
      time: 0,
      memory:9.9,
      desc: '算斜率是否相等',
      code: `class Solution {
   public:
    bool isBoomerang(vector<vector<int>>& points) {
        int x1 = points[0][0], y1 = points[0][1], x2 = points[1][0],
            y2 = points[1][1], x3 = points[2][0], y3 = points[2][1];
        return (y2 - y1) * (x3 - x1) != (y3 - y1) * (x2 - x1);
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
