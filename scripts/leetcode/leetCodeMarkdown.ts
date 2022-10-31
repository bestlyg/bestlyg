import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '481. 神奇字符串',
  url: 'https://leetcode.cn/problems/magical-string/',
  difficulty: Difficulty.中等,
  tag: [Tag.双指针, Tag.字符串],
  desc: `给你一个整数 n ，返回在神奇字符串 s 的前 n 个数字中 1 的数目。`,
  solutions: [
    {
      script: Script.CPP,
      time: 8,
      memory: 8.5,
      desc: '双指针记录',
      code: `class Solution {
public:
    int magicalString(int n) {
        vector<int> list(max(3, n));
        list[0] = 1; list[1] = list[2] = 2;
        int ans = 1, i1 = 2, i2 = 3, surplus = 2, curVal = 1, curMode = 1;
        while (i2 < n) {
            if (surplus == 0) {
                surplus = list[++i1];
                curVal += curMode;
                curMode = -curMode;
            }
            list[i2++] = curVal;
            surplus--;
            if (curVal == 1) ans++;
        }
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
