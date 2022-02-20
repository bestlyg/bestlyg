import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '717. 1比特与2比特字符',
  url: 'https://leetcode-cn.com/problems/1-bit-and-2-bit-characters/',
  difficulty: Difficulty.简单,
  tag: [Tag.数组],
  desc: `给定一个以 0 结尾的二进制数组 bits ，如果最后一个字符必须是一位字符，则返回 true 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 4,
      memory: 9.3,
      desc: '遍历， 判断最后的下标是否等于末尾',
      code: `class Solution {
   public:
    bool isOneBitCharacter(vector<int>& bits) {
        int idx = 0;
        while (idx < bits.size() - 1) {
            if (bits[idx] == 0)
                idx += 1;
            else
                idx += 2;
        }
        return idx == bits.size() - 1;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
