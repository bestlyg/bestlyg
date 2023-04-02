import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '6365. 最少翻转操作数',
  url: 'https://leetcode.cn/problems/minimum-reverse-operations/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `请你返回一个数组 ans ，对于 [0, n - 1] 之间的任意下标 i ，ans[i] 是将 1 放到位置 i 处的 最少 翻转操作次数，如果无法放到位置 i 处，此数为 -1 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 716,
      memory: 163.36,
      desc: 'bfs+利用排序树快速删除和查找',
      code: `class Solution {
   public:
    vector<int> minReverseOperations(int n, int p, vector<int> &banned, int k) {
        vector<int> res(n, -1);
        res[p] = 0;
        if (k == 0 || k == 1) return res;
        unordered_set<int> used(banned.begin(), banned.end());
        set<int> ss[2];
        ss[0].insert(n);
        ss[1].insert(n);
        for (int i = 0; i < n; i++) {
            if (i != p && !used.count(i)) ss[i % 2].insert(i);
        }
        queue<int> q;
        int size = 1, cnt = 1;
        q.push(p);
        while (q.size()) {
            int p = q.front(), 
                nmin = max(p - k + 1, k - p - 1), 
                nmax = min(p + k - 1, 2 * n - k - p - 1);
            q.pop();
            auto it = ss[nmin % 2].lower_bound(nmin);
            while (*it <= nmax) {
                cout << "it= " << *it << endl;
                res[*it] = cnt;
                q.push(*it);
                ss[nmin % 2].erase(*it++);
            }
            if (--size == 0) {
                cnt++;
                size = q.size();
            }
        }
        return res;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 184,
      memory: 32.6,
      desc: '同上',
      code: `class Solution:
    def miceAndCheese(self, reward1: List[int], reward2: List[int], k: int) -> int:
        n = len(reward1)
        l: List[(int, int)] = []
        for i in range(n):
            l.append((reward1[i], reward2[i]))
        l.sort(key=lambda v: v[1] - v[0])
        res = i = 0
        while k:
            res += l[i][0]
            i += 1
            k -= 1
        while i < n:
            res += l[i][1]
            i += 1
        return res`,
    },
    {
      script: Script.RUST,
      time: 28,
      memory: 4.3,
      desc: '同上',
      code: `impl Solution {
    pub fn mice_and_cheese(reward1: Vec<i32>, reward2: Vec<i32>, mut k: i32) -> i32 {
        let n = reward1.len();
        let mut list: Vec<(i32, i32)> = vec![];
        for i in 0..n {
            list.push((reward1[i], reward2[i]));
        }
        list.sort_by_key(|v| (*v).1 - (*v).0);
        let mut res = 0;
        let mut i = 0;
        while k != 0 {
            res += list[i].0;
            i += 1;
            k -= 1;
        }
        while i < n {
            res += list[i].1;
            i += 1;
        }
        res
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
