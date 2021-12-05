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
    name: '1816. 截断句子',
    url: 'https://leetcode-cn.com/problems/truncate-sentence/',
    difficulty: Difficulty.简单,
    tag: [Tag.数组, Tag.字符串],
    desc: `给你一个句子 s​​​​​​ 和一个整数 k​​​​​​ ，请你将 s​​ 截断 ​，​​​使截断后的句子仅含 前 k​​​​​​ 个单词。返回 截断 s​​​​​​ 后得到的句子。`,
    solutions: [
      {
        script: Script.TS,
        time: 72,
        memory: 39.2,
        desc: '分割后重组',
        code: `function truncateSentence(s: string, k: number): string {
          return s.split(' ').slice(0,k).join(' ')
      };`,
      },
      {
        script: Script.TS,
        time: 72,
        memory: 39.2,
        desc: '遍历',
        code: `function truncateSentence(s: string, k: number): string {
          for(let cnt = 0,i = 0;i<s.length;i++){
              if(s[i] === ' '){
                  if(++cnt === k) return s.substring(0,i)
              }
          }
          return s
      };`,
      },
      {
        script: Script.C,
        time: 4,
        memory: 6.1,
        desc: '遍历',
        code: `char * truncateSentence(char * s, int k){
    for (int cnt = 0, i = 0; i < strlen(s); i++) {
        if (s[i] == ' ' && ++cnt == k) {
            char *ans = (char *)calloc(i + 1, sizeof(char));
            strncpy(ans, s, i);
            return ans;
        }
    }
    return s;
}`,
      },
    ],
  },
];
