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
    pub fn make_array_increasing(arr1: Vec<i32>, mut arr2: Vec<i32>) -> i32 {
        use std::collections::HashMap;
        arr2.sort();
        let mut m = HashMap::<i32, HashMap<i32, i32>>::new();
        fn dfs(
            m: &mut HashMap<i32, HashMap<i32, i32>>,
            arr1: &Vec<i32>,
            arr2: &Vec<i32>,
            idx: i32,
            pre: i32,
        ) -> i32 {
            if idx == -1 {
                0
            } else {
                let item = m.entry(idx).or_insert(HashMap::new());
                if item.contains_key(&pre) {
                    *item.get(&pre).unwrap()
                } else {
                    let mut res = i32::MAX;
                    if arr1[idx as usize] < pre {
                        res = dfs(m, arr1, arr2, idx - 1, arr1[idx as usize]);
                    }
                    let find = arr2.binary_search_by(|v| if *v >= pre {Ordering::}).unwrap();
                    res
                }
            }
        }
        let res = dfs(&mut m, &arr1, &arr2, arr1.len() as i32 - 1, i32::MAX);
        if res == i32::MAX {
            -1
        } else {
            res
        }
    }
}
