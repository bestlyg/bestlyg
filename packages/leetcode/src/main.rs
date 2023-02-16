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

impl Solution {
    pub fn number_of_pairs(nums: Vec<i32>) -> Vec<i32> {
        let mut list = [0; 105];
        let mut ans = vec![0; 2];
        for num in nums {
            let num = num as usize;
            list[num] ^= 1;
            if list[num] == 0 {
                ans[0] += 1;
            }
        }
        for i in 0..105 {
            ans[1] += list[0];
        }
        ans
    }
}
