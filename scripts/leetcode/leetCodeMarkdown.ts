import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '855. 考场就座',
  url: 'https://leetcode.cn/problems/exam-room/',
  difficulty: Difficulty.中等,
  tag: [Tag.设计, Tag.有序集合, Tag.堆_优先队列],
  desc: `当学生进入考场后，他必须坐在能够使他与离他最近的人之间的距离达到最大化的座位上。如果有多个这样的座位，他会坐在编号最小的座位上。`,
  solutions: [
    {
      script: Script.CPP,
      time: 612,
      memory: 19.8,
      desc: '遍历',
      code: `class ExamRoom {
public:
    int n;
    set<int> s;
    ExamRoom(int n): n(n) {}
    int seat() {
        if (s.size() == 0) { s.insert(0); return 0; }
        auto it = s.begin(), prev = it;
        int ans = 0, val = 0;
        if (*it != 0) {
            ans = 0;
            val = *it;
        }
        for (it++; it != s.end(); prev = it++) {
            int mid = (*it + *prev) / 2;
            if (mid - *prev > val) {
                ans = mid;
                val = mid - *prev;
            }
        }
        if (*s.rbegin() != n - 1 && n - *s.rbegin() - 1 > val) {
            ans = n - 1;
            val = n - *s.rbegin() - 1;
        }
        s.insert(ans);
        return ans;
    }
    void leave(int p) {
        s.erase(p);
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
