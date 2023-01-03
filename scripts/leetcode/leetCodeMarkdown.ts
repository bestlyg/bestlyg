import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '2042. 检查句子中的数字是否递增',
  url: 'https://leetcode.cn/problems/check-if-numbers-are-ascending-in-a-sentence/',
  difficulty: Difficulty.简单,
  tag: [Tag.字符串],
  desc: `给你一个表示句子的字符串 s ，你需要检查 s 中的 全部 数字是否从左到右严格递增（即，除了最后一个数字，s 中的 每个 数字都严格小于它 右侧 的数字）。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 6.1,
      desc: '遍历',
      code: `class Solution {
public:
    bool areNumbersAscending(string s) {
        int prev = 0;
        for (int i = 0; i < s.size(); i++) {
            if (!isdigit(s[i])) continue;
            int num = 0;
            while (i < s.size() && isdigit(s[i])) num = num * 10 + s[i++] - '0';
            if (prev >= num) return false;
            prev = num;
        }
        return true;
    }
};`,
    },
    {
      script: Script.CPP,
      time: 0,
      memory: 2.2,
      desc: '同上',
      code: `impl Solution {
    pub fn are_numbers_ascending(s: String) -> bool {
        let s: Vec<char> = s.chars().collect();
        let mut i = 0;
        let mut prev = 0;
        while i < s.len() {
            if s[i].is_digit(10) {
                let mut num = 0;
                while i < s.len() && s[i].is_digit(10) {
                    num = num * 10 + (s[i] as i32 - '0' as i32);
                    i += 1;
                }
                if prev >= num {
                    return false;
                }
                prev = num
            }
            i += 1;
        }
        true
    }
}`,
    },
  ],
};
export default leetCodeMarkdown;
