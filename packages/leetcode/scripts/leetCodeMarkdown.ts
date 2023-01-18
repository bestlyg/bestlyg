import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1825. 求出 MK 平均值',
  url: 'https://leetcode.cn/problems/finding-mk-average/',
  difficulty: Difficulty.困难,
  tag: [Tag.设计, Tag.队列, Tag.数据流, Tag.有序合集, Tag.堆_优先队列],
  desc: `请你实现 MKAverage 类`,
  solutions: [
    {
      script: Script.CPP,
      time: 796,
      memory: 144.8,
      desc: '有序集合，维护有序性,s1表示前k个，s3表示后k个，s2表示中间m-2k个',
      code: `class MKAverage {
public:
    multiset<int> s1, s2, s3;
    queue<int> q;
    long long sum = 0, m, k;
    MKAverage(int m, int k) {
        this->m = m;
        this->k = k;
    }
 
    int calculateMKAverage() {
        if (q.size() < m) return -1;
        return sum / (m - 2 * k);
    }
 
    void addElement(int num) {
        q.push(num);
        if (q.size() <= m) {
            s2.insert(num);
            sum += num;
            if (q.size() == m) {
                while (s2.size() > m - 2 * k && s3.size() < k) {
                    s3.insert(*s2.rbegin());
                    sum -= *s2.rbegin();
                    s2.erase(prev(s2.end()));
                }
                while (s2.size() > m - 2 * k && s1.size() < k) {
                    s1.insert(*s2.begin());
                    sum -= *s2.begin();
                    s2.erase(s2.begin());
                }
            }
        } else {
            if (num < *s2.begin()) {
                s2.insert(*s1.rbegin());
                sum += *s1.rbegin();
                s1.insert(num);
                s1.erase(prev(s1.end()));
            } else if (num >= *s3.begin()) {
                s2.insert(*s3.begin());
                sum += *s3.begin();
                s3.insert(num);
                s3.erase(s3.begin());
            } else {
                s2.insert(num);
                sum += num;
            }
            int eraseVal = q.front();
            q.pop();
            if (s1.count(eraseVal)) {
                s1.erase(s1.find(eraseVal));
                s1.insert(*s2.begin());
                sum -= *s2.begin();
                s2.erase(s2.begin());
            } else if (s3.count(eraseVal)) {
                s3.erase(s3.find(eraseVal));
                s3.insert(*s2.rbegin());
                sum -= *s2.rbegin();
                s2.erase(prev(s2.end()));
            } else {
                s2.erase(s2.find(eraseVal));
                sum -= eraseVal;
            }
        }
    }
    void print(string title) {
        cout << "===" << title << "===" << endl;
        cout << "sum = " << sum << endl;
        cout << "s1 : ";
        for (auto &num : s1) cout << num << ", ";
        cout << endl;
        cout << "s2 : ";
        for (auto &num : s2) cout << num << ", ";
        cout << endl;
        cout << "s3 : ";
        for (auto &num : s3) cout << num << ", ";
        cout << endl;
    }
};`,
    },
    {
      script: Script.RUST,
      time: 64,
      memory: 35.1,
      desc: '同上',
      code: `use std::collections::BTreeMap;
use std::collections::VecDeque;

struct MulitSet<T: Ord + Copy + Clone> {
    length: usize,
    tree: BTreeMap<T, usize>,
}
impl<T: Ord + Copy + Clone> MulitSet<T> {
    fn new() -> Self {
        MulitSet {
            length: 0,
            tree: BTreeMap::new(),
        }
    }
    fn contains(&self, k: &T) -> bool {
        self.tree.contains_key(k)
    }
    fn len(&self) -> usize {
        self.length
    }
    fn insert(&mut self, key: T) {
        *self.tree.entry(key).or_insert(0) += 1;
        self.length += 1;
    }
    fn remove(&mut self, key: &T) {
        let item = self.tree.get_mut(&key).unwrap();
        if *item > 1 {
            *item -= 1;
        } else {
            self.tree.remove(key);
        }
        self.length -= 1;
    }
    fn peek_first(&mut self) -> T {
        *self.tree.iter().next().unwrap().0
    }
    fn peek_last(&mut self) -> T {
        *self.tree.iter().rev().next().unwrap().0
    }
    fn pop_first(&mut self) -> T {
        let key = self.peek_first();
        self.remove(&key);
        key
    }
    fn pop_last(&mut self) -> T {
        let key = self.peek_last();
        self.remove(&key);
        key
    }
}
struct MKAverage {
    m: i32,
    k: i32,
    sum: i64,
    q: VecDeque<i32>,
    s1: MulitSet<i32>,
    s2: MulitSet<i32>,
    s3: MulitSet<i32>,
}
impl MKAverage {
    fn new(m: i32, k: i32) -> Self {
        Self {
            m,
            k,
            sum: 0,
            q: VecDeque::new(),
            s1: MulitSet::<i32>::new(),
            s2: MulitSet::<i32>::new(),
            s3: MulitSet::<i32>::new(),
        }
    }

    fn calculate_mk_average(&self) -> i32 {
        if (self.q.len() as i32) < self.m {
            -1
        } else {
            (self.sum / (self.m - 2 * self.k) as i64) as i32
        }
    }

    fn add_element(&mut self, num: i32) {
        let m = self.m as usize;
        let k = self.k as usize;
        self.q.push_back(num);
        if self.q.len() <= m {
            self.s2.insert(num);
            self.sum += num as i64;
            if self.q.len() == m {
                for _ in 0..k {
                    let num = self.s2.pop_last();
                    self.sum -= num as i64;
                    self.s3.insert(num);

                    let num = self.s2.pop_first();
                    self.sum -= num as i64;
                    self.s1.insert(num);
                }
            }
        } else {
            if num < self.s2.peek_first() {
                self.s1.insert(num);
                self.sum += self.s1.peek_last() as i64;
                self.s2.insert(self.s1.pop_last());
            } else if num >= self.s3.peek_first() {
                self.s3.insert(num);
                self.sum += self.s3.peek_first() as i64;
                self.s2.insert(self.s3.pop_first());
            } else {
                self.sum += num as i64;
                self.s2.insert(num);
            }
            let pop_value = self.q.pop_front().unwrap();
            if self.s1.contains(&pop_value) {
                self.s1.remove(&pop_value);
                self.sum -= self.s2.peek_first() as i64;
                self.s1.insert(self.s2.pop_first());
            } else if self.s3.contains(&pop_value) {
                self.s3.remove(&pop_value);
                self.sum -= self.s2.peek_last() as i64;
                self.s3.insert(self.s2.pop_last());
            } else {
                self.sum -= pop_value as i64;
                self.s2.remove(&pop_value);
            }
        }
    }
}`,
    },
    {
      script: Script.PY3,
      time: 1748,
      memory: 45.4,
      desc: '同上',
      code: `from queue import Queue
from sortedcontainers import SortedList
class MKAverage:
    def __init__(self, m: int, k: int):
        self.m = m
        self.k = k
        self.sum = 0
        self.q = Queue()
        self.s1 = SortedList()
        self.s2 = SortedList()
        self.s3 = SortedList()

    def calculateMKAverage(self) -> int:
        if self.q.qsize() < self.m:
            return -1
        else:
            return self.sum // (self.m - self.k * 2)

    def addElement(self, num: int) -> None:
        self.q.put(num)
        if self.q.qsize() <= self.m:
            self.s2.add(num)
            self.sum += num
            if self.q.qsize() == self.m:
                for _ in range(self.k):
                    self.sum -= self.s2[-1]
                    self.s3.add(self.s2.pop())

                    self.sum -= self.s2[0]
                    self.s1.add(self.s2.pop(0))
        else:
            if num < self.s2[0]:
                self.s1.add(num)
                self.sum += self.s1[-1]
                self.s2.add(self.s1.pop())
            elif num >= self.s3[0]:
                self.s3.add(num)
                self.sum += self.s3[0]
                self.s2.add(self.s3.pop(0))
            else:
                self.sum += num
                self.s2.add(num)
            removeVal = self.q.get()
            if self.s1.count(removeVal):
                self.s1.discard(removeVal)
                self.sum -= self.s2[0]
                self.s1.add(self.s2.pop(0))
            elif self.s3.count(removeVal):
                self.s3.discard(removeVal)
                self.sum -= self.s2[-1]
                self.s3.add(self.s2.pop())
            else:
                self.sum -= removeVal
                self.s2.discard(removeVal)`,
    },
  ],
};

export default leetCodeMarkdown;
