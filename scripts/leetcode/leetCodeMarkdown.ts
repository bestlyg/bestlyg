import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '806. 写字符串需要的行数',
  url: 'https://leetcode-cn.com/problems/reaching-points/',
  difficulty: Difficulty.困难,
  tag: [Tag.数学],
  desc: `给定四个整数 sx , sy ，tx 和 ty，如果通过一系列的转换可以从起点 (sx, sy) 到达终点 (tx, ty)，则返回 true，否则返回 false。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 6.8,
      desc: '遍历',
      code: `class Solution {
public:
    vector<int> numberOfLines(vector<int>& widths, string s) {
        int surplus = 100, line = 1;
        for (auto &ch : s) {
            int cnt = widths[ch - 'a'];
            if (cnt > surplus) {
                surplus = 100; 
                line++;
            }
            surplus -= cnt;
        }
        return {line, 100 - surplus};
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
