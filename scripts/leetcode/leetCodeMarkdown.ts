import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '779. 第K个语法符号',
  url: 'https://leetcode.cn/problems/k-th-symbol-in-grammar/',
  difficulty: Difficulty.中等,
  tag: [Tag.位运算, Tag.递归, Tag.数学],
  desc: `给定行数 n 和序数 k，返回第 n 行中第 k 个字符。`,
  solutions: [
    {
      script: Script.CPP,
      time: 4,
      memory:5.9,
      desc: '当前层前半段和上层一样，第三段和第二段相同，第一段和第四段相同',
      code: `class Solution {
public:
    int kthGrammar(int n, int k) {
        if (n == 1) return 0;
        else if (n == 2) return k == 1 ? 0 : 1;
        int nmax = pow(2, n - 1), nextK = k;
        if (k > nmax / 2 && k <= nmax / 4 * 3) nextK = k - nmax / 2 + nmax / 4;
        else if (k > nmax / 4 * 3) nextK = k - nmax / 2 - nmax / 4;
        return kthGrammar(n - 1, nextK);
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
