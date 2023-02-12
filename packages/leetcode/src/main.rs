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
    pub fn fill_cups(amount: Vec<i32>) -> i32 {
        use std::collections::BinaryHeap;
        let mut heap = BinaryHeap::new();
        for num in amount {
            if num != 0 {
                heap.push(num)
            }
        }
        let mut res = 0;
        while heap.len() >= 2 {
            let (num1, num2) = (heap.pop().unwrap(), heap.pop().unwrap());
            if num1 != 1 {
                heap.push(num1 - 1);
            }
            if num2 != 1 {
                heap.push(num2 - 1)
            }
            res += 1
        }
        if !heap.is_empty() {
            res += heap.pop().unwrap();
        }
        res
    }
}
