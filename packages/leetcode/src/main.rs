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
    pub fn min_subarray(nums: Vec<i32>, p: i32) -> i32 {
        let mut m = std::collections::HashMap::<i32, i32>::new();
        m.insert(0, -1);
        let (n, mut cur, mut sums) = (nums.len(), 0, 0);
        let mut res = n as i32;
        for num in nums.iter() {
            sums = (sums + num) % p;
        }
        if sums == 0 {
            0
        } else {
            for i in 0..n {
                cur = (cur + nums[i]) % p;
                let target = (cur - sums + p) % p;
                if m.contains_key(&target) {
                    res = res.min(i as i32 - m.get(&target).unwrap());
                }
                m.insert(cur, i as i32);
            }
            if res == n as i32 {
                -1
            } else {
                res
            }
        }
    }
}
