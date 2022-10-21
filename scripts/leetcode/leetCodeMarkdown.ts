import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '901. 股票价格跨度',
  url: 'https://leetcode.cn/problems/k-th-symbol-in-grammar/',
  difficulty: Difficulty.中等,
  tag: [Tag.位运算, Tag.递归, Tag.数学],
  desc: `给定行数 n 和序数 k，返回第 n 行中第 k 个字符。`,
  solutions: [
    {
      script: Script.CPP,
      time: 196,
      memory: 84.1,
      desc: '单调栈，存储比自己大的最近节点',
      code: `class StockSpanner {
public:
    stack<int> s;
    vector<int> list;
    StockSpanner() {
        list.push_back(0x7fffffff);
        s.push(0);
    }
    int next(int price) {
        while (list[s.top()] <= price) s.pop();
        int res = list.size() - s.top();
        s.push(list.size());
        list.push_back(price);
        return res;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
