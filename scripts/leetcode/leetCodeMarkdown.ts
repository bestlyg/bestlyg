import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1769. 移动所有球到每个盒子所需的最小操作数',
  url: 'https://leetcode.cn/problems/minimum-number-of-operations-to-move-all-balls-to-each-box',
  difficulty: Difficulty.中等,
  tag: [Tag.数组, Tag.字符串],
  desc: `返回一个长度为 n 的数组 answer ，其中 answer[i] 是将所有小球移动到第 i 个盒子所需的 最小 操作数。`,
  solutions: [
    {
      script: Script.CPP,
      time: 76,
      memory: 8.6,
      desc: '先统计右侧所有的点和数量，每次移动时快速计算左侧1数量和右侧1数量',
      code: `class Solution {
        public:
            vector<int> minOperations(string boxes) {
                int n = boxes.size(), 
                    lsum = 0, lcnt = 0, 
                    rsum = 0, rcnt = 0;
                vector<int> list(n);
                for (int i = 0; i < n; i++) {
                    if (boxes[i] == '1') {
                        rsum += i;
                        rcnt += 1;
                    }
                }
                list[0] = rsum;
                for (int i = 1; i < n; i++) {
                    if (boxes[i - 1] == '1') rcnt--, lcnt++;
                    rsum -= rcnt;
                    lsum += lcnt;
                    list[i] = lsum + rsum;
                }
                return list;
            }
        };`,
    },
  ],
};
export default leetCodeMarkdown;
