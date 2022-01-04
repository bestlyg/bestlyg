import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '2125. 银行中的激光束数量',
  url: 'https://leetcode-cn.com/problems/number-of-laser-beams-in-a-bank/',
  difficulty: Difficulty.中等,
  tag: [Tag.数组, Tag.数学, Tag.字符串, Tag.矩阵],
  desc: `返回银行中激光束的总数量。`,
  solutions: [
    {
      script: Script.CPP,
      time: 80,
      memory: 22.5,
      desc: '遍历并记录上一次有多少个守卫 ',
      code: `class Solution {
   public:
    int numberOfBeams(vector<string>& bank) {
        int pre = 0, ans = 0, cnt = 0;
        for (string& str : bank) {
            cnt = 0;
            for (char& ch : str) if (ch == '1') cnt++;
            if (!cnt) continue;
            ans += pre * cnt;
            pre = cnt;
        }
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
