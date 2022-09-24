import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1652. 拆炸弹',
  url: 'https://leetcode.cn/problems/defuse-the-bomb/',
  difficulty: Difficulty.简单,
  tag: [Tag.链表],
  desc: `给你 循环 数组 code 和整数密钥 k ，请你返回解密后的结果来拆除炸弹！`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 8.2,
      desc: '遍历',
      code: `class Solution {
public:
    vector<int> decrypt(vector<int>& code, int k) {
        int n = code.size();
        vector<int> ans(n, 0);
        for (int i = 0; i < n; i++) {
            if (k > 0) {
                for (int j = (i + 1) % n, cnt = 0; cnt < k; cnt++, j = (j + 1) % n) ans[i] += code[j];
            } else if (k < 0) {
                for (int j = (i - 1 + n) % n, cnt = 0; cnt < -k; cnt++, j = (j - 1 + n) % n) ans[i] += code[j];
            }
        }
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
