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
    pub fn minimum_operations(nums: Vec<i32>) -> i32 {
        let mut s = std::collections::HashSet::<i32>::new();
        for num in nums {
            s.insert(num);
        }
        return s.len() as i32 - if s.contains(&0) { 1 } else { 0 };
    }
}
