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

// use std::rc::Rc;
// use std::cell::RefCell;

impl Solution {
    pub fn max_ancestor_diff(root: Option<Rc<RefCell<TreeNode>>>) -> i32 {
        use std::cmp::{max, min};
        let root = root.unwrap();
        fn dfs(node: &Rc<RefCell<TreeNode>>) -> Vec<i32> {
            let node = node.as_ref().borrow();
            let mut res = vec![node.val, node.val, 0];
            if node.left.is_some() {
                let v = dfs(&node.left.as_ref().unwrap());
                res[0] = min(res[0], v[0]);
                res[1] = max(res[1], v[1]);
                res[2] = max(
                    res[2],
                    max(
                        v[2],
                        max(i32::abs(res[0] - node.val), i32::abs(res[1] - node.val)),
                    ),
                );
            }
            if node.right.is_some() {
                let v = dfs(&node.right.as_ref().unwrap());
                res[0] = min(res[0], v[0]);
                res[1] = max(res[1], v[1]);
                res[2] = max(
                    res[2],
                    max(
                        v[2],
                        max(i32::abs(res[0] - node.val), i32::abs(res[1] - node.val)),
                    ),
                );
            }
            res
        }
        dfs(&root)[2]
    }
}
