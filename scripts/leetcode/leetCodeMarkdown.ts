import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '388. 文件的最长绝对路径',
  url: 'https://leetcode-cn.com/problems/largest-palindrome-product/',
  difficulty: Difficulty.困难,
  tag: [Tag.数学],
  desc: `给定一个整数 n ，返回 可表示为两个 n 位整数乘积的 最大回文整数 。因为答案可能非常大，所以返回它对 1337 取余 。  `,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 6.4,
      desc: '栈',
      code: `class Solution {
   public:
    int lengthLongestPath(string input) {
        vector<string> s;
        istringstream iss(input);
        string tmp;
        int ans = 0;
        while (getline(iss, tmp, '\n')) {
            int idx = 0;
            while (idx < tmp.size() && tmp[idx] == '\t') idx++;
            while (s.size() && s.size() > idx) s.pop_back();
            string next = tmp.substr(idx, tmp.size() - idx);
            s.push_back(next);
            if (next.rfind(".") < next.size()) ans = max(ans, format(s));
        }
        return ans;
    }
    int format(vector<string> &s) {
        int res = s.size() - 1;
        for (auto &str : s) res += str.size();
        return res;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
