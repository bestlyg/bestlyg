import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '380. O(1) 时间插入、删除和获取随机元素',
  url: 'https://leetcode-cn.com/problems/reaching-points/',
  difficulty: Difficulty.困难,
  tag: [Tag.数学],
  desc: `给定四个整数 sx , sy ，tx 和 ty，如果通过一系列的转换可以从起点 (sx, sy) 到达终点 (tx, ty)，则返回 true，否则返回 false。`,
  solutions: [
    {
      script: Script.CPP,
      time: 188,
      memory: 94.7,
      desc: '利用队列末尾增删O1来维护时间复杂度',
      code: `class RandomizedSet {
   public:
    vector<int> list;
    unordered_map<int, int> m;
    RandomizedSet() { srand((int)time(0)); }
    bool insert(int val) {
        if (m.count(val)) return false;
        m[val] = list.size();
        list.push_back(val);
        return true;
    }
    bool remove(int val) {
        if (!m.count(val)) return false;
        int idx = m[val], last_idx = list.size() - 1;
        m[list[last_idx]] = idx;
        swap(list[idx], list[last_idx]);
        list.pop_back();
        m.erase(val);
        return true;
    }
    int getRandom() {
        int idx = random() % list.size();
        return list[idx];
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
