mod preclude;

use std::borrow::Borrow;
use std::borrow::BorrowMut;
use std::char::MAX;
use std::cmp;
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
    pub fn longest_decomposition(text: String) -> i32 {
        let text = text.chars().collect::<Vec<char>>();
        let n = text.len();
        let mut res = 0;
        let check = |mut i1: usize, mut i2: usize, mut size: usize| -> bool {
            while size != 0 {
                if text[i1] != text[i2] {
                    return false;
                }
                i1 += 1;
                i2 += 1;
                size -= 1;
            }
            true
        };
        let mut i = 0;
        while i <= n / 2 {
            let mut f = false;
            let mut cnt = 1;
            while i + cnt <= n - i {
                if check(i, n - i - cnt, cnt) {
                    f = true;
                    res += if i == n - i - cnt { 1 } else { 2 };
                    i += cnt - 1;
                    break;
                }
                cnt += 1;
            }
            if !f {
                if (n - 2 * i) / 2 != 0 {
                    res += 1;
                }
                break;
            }
            i += 1;
        }
        res
    }
}
