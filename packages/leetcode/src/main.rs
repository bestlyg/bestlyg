mod preclude;

use std::borrow::Borrow;
use std::borrow::BorrowMut;
use std::char::MAX;
use std::cmp;
use std::cmp::Ordering;
use std::hash::Hash;
use std::mem::swap;
use std::ops::BitAnd;

use preclude::*;
fn main() {
    // let func = Solution::remove_subfolders;
    // let res = func(
    //     vec!["/a", "/a/b", "/c/d", "/c/d/e", "/c/f"]
    //         .into_iter()
    //         .map(|v| v.to_string())
    //         .collect(),
    // );
    // println!("res = {res:#?}");
}

const dirs: [[i32; 2]; 4] = [[0, 1], [0, -1], [1, 0], [-1, 0]];

use std::cell::RefCell;
use std::collections::HashMap;
use std::rc::Rc;
#[derive(Clone, PartialEq, Eq, Ord)]
struct Node {
    row: usize,
    col: usize,
    time: i32,
}
impl Node {
    fn new(row: usize, col: usize, time: i32) -> Self {
        Node { row, col, time }
    }
}
impl PartialOrd for Node {
    fn partial_cmp(&self, o: &Self) -> Option<std::cmp::Ordering> {
        self.time.partial_cmp(&o.time)
    }
}

fn get_primes(max: usize) -> Vec<usize> {
    let mut primes = vec![0; max];
    for i in 2..max {
        if primes[i] == 0 {
            primes[0] += 1;
            let idx = primes[0];
            primes[idx] = i;
        }
        for j in 1..=primes[0] {
            let idx = i * primes[j];
            if idx >= max {
                break;
            }
            primes[idx] = 1;
            if i % primes[j] == 0 {
                break;
            }
        }
    }
    primes
}

fn str_to_vec(s: &String) -> Vec<char> {
    s.chars().collect()
}

fn gcd(a: i32, b: i32) -> i32 {
    if a < b {
        gcd(b, a)
    } else if b == 0 {
        a
    } else {
        gcd(b, a % b)
    }
}

fn get_sums(arr: &Vec<i32>) -> Vec<i32> {
    let mut sums = vec![0];
    for num in arr {
        sums.push(sums.last().unwrap() + *num);
    }
    sums
}

fn cmp(s1: &[u8], s2: &[u8], i1: usize, i2: usize, err: usize) -> bool {
    if i1 == s1.len() {
        i2 + err == s2.len()
    } else if i2 == s2.len() {
        i1 + err == s1.len()
    } else if s1[i1] == s2[i2] {
        cmp(s1, s2, i1 + 1, i2 + 1, err)
    } else if err == 0 {
        false
    } else {
        cmp(s1, s2, i1 + 1, i2, err - 1) || cmp(s1, s2, i1, i2 + 1, err - 1)
    }
}

// use std::cmp::Ordering;

#[derive(PartialEq, PartialOrd)]
struct RevUnsize(usize);
impl Eq for RevUnsize {}

impl PartialOrd for MinNonNan {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        other.0.partial_cmp(&self.0).unwrap()
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
        let mut q = std::collections::BinaryHeap::<RevUnsize>::new();
        q.push(RevUnsize(0));
        q.push(RevUnsize(1));
        q.push(RevUnsize(2));
        while !q.is_empty() {
            println!("{}", q.pop().unwrap());
        }
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
        println!("PUSH {:?}", val);
        while !self.q.is_empty() && (*self.q.peek().unwrap()).0 > self.last {
            self.q.pop();
        }
        if self.q.is_empty() {
            self.format_last();
            self.ss[self.last].push(val);
        } else {
            let idx = (*self.q.peek().unwrap()).0;
            println!("mini idx = {}", idx);
            self.ss[idx].push(val);
            if self.ss[idx].len() == self.capacity {
                self.q.pop();
                self.used.remove(&idx);
            }
        }

        println!("{:?}", self.ss);
    }

    fn pop(&mut self) -> i32 {
        println!("POP,last={}", self.last);
        while self.last > 0 && self.ss[self.last].len() == 0 {
            self.last -= 1;
        }

        if self.last == 0 && self.ss[self.last].len() == 0 {
            println!("{:?}", self.ss);
            -1
        } else {
            let res = self.ss[self.last].pop().unwrap();

            println!("{:?}", self.ss);
            res
        }
    }

    fn pop_at_stack(&mut self, index: i32) -> i32 {
        println!("pop_at_stack,{index},last={}", self.last);
        let index = index as usize;
        if index > self.last || self.ss[index].len() == 0 {
            println!("{:?}", self.ss);
            -1
        } else {
            let back = self.ss[index].pop().unwrap();
            if !self.used.contains(&index) {
                self.q.push(RevUnsize(index));
                println!("qpush {index}");
                self.used.insert(index);
            }

            println!("{:?}", self.ss);
            back
        }
    }
}
