import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1779. 找到最近的有相同 X 或 Y 坐标的点',
  url: 'https://leetcode.cn/problems/find-nearest-point-that-has-the-same-x-or-y-coordinate',
  difficulty: Difficulty.简单,
  tag: [Tag.数组],
  desc: `请返回距离你当前位置 曼哈顿距离 最近的 有效 点的下标（下标从 0 开始）。`,
  solutions: [
    {
      script: Script.CPP,
      time: 132,
      memory: 57.8,
      desc: '枚举所有点',
      code: `class Solution {
public:
    int nearestValidPoint(int x, int y, vector<vector<int>>& points) {
        int ans = -1, dans = 0x3f3f3f3f;
        for (int i = 0; i < points.size(); i++) {
            int ix = points[i][0], iy = points[i][1], d = abs(ix - x) + abs(iy - y);
            if (ix != x && iy != y) continue;
            if (dans > d) ans = i, dans = d;
        }
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
