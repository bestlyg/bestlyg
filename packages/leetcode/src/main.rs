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
    pub fn minimum_swap(s1: String, s2: String) -> i32 {
        let s1 = s1.chars().collect::<Vec<char>>();
        let s2 = s2.chars().collect::<Vec<char>>();
        let n = s1.len();
        let mut ans = 0;
        let (mut x, mut y) = (0, 0);
        for i in 0..n {
            if s1[i] != s2[i] {
                if s1[i] == 'x' {
                    x += 1;
                } else {
                    y += 1;
                }
            }
        }
        ans += x / 2 + y / 2;
        x %= 2;
        y %= 2;
        if x != 0 && y != 0 {
            ans += 2;
            x = 0;
            y = 0;
        }
        if x != 0 || y != 0 {
            -1
        } else {
            ans
        }
    }
}
