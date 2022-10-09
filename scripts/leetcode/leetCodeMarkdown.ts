import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '856. 括号的分数',
  url: 'https://leetcode.cn/problems/advantage-shuffle/',
  difficulty: Difficulty.中等,
  tag: [Tag.贪心, Tag.数组, Tag.双指针, Tag.排序],
  desc: `给定一个平衡括号字符串 S，按下述规则计算该字符串的分数`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 5.9,
      desc: '栈',
      code: `class Solution {
public:
    int scoreOfParentheses(string s) {
        vector<int> st;
        for (auto &c : s) {
            if (c == '(') {
                st.push_back(-1);
            } else if (st.back() == -1) {
                st.pop_back();
                st.push_back(1);
            } else {
                int num = 0;
                while (st.back() != -1) {
                    num += st.back();
                    st.pop_back();
                }
                st.pop_back();
                st.push_back(num * 2);
            }
        }
        return accumulate(st.begin(), st.end(), 0);
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
