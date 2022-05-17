import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '953. 验证外星语词典',
  url: 'https://leetcode-cn.com/problems/minimum-genetic-mutation/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.哈希表, Tag.字符串],
  desc: `给你两个基因序列 start 和 end ，以及一个基因库 bank ，请你找出并返回能够使 start 变化为 end 所需的最少变化次数。如果无法完成此基因变化，返回 -1 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 4,
      memory: 9.1,
      desc: '遍历',
      code: `class Solution {
   public:
    bool isAlienSorted(vector<string> &words, string order) {
        char map[26] = {0};
        for (int i = 0; i < order.size(); i++) map[order[i] - 'a'] = i;
        string prev = words[0];
        for (int i = 1; i < words.size(); i++) {
            if (!check(prev, words[i], map)) return false;
            prev = words[i];
        }
        return true;
    }
    bool check(string &s1, string &s2, char *map) {
        int i1 = 0, n1 = s1.size(), i2 = 0, n2 = s2.size();
        while (i1 < n1 && i2 < n2) {
            if (map[s1[i1] - 'a'] > map[s2[i2] - 'a']) return false;
            if (map[s1[i1] - 'a'] < map[s2[i2] - 'a']) return true;
            i1++;
            i2++;
        }
        return i1 == n1;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
