import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '面试题 01.05. 一次编辑',
  url: 'https://leetcode-cn.com/problems/minimum-genetic-mutation/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.哈希表, Tag.字符串],
  desc: `给你两个基因序列 start 和 end ，以及一个基因库 bank ，请你找出并返回能够使 start 变化为 end 所需的最少变化次数。如果无法完成此基因变化，返回 -1 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 52,
      memory: 12,
      desc: '遍历',
      code: `class Solution {
   public:
    bool oneEditAway(string first, string second) {
        int n1 = first.size(), n2 = second.size();
        int i1 = 0, i2 = 0, cnt = 0;
        for (; i1 < n1 && i2 < n2; i1++, i2++) {
            if (first[i1] == second[i2]) continue;
            if (cnt == 1) return false;
            cnt++;
            if (i1 + 1 < n1 && first[i1 + 1] == second[i2])
                i1++;
            else if (i2 + 1 < n2 && first[i1] == second[i2 + 1])
                i2++;
        }
        if (cnt == 0) return abs(n1 - n2) <= 1;
        return i1 == n1 && i2 == n2 && cnt <= 1;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
