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
    name: '1446. 连续字符',
    url: 'https://leetcode-cn.com/problems/consecutive-characters/',
    difficulty: Difficulty.简单,
    tag: [Tag.字符串],
    desc: `给你一个字符串 s ，字符串的「能量」定义为：只包含一种字符的最长非空子字符串的长度。`,
    solutions: [
      {
        script: Script.TS,
        time: 88,
        memory: 39.9,
        desc: '遍历',
        code: `function maxPower(s: string): number {
          let ans = 0;
          for (let i = 0, n = s.length; i < n; i++) {
            let cnt = 1;
            const ch = s[i];
            while (i + 1 < n && s[i + 1] === ch) {
              i++;
              cnt++;
            }
            ans = Math.max(ans, cnt);
          }
          return ans;
        }
        `,
      },
      {
        script: Script.TS,
        time: 4,
        memory: 5.9,
        desc: '遍历',
        code: `int maxPower(char * s){
    int ans = 0;
    for (int i = 0; i < strlen(s); i++) {
        int cnt = 1;
        char ch = s[i];
        while (i + 1 < strlen(s) && s[i + 1] == ch) {
            i++; 
            cnt++;
        }
        if (cnt > ans) ans = cnt;
    }
    return ans;
}`,
      },
    ],
  },
];
