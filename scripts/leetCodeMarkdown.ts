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
    name: '318. 最大单词长度乘积',
    url: 'https://leetcode-cn.com/problems/perfect-rectangle/',
    difficulty: Difficulty.困难,
    tag: [Tag.数组, Tag.扫描线],
    desc: `如果所有矩形一起精确覆盖了某个矩形区域，则返回 true ；否则，返回 false 。`,
    solutions: [
      {
        script: Script.TS,
        time: 96,
        memory: 41.5,
        desc: '位运算统计每个词出现的字母',
        code: `function maxProduct(words: string[]): number {
          const n = words.length;
          const bit_words = new Array(n).fill(0);
          for (let i = 0; i < n; i++) {
            const word = words[i];
            for (let pos = 0, l = word.length; pos < l; pos++) {
              bit_words[i] |= 1 << (word.codePointAt(pos)! - 97);
            }
          }
          let ans = 0;
          for (let i = 0; i < n; i++) {
            const len1 = words[i].length;
            const bit1 = bit_words[i];
            for (let j = i + 1; j < n; j++) {
              const len2 = words[j].length;
              const bit2 = bit_words[j];
              if (bit1 & bit2) continue;
              ans = Math.max(ans, len1 * len2);
            }
          }
          return ans;
        }
        `,
      },
      {
        script: Script.C,
        time: 32,
        memory: 7.6,
        desc: '位运算统计每个词出现的字母',
        code: `void formatWord(char *word, int *bit, int *size){
    for(int i = 0; word[i] != '\\0'; i++){
        *bit |= 1 << (word[i] - 'a');
        *size += 1;
    }
}
int maxProduct(char ** words, int wordsSize){
    int word_bit[wordsSize], word_size[wordsSize];
    for (int i = 0; i < wordsSize; i++) word_bit[i] = 0, word_size[i] = 0;
    for (int i = 0; i < wordsSize; i++) {
        char *word = words[i];
        formatWord(word, &word_bit[i], &word_size[i]);
    }
    int ans = 0;
    for (int i = 0; i < wordsSize; i++) {
        for (int j = 0; j < wordsSize; j++) {
            if (word_bit[i] & word_bit[j]) continue;
            int len = word_size[i] * word_size[j];
            ans = ans < len ? len : ans;
        }
    }
    return ans;
}`,
      },
    ],
  },
];
