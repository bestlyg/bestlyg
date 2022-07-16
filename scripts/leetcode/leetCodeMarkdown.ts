import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '剑指 Offer II 041. 滑动窗口的平均值',
  url: 'https://leetcode.cn/problems/qIsx9U/',
  difficulty: Difficulty.简单,
  tag: [Tag.设计, Tag.队列, Tag.数组, Tag.数据流],
  desc: `给定一个整数数据流和一个窗口大小，根据该滑动窗口的大小，计算滑动窗口里所有数字的平均值。`,
  solutions: [
    {
      script: Script.CPP,
      time: 20,
      memory: 13.7,
      desc: 'queue',
      code: `class MovingAverage {
   public:
    int size, sum = 0;
    queue<int> q;
    MovingAverage(int size) { this->size = size; }
    double next(int val) {
        if (q.size() >= size) {
            sum -= q.front();
            q.pop();
        }
        q.push(val);
        sum += val;
        return sum * 1.0 / q.size();
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
