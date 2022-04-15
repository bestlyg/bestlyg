import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '385. 迷你语法分析器',
  url: 'https://leetcode-cn.com/problems/richest-customer-wealth/',
  difficulty: Difficulty.简单,
  tag: [Tag.数组, Tag.矩阵],
  desc: `客户的 资产总量 就是他们在各家银行托管的资产数量之和。最富有客户就是 资产总量 最大的客户。`,
  solutions: [
    {
      script: Script.CPP,
      time: 8,
      memory: 12.3,
      desc: '递归遍历',
      code: `class Solution {
   public:
    NestedInteger deserialize(string s) {
        NestedInteger res;
        if (s == "[]")
            return res;
        else if (s[0] == '[')
            split(res, s.substr(1, s.size() - 2));
        else
            res.setInteger(stoi(s));
        return res;
    }
    void split(NestedInteger &obj, string s) {
        int level = 0, start = 0, n = s.size();
        for (int i = 0; i < n; i++) {
            char ch = s[i];
            if (ch == '[')
                level++;
            else if (ch == ']')
                level--;
            else if (ch == ',' && level == 0)
                obj.add(deserialize(s.substr(start, i - start))), start = i + 1;
        }
        obj.add(deserialize(s.substr(start, n - start)));
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
