mod preclude;

use std::borrow::Borrow;
use std::borrow::BorrowMut;
use std::char::MAX;
use std::hash::Hash;

use preclude::*;
fn main() {
    let func = Solution::alert_names;
    // let res = func(3, vec![vec![0, 1], vec![0, 2]], vec![vec![1, 0]]);
    // println!("res = {res:#?}");
}

// use std::cell::RefCell;
// use std::rc::Rc;
// #[derive(Clone)]
// struct Node {
//     cnt: i32,
//     lcnt: i32,
//     rcnt: i32,
//     p: Option<Rc<RefCell<TreeNode>>>,
// }
// impl Node {
//     fn new() -> Self {
//         Self {
//             cnt: 0,
//             lcnt: 0,
//             rcnt: 0,
//             p: None,
//         }
//     }
// }

// Definition for a binary tree node.
// #[derive(Debug, PartialEq, Eq)]
// pub struct TreeNode {
//   pub val: i32,
//   pub left: Option<Rc<RefCell<TreeNode>>>,
//   pub right: Option<Rc<RefCell<TreeNode>>>,
// }
//
// impl TreeNode {
//   #[inline]
//   pub fn new(val: i32) -> Self {
//     TreeNode {
//       val,
//       left: None,
//       right: None
//     }
//   }
// }
impl Solution {
    pub fn alert_names(key_name: Vec<String>, key_time: Vec<String>) -> Vec<String> {
        use std::collections::HashMap;
        let mut m = HashMap::<String, Vec<i32>>::new();
        let mut key_name = key_name.into_iter();
        let mut key_time = key_time.into_iter();
        loop {
            let key_name = key_name.next();
            let key_time = key_time.next().map(|time| {
                let time = time.chars().map(|v| v as i32).collect::<Vec<i32>>();
                (time[0] * 10 + time[1]) * 60 + time[3] * 10 + time[4]
            });
            if key_name.is_none() {
                break;
            }
            let list = m.entry(key_name.unwrap()).or_insert(Vec::new());
            list.push(key_time.unwrap());
        }
        let mut ans = Vec::new();
        for (k, mut v) in m {
            v.sort();
            for i in 2..v.len() {
                if v[i] - v[i - 2] <= 60 {
                    ans.push(k);
                    break;
                }
            }
        }
        ans.sort();
        ans
    }
}
