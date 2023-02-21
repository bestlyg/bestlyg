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

use std::cell::RefCell;
use std::collections::HashMap;
use std::rc::Rc;
#[derive(Clone, PartialEq, Eq, Ord)]
struct Node {
    x: i32,
    y: i32,
}
impl Node {
    fn new(x: i32, y: i32) -> Self {
        Node { x, y }
    }
    fn val(&self) -> f64 {
        (self.x + 1) as f64 / (self.y + 1) as f64 - self.x as f64 / self.y as f64
    }
}
impl PartialOrd for Node {
    fn partial_cmp(&self, o: &Self) -> Option<std::cmp::Ordering> {
        self.val().partial_cmp(&o.val())
    }
}

impl Solution {
    pub fn min_taps(n: i32, ranges: Vec<i32>) -> i32 {
        let n = n as usize;
        let mut l = vec![0; n + 1];
        for i in 0..ranges.len() {
            let start = 0.max(i as i32 - ranges[i]) as usize;
            let end = (n as i32).min(i as i32 + ranges[i]) as usize;
            l[start] = l[start].max(end);
        }
        let (mut res, mut pre, mut last) = (0, 0, 0);
        for i in 0..n {
            last = last.max(l[i]);
            if last == i {
                return -1;
            }
            if i == pre {
                res += 1;
                pre = last
            }
        }
        res
    }
}
