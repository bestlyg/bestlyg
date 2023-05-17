pub use std::borrow::Borrow;
pub use std::borrow::BorrowMut;
pub use std::char::MAX;
pub use std::cmp::Ordering;
pub use std::cmp::{max, min};
pub use std::collections::BTreeMap;
pub use std::collections::HashMap;
pub use std::collections::VecDeque;
pub use std::hash::Hash;
pub use std::mem::swap;
pub use std::{cell::RefCell, rc::Rc};

#[derive(PartialEq, Eq, Clone, Debug)]
pub struct ListNode {
    pub val: i32,
    pub next: Option<Box<ListNode>>,
}

impl ListNode {
    #[inline]
    pub fn new(val: i32) -> Self {
        ListNode { next: None, val }
    }
}

#[derive(Debug, PartialEq, Eq)]
pub struct TreeNode {
    pub val: i32,
    pub left: Option<Rc<RefCell<TreeNode>>>,
    pub right: Option<Rc<RefCell<TreeNode>>>,
}

impl TreeNode {
    #[inline]
    pub fn new(val: i32) -> Self {
        TreeNode {
            val,
            left: None,
            right: None,
        }
    }
}

pub struct MulitSet<T: Ord + Copy + Clone> {
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
pub fn pow(base: i64, exp: i64, mod_num: i64) -> i64 {
    let mut exp = exp;
    let mut tmp = base;
    let mut ans = 1;
    while exp != 0 {
        if exp % 2 == 1 {
            ans = (ans * tmp) % mod_num;
        }
        tmp = (tmp * tmp) % mod_num;
        exp >>= 1
    }
    ans
}

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

pub fn get_primes(max: usize) -> Vec<usize> {
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

pub fn str_to_vec(s: &String) -> Vec<char> {
    s.chars().collect()
}

pub fn gcd(a: i32, b: i32) -> i32 {
    if a < b {
        gcd(b, a)
    } else if b == 0 {
        a
    } else {
        gcd(b, a % b)
    }
}

pub fn get_sums(arr: &Vec<i32>) -> Vec<i32> {
    let mut sums = vec![0];
    for num in arr {
        sums.push(sums.last().unwrap() + *num);
    }
    sums
}

pub fn sort3(a: &mut i32, b: &mut i32, c: &mut i32) {
    use std::ptr::swap;
    unsafe {
        if a > c {
            swap(a, c);
        }
        if a > b {
            swap(a, b);
        }
        if b > c {
            swap(b, c);
        }
    };
}

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

pub const dirs: [[i32; 2]; 4] = [[0, 1], [0, -1], [1, 0], [-1, 0]];

pub struct UnionFind {
    n: usize,
    data: Vec<usize>,
    cnt: Vec<usize>,
}
impl UnionFind {
    pub fn new(n: usize) -> Self {
        let mut data = vec![0; n];
        for i in 0..data.len() {
            data[i] = i;
        }
        Self {
            n,
            data,
            cnt: vec![0; n],
        }
    }
    pub fn size(&mut self, v: usize) -> usize {
        let idx = self.find(v);
        self.cnt[idx]
    }
    pub fn find(&mut self, v: usize) -> usize {
        if self.data[v] != v {
            self.data[v] = self.find(self.data[v]);
        }
        self.data[v]
    }
    pub fn uni(&mut self, v1: usize, v2: usize) {
        let p1 = self.find(v1);
        let p2 = self.find(v2);
        if p1 != p2 {
            self.cnt[p1] += self.cnt[p2];
            self.data[p2] = p1;
        }
    }
    pub fn same(&mut self, v1: usize, v2: usize) -> bool {
        self.find(v1) == self.find(v2)
    }
}
pub fn pos2Idx(x: usize, y: usize, size: usize) -> usize {
    x * size + y
}
pub fn idx2Pos(idx: usize, size: usize) -> (usize, usize) {
    (idx / size, idx % size)
}

pub struct Solution;
