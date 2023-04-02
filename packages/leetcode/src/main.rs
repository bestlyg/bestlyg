mod preclude;

use std::borrow::Borrow;
use std::borrow::BorrowMut;
use std::char::MAX;
use std::hash::Hash;
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
impl Solution {
    pub fn min_reverse_operations(n: i32, p: i32, banned: Vec<i32>, k: i32) -> Vec<i32> {
        use std::collections::{BTreeSet, HashSet, VecDeque};
        let n = n as usize;
        let p = p as usize;
        let mut res = vec![-1; n];
        res[p] = 0;
        let used = HashSet::<usize>::from_iter(banned.into_iter().map(|v| v as usize));
        let mut ss = [BTreeSet::<usize>::new(), BTreeSet::<usize>::new()];
        ss[0].insert(n);
        ss[1].insert(n);
        for i in 0..n {
            if i != p && !used.contains(&i) {
                ss[i % 2].insert(i);
            }
        }
        let mut q = VecDeque::<usize>::new();
        let (mut size, mut cnt) = (1, 1);
        q.push_back(p);
        while !q.is_empty() {
            let p = q.pop_front().unwrap() as i32;
            let nmin = (p - k + 1).max(k - p - 1) as usize;
            let nmax = (p + k - 1).min(2 * n as i32 - k - p - 1) as usize;
            let it = ss[nmin % 2].bitand(rhs)
        }
        res
    }
}
