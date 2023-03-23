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
    pub fn check_arithmetic_subarrays(nums: Vec<i32>, l: Vec<i32>, r: Vec<i32>) -> Vec<bool> {
        let check = |i| -> bool {
            let (left, right) = (l[i] as usize, r[i] as usize);
            let size = right - left;
            let (nmax, nmin) = (*nums[left..=right].iter().max().unwrap(), *nums[left..=right].iter().min().unwrap());
            if (nmax - nmin) % (size as i32) != 0 {
                false
            } else if nmax == nmin {
                true
            } else {
                let step = (nmax - nmin) / (size as i32);
                println!("l = {left}, r = {right}, min = {nmin}, max=  {nmax}, size= {size}, step = {step}");
                let mut arr = vec![false; (size + 1) as usize];
                for i in left..=right {
                    let val = ((nums[i] - nmin) / step) as usize;
                    println!("i={i},step={step},val={val}");
                    if (nums[i] - nmin) % step != 0 || arr[val] {
                        return false;
                    }
                    arr[val] = true;
                }
                true
            }
        };
        (0..l.len()).map(|i| check(i)).collect::<Vec<bool>>()
    }
}
