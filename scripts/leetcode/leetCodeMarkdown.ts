import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '537. 复数乘法',
  url: 'https://leetcode-cn.com/problems/complex-number-multiplication/',
  difficulty: Difficulty.中等,
  tag: [Tag.数学, Tag.字符串, Tag.模拟],
  desc: `给你两个字符串表示的复数 num1 和 num2 ，请你遵循复数表示形式，返回表示它们乘积的字符串。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 5.7,
      desc: '模拟',
      code: `class Solution {
   public:
    void analysis(string num, int& snum, int& fnum) {
        int add = num.find("+");
        snum = atoi(num.substr(0, add).c_str());
        fnum = atoi(num.substr(add + 1, num.size() - add - 1).c_str());
    }
    string complexNumberMultiply(string num1, string num2) {
        int snum1, fnum1, snum2, fnum2;
        analysis(num1, snum1, fnum1);
        analysis(num2, snum2, fnum2);
        ostringstream ostr;
        ostr << snum1 * snum2 + fnum1 * fnum2 * -1 << "+"
             << snum1 * fnum2 + snum2 * fnum1 << "i";
        return ostr.str();
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
