import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '819. 最常见的单词',
  url: 'https://leetcode-cn.com/problems/largest-palindrome-product/',
  difficulty: Difficulty.困难,
  tag: [Tag.数学],
  desc: `给定一个整数 n ，返回 可表示为两个 n 位整数乘积的 最大回文整数 。因为答案可能非常大，所以返回它对 1337 取余 。  `,
  solutions: [
    {
      script: Script.CPP,
      time: 4,
      memory: 7.6,
      desc: '遍历',
      code: `class Solution {
   public:
    string mostCommonWord(string paragraph, vector<string>& banned) {
        int n = paragraph.size();
        string ans = "";
        unordered_map<string, int> m;
        unordered_set<string> s;
        for (auto& str : banned) s.insert(str);
        for (int i = 0; i < n; i++) {
            while (i < n && !isalpha(paragraph[i])) i++;
            if (i == n) break;
            int end = i;
            string next = "";
            do {
                next += tolower(paragraph[end++]);
            } while (end < n && isalpha(paragraph[end]));
            if (!s.count(next) && m[ans] < ++m[next]) ans = next;
            i = end;
        }
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
