import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1090. 受标签影响的最大值',
  url: 'https://leetcode.cn/problems/largest-values-from-labels/',
  difficulty: Difficulty.简单,
  tag: [],
  desc: `返回子集 s 的最大 分数 。`,
  solutions: [
    //         {
    //           script: Script.TS,
    //           time: 76,
    //           memory:45.5,
    //           desc: '利用余数为0判断是否产生分割',
    //           code: `function chunk(arr: any[], size: number): any[][] {
    //     const res: any[][] = [];
    //     const item: any[] = [];
    //     for (let i = 1; i <= arr.length; i++) {
    //         item.push(arr[i - 1]);
    //         if (i % size === 0) res.push([...item]), (item.length = 0);
    //     }
    //     if (item.length) res.push([...item]);
    //     return res;
    // }`,
    //         },
    {
      script: Script.CPP,
      time: 44,
      memory: 22.2,
      desc: '利用堆找出最大的值贪心塞入',
      code: `class Solution {
public:
    int largestValsFromLabels(vector<int>& values, vector<int>& labels, int numWanted, int useLimit) {
        unordered_map<int, vector<int>> m;
        unordered_map<int, int> mcnt;
        int n = values.size();
        for (int i = 0; i < n; i++) m[labels[i]].push_back(values[i]);
        for (auto &item : m) sort(item.second.begin(), item.second.end());
        auto cmp = [&](int x, int y) -> bool { return m[x].back() < m[y].back(); };
        priority_queue<int, vector<int>, decltype(cmp)> q(cmp);
        for (auto &item : m) q.push(item.first);
        int res = 0;
        for (int i = 0; i < numWanted && q.size(); i++) {
            int idx = q.top();
            q.pop();
            res += m[idx].back();
            m[idx].pop_back();
            if (++mcnt[idx] < useLimit && m[idx].size()) q.push(idx);
        }
        return res;
    }
};`,
    },
    {
      script: Script.CPP,
      time: 52,
      memory: 19.3,
      desc: '排序后从后往前遍历',
      code: `class Solution {
public:
    int largestValsFromLabels(vector<int>& values, vector<int>& labels, int numWanted, int useLimit) {
        int n = values.size();
        vector<int> list;
        for (int i = 0; i < n; i++) list.push_back(i);
        sort(list.begin(), list.end(), [&](auto &i1, auto &i2) {
            return values[i1] < values[i2];
        });
        unordered_map<int, int> m;
        int res = 0;
        for (int i = n - 1, cnt = 0; i >= 0 && cnt < numWanted; i--) {
            if (m[labels[list[i]]] == useLimit) continue;
            m[labels[list[i]]] += 1;
            res += values[list[i]];
            cnt += 1;
        }
        return res;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 60,
      memory:19.8,
      desc: '同上',
      code: `class Solution:
    def largestValsFromLabels(self, values: List[int], labels: List[int], numWanted: int, useLimit: int) -> int:
        n = len(values)
        list = [i for i in range(n)]
        list.sort(key=lambda i: values[i])
        m = Counter()
        res = 0
        cnt = 0
        for i in range(n-1, -1, -1):
            if cnt >= numWanted:
                break
            if m[labels[list[i]]] == useLimit:
                continue
            m[labels[list[i]]] += 1
            res += values[list[i]]
            cnt += 1
        return res`,
    },
    {
      script: Script.RUST,
      time: 4,
      memory: 2.6,
      desc: '同上',
      code: `impl Solution {
pub fn largest_vals_from_labels(
    values: Vec<i32>,
    labels: Vec<i32>,
    num_wanted: i32,
    use_limit: i32,
) -> i32 {
    let n = values.len();
    let mut list = vec![];
    for i in 0..n {
        list.push(i);
    }
    list.sort_by_key(|i| values[*i]);
    let mut m = std::collections::HashMap::<i32, i32>::new();
    let mut res = 0;
    let mut cnt = 0;
    for i in (0..n).rev() {
        if cnt >= num_wanted {
            break;
        }
        let item = m.entry(labels[list[i]]).or_insert(0);
        if *item < use_limit {
            *item += 1;
            res += values[list[i]];
            cnt += 1;
        }
    }
    res
}
}`,
    },
  ],
};

export default leetCodeMarkdown;
