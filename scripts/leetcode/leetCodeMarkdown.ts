import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1441. 用栈操作构建数组',
  url: 'https://leetcode.cn/problems/build-an-array-with-stack-operations/',
  difficulty: Difficulty.中等,
  tag: [Tag.栈, Tag.数组, Tag.模拟],
  desc: `给你一个数组 target 和一个整数 n。每次迭代，需要从  list = { 1 , 2 , 3 ..., n } 中依次读取一个数字。`,
  solutions: [
    {
      script: Script.CPP,
      time: 8,
      memory: 7.6,
      desc: '遍历',
      code: `class Solution {
public:
    vector<string> buildArray(vector<int>& target, int n) {
        vector<string> list;
        int cur = 1;
        for (auto &item : target) {
            while (cur < item) {
                list.push_back("Push");
                list.push_back("Pop");
                cur++;
            }
            list.push_back("Push");
            cur++;
        }
        return list;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
