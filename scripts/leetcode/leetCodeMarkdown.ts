import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '1753. 移除石子的最大得分',
  url: 'https://leetcode.cn/problems/find-if-path-exists-in-graph/',
  difficulty: Difficulty.简单,
  tag: [Tag.深度优先搜索, Tag.广度优先搜索, Tag.并查集, Tag.图],
  desc: `请你确定是否存在从顶点 source 开始，到顶点 destination 结束的 有效路径 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 96,
      memory: 5.7,
      desc: '堆',
      code: `class Solution {
public:
    int maximumScore(int a, int b, int c) {
        priority_queue<int> q;
        q.push(a);
        q.push(b);
        q.push(c);
        int ans = 0;
        while (q.size() >= 2) {
            int num1 = q.top(); q.pop();
            int num2 = q.top(); q.pop();
            ans += 1;
            if (num1 > 1) q.push(num1 - 1);
            if (num2 > 1) q.push(num2 - 1);
        }
        return ans;
    }
};`,
    },
    {
      script: Script.CPP,
      time: 0,
      memory: 5.7,
      desc: '尽可能匹配',
      code: `class Solution {
public:
    int maximumScore(int a, int b, int c) {
        sort_v(a, b, c);
        if (a + b <= c) return a + b;
        return (a + b + c) / 2;
    }
    void sort_v(int &a, int &b, int &c) {
        if (a > c) swap(a, c);
        if (b > c) swap(b, c);
        if (a > b) swap(a, b);
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
