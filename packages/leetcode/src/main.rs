mod preclude;

use std::borrow::Borrow;
use std::borrow::BorrowMut;
use std::char::MAX;
use std::cmp;
use std::hash::Hash;
use std::ops::BitAnd;
use std::str::pattern;

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

// Definition for singly-linked list.
// #[derive(PartialEq, Eq, Clone, Debug)]
// pub struct ListNode {
//   pub val: i32,
//   pub next: Option<Box<ListNode>>
// }
//
// impl ListNode {
//   #[inline]
//   fn new(val: i32) -> Self {
//     ListNode {
//       next: None,
//       val
//     }
//   }
// }
// const dirs: [[i32; 2]; 4] = [[0, 1], [0, -1], [1, 0], [-1, 0]];

impl Solution {
    pub fn garden_no_adj(n: i32, paths: Vec<Vec<i32>>) -> Vec<i32> {
        let n = n as usize;
        let mut list = vec![vec![]; 5];
        for p in paths {
            let (p0, p1) = (p[0] as usize, p[1] as usize);
            list[p0 - 1].push(p1 - 1);
            list[p1 - 1].push(p0 - 1);
        }
        let mut res = vec![0; n];
        for i in 0..n {
            let mut cache = [false; 5];
            for next in list[i].iter() {
                if res[*next] != 0 {
                    cache[res[*next]] = true;
                }
            }
            for j in 1..5 {
                if !cache[j] {
                    res[i] = j;
                    break;
                }
            }
        }
        res.into_iter().map(|v| v as i32).collect()
    }
}
