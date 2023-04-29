import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '2423. 删除字符使频率相同',
  url: 'https://leetcode.cn/problems/remove-letter-to-equalize-frequency/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `给你一个下标从 0 开始的字符串 word ，字符串只包含小写英文字母。你需要选择 一个 下标并 删除 下标处的字符，使得 word 中剩余每个字母出现 频率 相同。如果删除一个字母后，word 中剩余所有字母的出现频率都相同，那么返回 true ，否则返回 false 。`,
  solutions: [
    //     {
    //       script: Script.TS,
    //       time: 76,
    //       memory: 45.9,
    //       desc: '遍历',
    //       code: `function sortPeople(names: string[], heights: number[]): string[] {
    //   return new Array(names.length)
    //     .fill(0)
    //     .map((_, i) => i)
    //     .sort((a, b) => heights[b] - heights[a])
    //     .map(i => names[i]);
    // }`,
    //       date: new Date('2022/09/25').getTime(),
    //     },
    {
      script: Script.CPP,
      time: 0,
      memory:6,
      desc: '模拟',
      code: `class Solution {
public:
    bool equalFrequency(string word) {
        int cnt[26] = {0};
        for (auto &c : word) cnt[c - 'a']++;
        map<int, vector<int>> m;
        for (int i = 0; i < 26; i++) 
            if (cnt[i]) m[cnt[i]].push_back(i);
        // 如果都是一个频率，只有在频率都是1或者数量为1的时候才可以
        if (m.size() == 1) return m.begin()->first == 1 || m.begin()->second.size() == 1;
        // 超过两个频率就报错
        if (m.size() != 2) return false;
        int pi = -1;
        vector<int> pl;
        for (auto &item : m) {
            int ci = item.first;
            vector<int> cl = item.second;
            if (pi == -1) pi = ci, pl = cl;
            // 如果有一个频率是1且数量是1， 可以直接删
            else if (pi == 1 && pl.size() == 1 || ci == 1 && cl.size() == 1) return true;
            // 如果两个频率不差1， 就报错
            else if (pi + 1 != ci) return false;
            // 如果高频率不是只有1个，就报错
            else if (cl.size() != 1) return false;
        }
        return true;
    }
};`,
//     },
//     {
//       script: Script.PY3,
//       time: 632,
//       memory: 100.7,
//       desc: '同上',
//       code: `from heapq import *
// class DinnerPlates:

//     def __init__(self, capacity: int):
//         self.capacity = capacity
//         self.last = 0
//         self.ss = [[]]
//         self.used = set()
//         self.q = []

//     def get_last(self):
//         if len(self.ss[self.last]) == self.capacity:
//             self.last += 1
//         if self.last == len(self.ss):
//             self.ss.append([])
//         return self.last

//     def push(self, val: int) -> None:
//         while len(self.q) and self.q[0] > self.last:
//             heappop(self.q)
//         if len(self.q) == 0:
//             self.ss[self.get_last()].append(val)
//         else:
//             idx = self.q[0]
//             self.ss[idx].append(val)
//             if len(self.ss[idx]) == self.capacity:
//                 heappop(self.q)
//                 self.used.remove(idx)

//     def pop(self) -> int:
//         while self.last > 0 and len(self.ss[self.last]) == 0:
//             self.last -= 1
//         if self.last == 0 and len(self.ss[self.last]) == 0:
//             return -1
//         back = self.ss[self.last][-1]
//         self.ss[self.last].pop()
//         return back

//     def popAtStack(self, index: int) -> int:
//         if index > self.last or len(self.ss[index]) == 0:
//             return -1
//         back = self.ss[index][-1]
//         self.ss[index].pop()
//         if index not in self.used:
//             heappush(self.q, index)
//             self.used.add(index)
//         return back`,
//     },
//     {
//       script: Script.RUST,
//       time: 116,
//       memory: 76.6,
//       desc: '同上',
//       code: `use std::cmp::Ordering;

// #[derive(PartialEq)]
// struct RevUnsize(usize);
// impl Eq for RevUnsize {}

// impl PartialOrd for RevUnsize {
//     fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
//         other.0.partial_cmp(&self.0)
//     }
// }
// impl Ord for RevUnsize {
//     fn cmp(&self, other: &RevUnsize) -> Ordering {
//         other.0.partial_cmp(&self.0).unwrap()
//     }
// }

// struct DinnerPlates {
//     capacity: usize,
//     last: usize,
//     ss: Vec<Vec<i32>>,
//     used: std::collections::HashSet<usize>,
//     q: std::collections::BinaryHeap<RevUnsize>,
// }

// impl DinnerPlates {
//     fn new(capacity: i32) -> Self {
//         Self {
//             capacity: capacity as usize,
//             last: 0,
//             ss: vec![vec![]],
//             used: Default::default(),
//             q: Default::default(),
//         }
//     }

//     fn format_last(&mut self) {
//         if self.ss[self.last].len() == self.capacity {
//             self.last += 1;
//         }
//         if self.last == self.ss.len() {
//             self.ss.push(vec![]);
//         }
//     }

//     fn push(&mut self, val: i32) {
//         while !self.q.is_empty() && (*self.q.peek().unwrap()).0 > self.last {
//             self.q.pop();
//         }
//         if self.q.is_empty() {
//             self.format_last();
//             self.ss[self.last].push(val);
//         } else {
//             let idx = (*self.q.peek().unwrap()).0;
//             self.ss[idx].push(val);
//             if self.ss[idx].len() == self.capacity {
//                 self.q.pop();
//                 self.used.remove(&idx);
//             }
//         }
//     }

//     fn pop(&mut self) -> i32 {
//         while self.last > 0 && self.ss[self.last].len() == 0 {
//             self.last -= 1;
//         }
//         if self.last == 0 && self.ss[self.last].len() == 0 {
//             -1
//         } else {
//             self.ss[self.last].pop().unwrap()
//         }
//     }

//     fn pop_at_stack(&mut self, index: i32) -> i32 {
//         let index = index as usize;
//         if index > self.last || self.ss[index].len() == 0 {
//             -1
//         } else {
//             let back = self.ss[index].pop().unwrap();
//             if !self.used.contains(&index) {
//                 self.q.push(RevUnsize(index));
//                 self.used.insert(index);
//             }
//             back
//         }
//     }
// }`,
    },
  ],
};

export default leetCodeMarkdown;
