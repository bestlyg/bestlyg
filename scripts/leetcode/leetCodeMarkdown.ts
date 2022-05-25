import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '467. 环绕字符串中唯一的子字符串',
  url: 'https://leetcode.cn/problems/unique-substrings-in-wraparound-string/',
  difficulty: Difficulty.中等,
  tag: [Tag.字符串, Tag.动态规划],
  desc: `现在给定另一个字符串 p 。返回 s 中 唯一 的 p 的 非空子串 的数量 。 `,
  solutions: [
    {
      script: Script.CPP,
      time: 8,
      memory: 8,
      desc: '遍历，每次储存以当前值结尾的最长长度',
      code: `class Solution {
   public:
    int findSubstringInWraproundString(string p) {
        int n = p.size(), ans = 0;
        vector<int> dp(n);
        unordered_map<char, int> m;
        dp[0] = 1;
        m[p[0]] = 1;
        for (int i = 1; i < n; i++) {
            int next = p[i - 1] == 'z' ? 'a' : p[i - 1] + 1;
            if (next != p[i])
                dp[i] = 1;
            else
                dp[i] = dp[i - 1] + 1;
            m[p[i]] = max(m[p[i]], dp[i]);
        }
        for (auto& item : m) ans += item.second;
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
