mod preclude;

use std::borrow::Borrow;
use std::borrow::BorrowMut;
use std::char::MAX;
use std::hash::Hash;

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

impl Solution {
    pub fn count_subarrays(nums: Vec<i32>, k: i32) -> i32 {
        let mut m = std::collections::HashMap::<i32, i32>::new();
        let (mut res, mut cur, mut find_k) = (0, 0, false);
        for num in nums {
            if num > k {
                cur += 1;
            } else if num < k {
                cur -= 1;
            } else {
                find_k = true;
            }
            if find_k {
                res += *m.get(&cur).unwrap_or(&0)
                    + *m.get(&(cur - 1)).unwrap_or(&0)
                    + ((cur == 0 || cur == 1) as i32);
            } else {
                *m.entry(cur).or_insert(0) += 1;
            }
        }
        res
    }
}
