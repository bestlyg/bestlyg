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
    pub fn moves_to_make_zigzag(nums: Vec<i32>) -> i32 {
        let n = nums.len();
        if n == 1 {
            0
        } else {
            let try1 = || {
                let mut res = 0;
                let mut i = 1;
                while i < n {
                    let mut p = nums[i - 1];
                    if i + 1 < n {
                        p = p.min(nums[i + 1]);
                    }
                    if nums[i] >= p {
                        res += nums[i] - p + 1;
                    }
                    i += 2;
                }
                res
            };
            let try2 = || {
                let mut res = 0;
                if nums[0] >= nums[1] {
                    res += nums[0] - nums[1] + 1;
                }
                let mut i = 2;
                while i < n {
                    let mut p = nums[i - 1];
                    if i + 1 < n {
                        p = p.min(nums[i + 1]);
                    }
                    if nums[i] >= p {
                        res += nums[i] - p + 1;
                    }
                    i += 2;
                }
                res
            };
            try1().min(try2())
        }
    }
}
