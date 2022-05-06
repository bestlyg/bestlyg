import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '933. 最近的请求次数',
  url: 'https://leetcode-cn.com/problems/construct-quad-tree/',
  difficulty: Difficulty.中等,
  tag: [Tag.树, Tag.数组, Tag.分治, Tag.矩阵],
  desc: `你需要返回能表示矩阵的 四叉树 的根结点。`,
  solutions: [
    {
      script: Script.CPP,
      time: 132,
      memory: 56,
      desc: 'queue',
      code: `class RecentCounter {
   public:
    queue<int> q;
    RecentCounter() {}
    int ping(int t) {
        q.push(t);
        while (t - q.front() > 3000) q.pop();
        return q.size();
    }
};`,
    },
    {
      script: Script.GO,
      time: 136,
      memory: 8.1,
      desc: 'queue',
      code: `type RecentCounter struct {
    queue []int
}

func Constructor() RecentCounter {
    res := RecentCounter{}
    return res
}
func (this *RecentCounter) Ping(t int) int {
    this.queue = append(this.queue, t)
    for t-this.queue[0] > 3000 {
        this.queue = this.queue[1:]
    }
    return len(this.queue)
}`,
    },
  ],
};
export default leetCodeMarkdown;
