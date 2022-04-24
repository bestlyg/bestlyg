import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '868. 二进制间距',
  url: 'https://leetcode-cn.com/problems/erect-the-fence/',
  difficulty: Difficulty.困难,
  tag: [Tag.几何, Tag.数组, Tag.数学],
  desc: `在一个二维的花园中，有一些用 (x, y) 坐标表示的树。由于安装费用十分昂贵，你的任务是先用最短的绳子围起所有的树。只有当所有的树都被绳子包围时，花园才能围好栅栏。你需要找到正好位于栅栏边界上的树的坐标。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 5.3,
      desc: '遍历',
      code: `int binaryGap(int n) {
    int prev = -1, ans = 0;
    for (int i = 0; n; i++, n >>= 1) {
        int bit = n & 1;
        if (bit == 0) continue;
        if (prev != -1) ans = fmax(ans, i - prev);
        prev = i;
    }
    return ans;
}`,
    },
  ],
};
export default leetCodeMarkdown;
