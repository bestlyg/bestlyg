import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '821. 字符的最短距离',
  url: 'https://leetcode-cn.com/problems/largest-palindrome-product/',
  difficulty: Difficulty.困难,
  tag: [Tag.数学],
  desc: `给定一个整数 n ，返回 可表示为两个 n 位整数乘积的 最大回文整数 。因为答案可能非常大，所以返回它对 1337 取余 。  `,
  solutions: [
    {
      script: Script.CPP,
      time: 4,
      memory: 6.6,
      desc: 'bfs',
      code: `class Solution {
   public:
    vector<int> shortestToChar(string s, char c) {
        int n = s.size();
        vector<int> check(n, -1);
        queue<pair<int, int>> q;
        for (int i = 0; i < n; i++) {
            if (s[i] == c) {
                q.push(make_pair(i, 0));
                check[i] = 0;
            }
        }
        while (q.size()) {
            pair<int, int> item = q.front();
            q.pop();
            int row = item.first, cnt = item.second;
            if (row < n - 1 && check[row + 1] == -1) {
                q.push(make_pair(row + 1, cnt + 1));
                check[row + 1] = cnt + 1;
            }
            if (row > 0 && check[row - 1] == -1) {
                q.push(make_pair(row - 1, cnt + 1));
                check[row - 1] = cnt + 1;
            }
        }
        return check;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
