import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '780. 到达终点',
  url: 'https://leetcode-cn.com/problems/reaching-points/',
  difficulty: Difficulty.困难,
  tag: [Tag.数学],
  desc: `给定四个整数 sx , sy ，tx 和 ty，如果通过一系列的转换可以从起点 (sx, sy) 到达终点 (tx, ty)，则返回 true，否则返回 false。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 5.7,
      desc: '从目标节点减至初始节点的方法只有一种',
      code: `class Solution {
   public:
    bool reachingPoints(int sx, int sy, int tx, int ty) {
        while (tx > 0 && ty > 0) {
            if (tx == sx && ty == sy) return true;
            if (tx >= ty)
                tx -= max((tx - sx) / ty, 1) * ty;
            else
                ty -= max((ty - sy) / tx, 1) * tx;
        }
        return false;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
