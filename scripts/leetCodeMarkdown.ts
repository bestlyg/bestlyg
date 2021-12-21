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
    existMarkdown: !true,
    name: '1154. 一年中的第几天',
    url: 'https://leetcode-cn.com/problems/day-of-the-year/',
    difficulty: Difficulty.简单,
    tag: [Tag.数学, Tag.字符串],
    desc: `给你一个字符串 date ，按 YYYY-MM-DD 格式表示一个 现行公元纪年法 日期。请你计算并返回该日期是当年的第几天。`,
    solutions: [
      {
        script: Script.CPP,
        time: 16,
        memory: 5.8,
        desc: '检测闰年和前面有几个月',
        code: `class Solution {
   public:
    int monthDay[13] = {0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
    void checkLeapYear(int year) {
        if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
            monthDay[2] = 29;
        }
    }
    int dayOfYear(string date) {
        int year = 0, month = 0, day = 0;
        for (int i = 0; i < 4; i++) year = year * 10 + date[i] - '0';
        for (int i = 5; i < 7; i++) month = month * 10 + date[i] - '0';
        for (int i = 8; i < 10; i++) day = day * 10 + date[i] - '0';
        checkLeapYear(year);
        // printf("year = %d, month = %d, day = %d", year, month, day);
        int ans = day;
        for (int i = 1; i < month; i++) ans += monthDay[i];
        return ans;
    }
};`,
      },
    ],
  },
];
