import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '面试题 17.11. 单词距离',
  url: 'https://leetcode.cn/problems/find-closest-lcci/',
  difficulty: Difficulty.中等,
  tag: [Tag.数组, Tag.字符串],
  desc: `有个内含单词的超大文本文件，给定任意两个不同的单词，找出在这个文件中这两个单词的最短距离(相隔单词数)。`,
  solutions: [
    {
      script: Script.CPP,
      time: 96,
      memory: 57.9,
      desc: '一次遍历',
      code: `class Solution {
   public:
    int findClosest(vector<string>& words, string word1, string word2) {
        int p[2], ans = INT_MAX, n = words.size();
        p[0] = p[1] = -1;
        for (int i = 0; i < n; i++) {
            string word = words[i];
            int f = -1;
            if (word == word1) f = 0;
            if (word == word2) f = 1;
            if (f == -1) continue;
            p[f] = i;
            if (p[0] == -1 || p[1] == -1) continue;
            ans = min(ans, abs(p[0] - p[1]));
        }
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
