mod preclude;

use preclude::*;

use std::string::String;

fn main() {}

struct MyCircularDeque {
    list: Vec<i32>,
    first: usize,
    last: usize,
    len: usize,
}
impl MyCircularDeque {
    fn new(k: i32) -> Self {
        let len = (k + 1) as usize;
        let mut list = Vec::with_capacity(len);
        for _ in 0..len {
            list.push(0);
        }
        MyCircularDeque {
            list,
            first: 0,
            last: 0,
            len,
        }
    }
    fn insert_front(&mut self, value: i32) -> bool {
        if self.is_full() {
            false
        } else {
            self.first = self.get_prev(self.first);
            self.list[self.first] = value;
            true
        }
    }
    fn insert_last(&mut self, value: i32) -> bool {
        if self.is_full() {
            false
        } else {
            self.list[self.last] = value;
            self.last = self.get_next(self.last);
            true
        }
    }
    fn delete_front(&mut self) -> bool {
        if self.is_empty() {
            false
        } else {
            self.first = self.get_next(self.first);
            true
        }
    }
    fn delete_last(&mut self) -> bool {
        if self.is_empty() {
            false
        } else {
            self.last = self.get_prev(self.last);
            true
        }
    }
    fn get_front(&self) -> i32 {
        if self.is_empty() {
            0
        } else {
            self.list[self.first]
        }
    }
    fn get_rear(&self) -> i32 {
        if self.is_empty() {
            0
        } else {
            self.list[self.get_prev(self.last)]
        }
    }
    fn is_empty(&self) -> bool {
        self.first == self.last
    }
    fn is_full(&self) -> bool {
        self.get_next(self.last) == self.first
    }
    fn get_prev(&self, cur: usize) -> usize {
        if cur == 0 {
            self.len - 1
        } else {
            cur - 1
        }
    }
    fn get_next(&self, cur: usize) -> usize {
        (cur + 1) % self.len
    }
}
