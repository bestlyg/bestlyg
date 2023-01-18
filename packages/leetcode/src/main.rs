mod preclude;

use std::borrow::Borrow;
use std::borrow::BorrowMut;
use std::char::MAX;

use preclude::*;
fn main() {
    // let func = Solution::count_nice_pairs;
    // let res = func(vec![42, 11, 1, 97]);
    // println!("res = {res:#?}");
    // let o = MKAverage::new(3, 1);
}

use std::collections::BTreeMap;
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
}
