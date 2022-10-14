import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '940. 不同的子序列 II',
  url: 'https://leetcode.cn/problems/distinct-subsequences-ii/',
  difficulty: Difficulty.困难,
  tag: [Tag.字符串, Tag.动态规划],
  desc: `给定一个字符串 s，计算 s 的 不同非空子序列 的个数。因为结果可能很大，所以返回答案需要对 10^9 + 7 取余 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 160,
      memory: 8.4,
      desc: '动态规划，每个点记录当前值和遍历过的后个节点',
      code: `const int mod = 1e9 + 7;
struct Item {
    int val;
    bool next[26];
    Item(): val(0) {
        memset(next, 0, sizeof(bool) * 26);
    }
};
class Solution {
public:
    int distinctSubseqII(string s) {
        int n = s.size(), ans = 0;
        bool charList[26] = {0};
        vector<Item> dp(n);
        for (int i = 0; i < n; i++) {
            char c = s[i];
            if (charList[c - 'a'] == 0) dp[i].val += 1, charList[c - 'a'] = 1;
            for (int j = 0; j < i; j++) {
                if (dp[j].next[c - 'a']) continue;
                dp[j].next[c - 'a'] = true;
                dp[i].val = (dp[i].val + dp[j].val) % mod;
            }
            ans = (ans + dp[i].val) % mod;
        }
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
