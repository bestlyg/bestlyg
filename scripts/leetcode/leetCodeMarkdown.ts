import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '946. 验证栈序列',
  url: 'https://leetcode.cn/problems/maximum-binary-tree-ii/',
  difficulty: Difficulty.中等,
  tag: [Tag.树, Tag.二叉树],
  desc: `返回 Construct(b) 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 16,
      memory: 14.8,
      desc: 'stack',
      code: `class Solution {
public:
    bool validateStackSequences(vector<int>& pushed, vector<int>& popped) {
        int len = popped.size();
        stack<int> s;
        for (int i1 = 0, i2 = 0; i1 < len; i1++) {
            s.push(pushed[i1]);
            while (i2 < len && s.size() && s.top() == popped[i2]) {
                s.pop();
                i2++;
            }
        }
        return s.empty();
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
