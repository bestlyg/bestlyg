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
#[derive(Clone)]
struct Node {
    end: bool,
    children: HashMap<String, Node>,
}
impl Node {
    fn new() -> Self {
        Self {
            end: false,
            children: HashMap::new(),
        }
    }
}
struct CustomFunction {}
impl CustomFunction {
    fn f(self, x: i32, y: i32) -> i32 {
        0
    }
}

impl Solution {
    pub fn find_solution(customfunction: &CustomFunction, z: i32) -> Vec<Vec<i32>> {
        let mut res = vec![];
        for x in 1..=1000 {
            let (mut l, mut r) = (1, 1000);
            while l <= r {
                let m = (l + r) / 2;
                let val = customfunction.f(x, m);
                if val == z {
                    res.push(vec![x, m]);
                    break;
                }
                if val > z {
                    r = m - 1;
                } else {
                    l = m + 1;
                }
            }
        }
        res
    }
}
