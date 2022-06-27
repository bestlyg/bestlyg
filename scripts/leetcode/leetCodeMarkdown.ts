import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '522. 最长特殊序列 II',
  url: 'https://leetcode.cn/problems/longest-uncommon-subsequence-ii/',
  difficulty: Difficulty.中等,
  tag: [Tag.数组, Tag.哈希表, Tag.双指针, Tag.字符串, Tag.排序],
  desc: `给定字符串列表 strs ，返回其中 最长的特殊序列 。如果最长特殊序列不存在，返回 -1 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 4,
      memory: 8,
      desc: '对于每个字符串，查找是否有父串',
      code: `class Solution {
   public:
    int findLUSlength(vector<string> &strs) {
        int ans = -1, n = strs.size();
        for (int i = 0; i < n; i++) {
            string s1 = strs[i];
            bool check = true;
            for (int j = 0; j < n; j++) {
                if (i != j && isSubStr(s1, strs[j])) {
                    check = false;
                    break;
                }
            }
            if (check) ans = max(ans, (int)s1.size());
        }
        return ans;
    }
    bool isSubStr(const string &s1, const string &s2) {
        int i1 = 0, i2 = 0, n1 = s1.size(), n2 = s2.size();
        for (; i1 < n1 && i2 < n2; i2++)
            if (s1[i1] == s2[i2]) i1++;
        return i1 == n1;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
