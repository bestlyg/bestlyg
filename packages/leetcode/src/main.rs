mod preclude;

use std::borrow::Borrow;
use std::borrow::BorrowMut;
use std::char::MAX;
use std::cmp;
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
    pub fn count_days_together(
        arrive_alice: String,
        leave_alice: String,
        arrive_bob: String,
        leave_bob: String,
    ) -> i32 {
        let days = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let comp = |time: Vec<char>| -> (i32, i32) {
            (
                (time[0] as i32 - '0' as i32) * 10 + time[1] as i32 - '0' as i32,
                (time[3] as i32 - '0' as i32) * 10 + time[4] as i32 - '0' as i32,
            )
        };
        let (mut a_s, mut a_l, mut b_s, mut b_l) = (
            comp(str_to_vec(&arrive_alice)),
            comp(str_to_vec(&leave_alice)),
            comp(str_to_vec(&arrive_bob)),
            comp(str_to_vec(&leave_bob)),
        );
        if a_s.0 > b_s.0 || a_s.0 == b_s.0 && a_s.1 > b_s.1 {
            swap(&mut a_s, &mut b_s);
            swap(&mut a_l, &mut b_l);
        }
        if a_l.0 < b_s.0 || a_l.0 == b_s.0 && a_l.1 < b_s.1 {
            0
        } else {
            let start = b_s;
            let end = if b_l.0 < a_l.0 || b_l.0 == a_l.0 && b_l.1 < a_l.1 {
                b_l
            } else {
                a_l
            };
            if start.0 == end.0 {
                end.1 - start.1 + 1
            } else {
                let mut res = days[start.0 as usize] - start.1 + 1 + end.1;
                for i in start.0 + 1..end.0 {
                    res += days[i as usize];
                }
                res
            }
        }
    }
}
