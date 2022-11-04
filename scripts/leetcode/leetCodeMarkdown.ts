import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '754. 到达终点数字',
  url: 'https://leetcode.cn/problems/maximum-repeating-substring/',
  difficulty: Difficulty.简单,
  tag: [Tag.字符串, Tag.字符串匹配],
  desc: `给你一个字符串 sequence 和 word ，请你返回 最大重复值 k 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 6.3,
      desc: '走的步数相当于1+2+..+n，把其中某几个节点替换成-，当sum超过target时，如果相减是偶数，那就可以直接使用，如果是奇数则一直累加到相减是偶数',
      code: `class Solution {
public:
    int reachNumber(int target) {
        target = abs(target);
        int sum = 0, cnt = 1;
        while (sum < target || (sum - target) % 2 != 0) sum += cnt++;
        return cnt - 1;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
