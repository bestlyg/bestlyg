import { leetcode, markdown, specStr } from './utils';
const { backquote } = specStr;
const { Script, Difficulty, Tag } = leetcode;
const { link } = markdown;
type Script = leetcode.Script;
type Difficulty = leetcode.Difficulty;
type Tag = leetcode.Tag;
type Solution = leetcode.Solution;
type Markdown = leetcode.Markdown;
export const leetCodeMarkdowns: Markdown[] = [
  {
    existMarkdown: !true,
    name: '剑指 Offer II 003. 前 n 个数字二进制中 1 的个数',
    url: 'https://leetcode-cn.com/problems/w3tCBm/',
    difficulty: Difficulty.简单,
    tag: [Tag.位运算, Tag.动态规划],
    desc: `给定一个非负整数 n ，请计算 0 到 n 之间的每个数字的二进制表示中 1 的个数，并输出一个数组。`,
    solutions: [
      {
        script: Script.CPP,
        time: 8,
        memory: 8.4,
        desc: '当遇到2的指数幂后，从0开始重新遍历',
        code: `class Solution {
   public:
    vector<int> countBits(int n) {
        vector<int> ans;
        ans.push_back(0);
        if (n == 0) return ans;
        ans.push_back(1);
        if (n == 1) return ans;
        for (int num = 2, i = 0; num <= n; num++, i++) {
            if ((num & (num - 1)) == 0) i = 0;
            ans.push_back(ans[i] + 1);
        }
        return ans;
    }
};`,
      },
    ],
  },
];
