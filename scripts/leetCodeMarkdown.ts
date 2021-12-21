import { leetcode, markdown, specStr } from './utils';
const { backquote } = specStr;
const { Script, Difficulty, Tag } = leetcode;
const { link } = markdown;
type Script = leetcode.Script;
type Difficulty = leetcode.Difficulty;
type Tag = leetcode.Tag;
type Solution = leetcode.Solution;
type Markdown = leetcode.Markdown;
export const leetCodeMarkdowns: Markdown[] = [
  {
    existMarkdown: true,
    name: '136. 只出现一次的数字',
    url: 'https://leetcode-cn.com/problems/day-of-the-year/',
    difficulty: Difficulty.简单,
    tag: [Tag.数学, Tag.字符串],
    desc: `给你一个字符串 date ，按 YYYY-MM-DD 格式表示一个 现行公元纪年法 日期。请你计算并返回该日期是当年的第几天。`,
    solutions: [
      {
        script: Script.CPP,
        time: 16,
        memory: 16.4,
        desc: '异或',
        code: `class Solution {
   public:
    int singleNumber(vector<int>& nums) {
        int ans = 0;
        for (int i = 0; i < nums.size(); i++) ans ^= nums[i];
        return ans;
    }
};`,
      },
    ],
  },
];
