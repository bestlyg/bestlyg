mod preclude;

use std::borrow::Borrow;
use std::borrow::BorrowMut;
use std::char::MAX;
use std::hash::Hash;

use preclude::*;
fn main() {
    let func = Solution::btree_game_winning_move;
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
use std::cell::RefCell;
use std::rc::Rc;
impl Solution {
    pub fn evaluate_tree(node: Option<Rc<RefCell<TreeNode>>>) -> bool {
        let node = node.unwrap();
        let node = node.as_ref().borrow();
        if node.val == 0 {
            return false;
        }
        if node.val == 1 {
            return true;
        }
        if node.left.is_some() && node.val == 2 {
            return Solution::evaluate_tree(node.left.clone()) || Solution::evaluate_tree(node.right.clone());
        }
        if node.left.is_some() && node.val == 3 {
            return Solution::evaluate_tree(node.left.clone()) && Solution::evaluate_tree(node.right.clone());
        }
        return false;
    }
}
