import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '6. Z 字形变换',
  url: 'https://leetcode-cn.com/problems/maximum-number-of-achievable-transfer-requests/',
  difficulty: Difficulty.困难,
  tag: [Tag.位运算, Tag.数组, Tag.回溯, Tag.枚举],
  desc: `请你从原请求列表中选出若干个请求，使得它们是一个可行的请求列表，并返回所有可行列表中最大请求数目。`,
  solutions: [
    {
      script: Script.CPP,
      time: 1060,
      memory: 9.1,
      desc: '遍历后塞入数组',
      code: `class Solution {
   public:
    string convert(string s, int numRows) {
        if (numRows == 1) return s;
        char arr[1000][1000];
        memset(arr, 0, sizeof(char) * 1000 * 1000);
        for (int idx = 0, row = 0, col = 0, n = s.size(); idx < n;) {
            while (idx < n && row < numRows - 1) arr[row++][col] = s[idx++];
            while (idx < n && row > 0) arr[row--][col++] = s[idx++];
        }
        string ans = "";
        for (int i = 0; i < 1000; i++) {
            for (int j = 0; j < 1000; j++) {
                if (arr[i][j]) ans += arr[i][j];
            }
        }
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
