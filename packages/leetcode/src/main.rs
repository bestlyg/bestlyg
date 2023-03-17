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
    pub fn answer_queries(mut nums: Vec<i32>, queries: Vec<i32>) -> Vec<i32> {
        nums.sort();
        let (n, m) = (nums.len(), queries.len());
        let mut idxs = (0..m).collect::<Vec<usize>>();
        idxs.sort_by(|v1, v2| queries[*v1].cmp(&queries[*v2]));
        let mut res = (0..m).map(|v| v as i32).collect::<Vec<i32>>();
        let (mut idx, mut sum) = (0, 0);
        for i in 0..m {
            while idx < n && sum + nums[idx] <= queries[idxs[i]] {
                sum += nums[idx];
                idx += 1;
            }
            res[idxs[i]] = idx as i32;
        }
        res
    }
}
