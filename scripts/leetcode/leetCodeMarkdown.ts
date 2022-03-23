import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '929. 独特的电子邮件地址',
  url: 'https://leetcode-cn.com/problems/unique-email-addresses/',
  difficulty: Difficulty.简单,
  tag: [Tag.数组, Tag.哈希表, Tag.字符串],
  desc: `给你一个字符串数组 emails，我们会向每个 emails[i] 发送一封电子邮件。返回实际收到邮件的不同地址数目。`,
  solutions: [
    {
      script: Script.CPP,
      time: 32,
      memory: 13.2,
      desc: '遍历后组装新email',
      code: `class Solution {
   public:
    int numUniqueEmails(vector<string> &emails) {
        unordered_set<string> s;
        for (auto &email : emails) {
            s.insert(format(email));
        }
        for (auto &email : s) cout << email << endl;
        return s.size();
    }
    string format(string &email) {
        string ans = "";
        int domain = false, ignore = false;
        for (auto &ch : email) {
            if (ch == '@') {
                domain = true;
                ignore = false;
            }
            if (!domain && ch != '+' && ch != '.' && !ignore || domain)
                ans += ch;
            if (ch == '+') ignore = true;
        }
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
