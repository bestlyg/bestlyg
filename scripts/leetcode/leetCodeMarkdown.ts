import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1629. 按键持续时间最长的键',
  url: 'https://leetcode-cn.com/problems/slowest-key/',
  difficulty: Difficulty.简单,
  tag: [Tag.数组, Tag.字符串],
  desc: `请返回按键 持续时间最长 的键，如果有多个这样的键，则返回 按字母顺序排列最大 的那个键。`,
  solutions: [
    {
      script: Script.CPP,
      time: 4,
      memory: 10.5,
      desc: '遍历，记录最大值',
      code: `class Solution {
   public:
    char slowestKey(vector<int>& releaseTimes, string keysPressed) {
        int pre = 0, max_v = 0;
        char max_c;
        for (int i = 0; i < releaseTimes.size(); i++) {
            int time = releaseTimes[i] - pre;
            if (time > max_v || time == max_v && keysPressed[i] > max_c) {
                max_v = time;
                max_c = keysPressed[i];
            }
            pre = releaseTimes[i];
        }
        return max_c;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
