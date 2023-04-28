import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '1172. 餐盘栈',
  url: 'https://leetcode.cn/problems/dinner-plate-stacks/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `我们把无限数量 ∞ 的栈排成一行，按从左到右的次序从 0 开始编号。每个栈的的最大容量 capacity 都相同。实现一个叫「餐盘」的类 DinnerPlates。`,
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
//     {
//       script: Script.CPP,
//       time: 448,
//       memory: 205.7,
//       desc: '模拟栈，用优先队列和哈希表存储从左往右空着的元素，末尾为空时删除末尾的栈',
//       code: `class DinnerPlates {
// public:
//     int capacity;
//     vector<vector<int>> ss;
//     unordered_set<int> used;
//     priority_queue<int, vector<int>, greater<int>> q;

//     DinnerPlates(int capacity): capacity(capacity) {}

//     int load_stack() {
//         ss.push_back(vector<int>());
//         return ss.size() - 1;
//     }

//     void clear_last() {
//         while (ss.size() && ss.back().size() == 0) ss.pop_back();
//     }
    
//     void push(int val) {
//         while (q.size() && q.top() >= ss.size()) q.pop();
//         if (q.empty()) {
//             int idx = ss.size() - 1;
//             if (ss.empty() || ss[idx].size() == capacity) idx = load_stack();
//             ss[idx].push_back(val);
//         } else {
//             int idx = q.top();
//             ss[idx].push_back(val);
//             if (ss[idx].size() == capacity) q.pop(), used.erase(idx);
//         }
//     }
    
//     int pop() {
//         clear_last();
//         if (ss.empty()) return -1;
//         int back = ss.back().back();
//         ss.back().pop_back();
//         return back;
//     }
    
//     int popAtStack(int index) {
//         if (index >= ss.size() || ss[index].size() == 0) return -1;
//         int back = ss[index].back();
//         ss[index].pop_back();
//         clear_last();
//         if (index < ss.size() && !used.count(index)) q.push(index), used.insert(index);
//         return back;
//     }
// };`,
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
    {
      script: Script.RUST,
      time: 116,
      memory: 76.6,
      desc: '同上',
      code: `use std::cmp::Ordering;

#[derive(PartialEq)]
struct RevUnsize(usize);
impl Eq for RevUnsize {}

impl PartialOrd for RevUnsize {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        other.0.partial_cmp(&self.0)
    }
}
impl Ord for RevUnsize {
    fn cmp(&self, other: &RevUnsize) -> Ordering {
        other.0.partial_cmp(&self.0).unwrap()
    }
}

struct DinnerPlates {
    capacity: usize,
    last: usize,
    ss: Vec<Vec<i32>>,
    used: std::collections::HashSet<usize>,
    q: std::collections::BinaryHeap<RevUnsize>,
}

impl DinnerPlates {
    fn new(capacity: i32) -> Self {
        Self {
            capacity: capacity as usize,
            last: 0,
            ss: vec![vec![]],
            used: Default::default(),
            q: Default::default(),
        }
    }

    fn format_last(&mut self) {
        if self.ss[self.last].len() == self.capacity {
            self.last += 1;
        }
        if self.last == self.ss.len() {
            self.ss.push(vec![]);
        }
    }

    fn push(&mut self, val: i32) {
        while !self.q.is_empty() && (*self.q.peek().unwrap()).0 > self.last {
            self.q.pop();
        }
        if self.q.is_empty() {
            self.format_last();
            self.ss[self.last].push(val);
        } else {
            let idx = (*self.q.peek().unwrap()).0;
            self.ss[idx].push(val);
            if self.ss[idx].len() == self.capacity {
                self.q.pop();
                self.used.remove(&idx);
            }
        }
    }

    fn pop(&mut self) -> i32 {
        while self.last > 0 && self.ss[self.last].len() == 0 {
            self.last -= 1;
        }
        if self.last == 0 && self.ss[self.last].len() == 0 {
            -1
        } else {
            self.ss[self.last].pop().unwrap()
        }
    }

    fn pop_at_stack(&mut self, index: i32) -> i32 {
        let index = index as usize;
        if index > self.last || self.ss[index].len() == 0 {
            -1
        } else {
            let back = self.ss[index].pop().unwrap();
            if !self.used.contains(&index) {
                self.q.push(RevUnsize(index));
                self.used.insert(index);
            }
            back
        }
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
