mod preclude;

use preclude::*;
fn main() {}

use std::cell::RefCell;
use std::collections::VecDeque;
use std::rc::Rc;
impl Solution {
    pub fn width_of_binary_tree(root: Option<Rc<RefCell<TreeNode>>>) -> i32 {
        let root = root.unwrap();
        let mut q = VecDeque::<(i32, Rc<RefCell<TreeNode>>)>::new();
        q.push_back((0, root.clone()));
        let mut ans = 1_i32;
        let mut size = 1;
        while !q.is_empty() {
            let (idx, node) = q.pop_front().unwrap();
            if node.as_ref().borrow().left.is_some() {
                q.push_back((
                    idx * 2 + 1,
                    node.as_ref().borrow().left.as_ref().unwrap().clone(),
                ));
            }
            if node.as_ref().borrow().right.is_some() {
                q.push_back((
                    idx * 2 + 2,
                    node.as_ref().borrow().right.as_ref().unwrap().clone(),
                ));
            }
            size -= 1;
            if size == 0 {
                size = q.len();
                if !q.is_empty() {
                    println!(
                        "size = {}, front_idx = {}, back_idx = {}, ans = {}",
                        q.len(),
                        q.front().unwrap().0,
                        q.back().unwrap().0,
                        ans
                    );
                    ans = ans.max(q.back().unwrap().0 - q.front().unwrap().0);
                }
            }
        }
        ans
    }
}
