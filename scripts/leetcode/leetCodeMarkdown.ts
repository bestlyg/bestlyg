import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1108. IP 地址无效化',
  url: 'https://leetcode-cn.com/problems/defanging-an-ip-address/',
  difficulty: Difficulty.简单,
  tag: [Tag.字符串],
  desc: `给你一个有效的 IPv4 地址 address，返回这个 IP 地址的无效化版本。`,
  solutions: [
    {
      script: Script.TS,
      time: 0,
      memory: 5.8,
      desc: '遍历',
      code: `class Solution {
   public:
    string defangIPaddr(string address) {
        string ans = "";
        for (auto &ch : address) {
            if (ch == '.')
                ans += "[.]";
            else
                ans += ch;
        }
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
