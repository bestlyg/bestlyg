import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '1670. 设计前中后队列',
  url: 'https://leetcode-cn.com/problems/add-digits/',
  difficulty: Difficulty.中等,
  tag: [Tag.数学, Tag.数论, Tag.模拟],
  desc: `给定一个非负整数 num，反复将各个位上的数字相加，直到结果为一位数。返回这个结果。`,
  solutions: [
    {
      script: Script.CPP,
      time: 28,
      memory: 20.4,
      desc: '维护两个双端队列',
      code: `class FrontMiddleBackQueue {
   public:
    deque<int> q1, q2;
    FrontMiddleBackQueue() {}
    void balance() {
        if (empty()) return;
        while (q1.size() > q2.size()) {
            q2.push_front(q1.back());
            q1.pop_back();
        }
        while (q1.size() < q2.size() - 1) {
            q1.push_back(q2.front());
            q2.pop_front();
        }
    }
    void pushFront(int val) {
        q1.push_front(val);
        balance();
    }
    void pushMiddle(int val) {
        if (q1.size() == q2.size())
            q1.push_back(val);
        else
            q2.push_front(val);
        balance();
    }
    void pushBack(int val) {
        q2.push_back(val);
        balance();
    }
    int popFront() {
        if (empty()) return -1;
        int res;
        if (q1.size()) {
            res = q1.front();
            q1.pop_front();
        } else {
            res = q2.front();
            q2.pop_front();
        }
        balance();
        return res;
    }
    int popMiddle() {
        if (empty()) return -1;
        int res;
        if (q1.size() == q2.size()) {
            res = q1.back();
            q1.pop_back();
        } else {
            res = q2.front();
            q2.pop_front();
        }
        balance();
        return res;
    }
    int popBack() {
        if (empty()) return -1;
        int res = q2.back();
        q2.pop_back();
        balance();
        return res;
    }
    int empty() { return q1.size() + q2.size() == 0; }
};`,
    },
  ],
};
export default leetCodeMarkdown;
