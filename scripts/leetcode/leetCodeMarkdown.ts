import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '2351. 第一个出现两次的字母',
  url: 'https://leetcode.cn/problems/first-letter-to-appear-twice/',
  difficulty: Difficulty.简单,
  tag: [Tag.哈希表, Tag.字符串, Tag.计数],
  desc: `给你一个由小写英文字母组成的字符串 s ，请你找出并返回第一个出现 两次 的字母。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 6,
      desc: '遍历',
      code: `class Solution {
public:
    char repeatedCharacter(string s) {
        int list[26] = {0};
        for (auto &c : s) {
            if (list[c - 'a']++ == 1) return c;
        }
        return ' ';
    }
};`,
    },
    {
      script: Script.RUST,
      time: 0,
      memory: 2.3,
      desc: '遍历',
      code: `impl Solution {
    pub fn repeated_character(s: String) -> char {
        let s = s.as_bytes();
        let mut list = [0; 26];
        for c in s {
            let i = *c as usize - 'a' as usize;
            if list[i] == 1 {
                return *c as char;
            }
            list[i] += 1;
        }
        ' '
    }
}`,
    },
  ],
};
export default leetCodeMarkdown;
