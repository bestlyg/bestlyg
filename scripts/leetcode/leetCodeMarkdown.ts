import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1750. 删除字符串两端相同字符后的最短长度',
  url: 'https://leetcode.cn/problems/minimum-length-of-string-after-deleting-similar-ends/',
  difficulty: Difficulty.中等,
  tag: [Tag.双指针, Tag.字符串],
  desc: `请你返回对字符串 s 执行上面操作任意次以后（可能 0 次），能得到的 最短长度 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 16,
      memory: 12.5,
      desc: '遍历',
      code: `class Solution {
public:
    int minimumLength(string s) {
        int l = 0, r = s.size() - 1;
        while (l < r && s[l] == s[r]) {
            auto c = s[l];
            while (l <= r && s[l] == c) l++;
            while (l <= r && s[r] == c) r--;
        }
        return r - l + 1;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
