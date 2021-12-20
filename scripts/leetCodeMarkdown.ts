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
    name: '38. 外观数列',
    url: 'https://leetcode-cn.com/problems/heaters/',
    difficulty: Difficulty.中等,
    tag: [Tag.数组, Tag.双指针, Tag.二分查找, Tag.排序],
    desc: `现在，给出位于一条水平线上的房屋 houses 和供暖器 heaters 的位置，请你找出并返回可以覆盖所有房屋的最小加热半径。`,
    solutions: [
      {
        script: Script.CPP,
        time: 0,
        memory: 6.5,
        desc: '遍历',
        code: `class Solution {
   public:
    string countAndSay(int n) {
        string str = "1";
        while (--n) {
            string next = "";
            for (int i = 0, n = str.size(); i < n; i++) {
                char ch = str[i];
                int cnt = 1;
                while (i + 1 < n && str[i + 1] == ch) i++, cnt++;
                while (cnt) {
                    next += cnt % 10 + '0';
                    cnt /= 10;
                }
                next += ch;
            }
            str = next;
        }
        return str;
    }
};`,
      },
    ],
  },
];
