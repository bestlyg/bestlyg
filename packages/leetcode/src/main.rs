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
        use std::collections::VecDeque;
        let n = n as usize;
        let p = p as usize;
        let k = k as usize;
        let mut res = vec![-1; n];
        res[p] = 0;
        if k == 0 || k == 1 {
            res
        } else {
            let mut used = vec![false; n];
            used[p] = true;
            let mut banlist = vec![false; n];
            for i in banned {
                banlist[i as usize] = true
            }
            let mut q = VecDeque::<usize>::new();
            q.push_back(p);
            let mut size = 1;
            let mut cnt = 1;
            while !q.is_empty() {
                let p = q.pop_front().unwrap();
                let mut i = p;
                println!("p={p}");
                while (i as i32) + 1 - (k as i32) <= p && i < n {
                    if (i as i32) + 1 - (k as i32) < 0 {
                        i += 1;
                        continue;
                    }
                    let start = i + 1 - k;
                    let end = i;
                    let revp = (end - start + 1) - 1 - (p - start) + start;
                    println!("start = {start}, end = {end}, revp = {revp}");
                    if banlist[revp] || used[revp] {
                        continue;
                    }
                    used[revp] = true;
                    q.push_back(revp);
                    res[revp] = cnt;
                    i += 1;
                }
                size -= 1;
                if size == 0 {
                    cnt += 1;
                    size = q.len();
                }
            }
            res
        }
    }
}
