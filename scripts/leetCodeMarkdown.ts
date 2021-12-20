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
    name: '13. 罗马数字转整数',
    url: 'https://leetcode-cn.com/problems/heaters/',
    difficulty: Difficulty.中等,
    tag: [Tag.数组, Tag.双指针, Tag.二分查找, Tag.排序],
    desc: `现在，给出位于一条水平线上的房屋 houses 和供暖器 heaters 的位置，请你找出并返回可以覆盖所有房屋的最小加热半径。`,
    solutions: [
      {
        script: Script.CPP,
        time: 4,
        memory: 5.9,
        desc: '遍历模拟',
        code: `class Solution {
   public:
    int romanToInt(string s) {
        int ans = 0;
        for (int i = 0; i < s.size(); i++) {
            char ch = s[i];
            if (ch == 'M')
                ans += 1000;
            else if (ch == 'D')
                ans += 500;
            else if (ch == 'C') {
                if (s[i + 1] == 'M') {
                    ans += 900;
                    i++;
                } else if (s[i + 1] == 'D') {
                    ans += 400;
                    i++;
                } else
                    ans += 100;
            } else if (ch == 'L')
                ans += 50;
            else if (ch == 'X') {
                if (s[i + 1] == 'C') {
                    ans += 90;
                    i++;
                } else if (s[i + 1] == 'L') {
                    ans += 40;
                    i++;
                } else
                    ans += 10;
            } else if (ch == 'V')
                ans += 5;
            else if (ch == 'I') {
                if (s[i + 1] == 'X') {
                    ans += 9;
                    i++;
                } else if (s[i + 1] == 'V') {
                    ans += 4;
                    i++;
                } else
                    ans += 1;
            }
        }
        return ans;
    }
};`,
      },
    ],
  },
];
