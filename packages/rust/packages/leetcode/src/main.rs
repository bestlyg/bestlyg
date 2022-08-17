mod preclude;
use preclude::*;
fn main() {}

use std::borrow::Borrow;
use std::cell::RefCell;
use std::collections::VecDeque;
use std::rc::Rc;
impl Solution {
    pub fn deepest_leaves_sum(root: Option<Rc<RefCell<TreeNode>>>) -> i32 {
        let root = root.unwrap();
        let mut q = VecDeque::<Rc<RefCell<TreeNode>>>::new();
        q.push_back(root.clone());
        let mut ans = root.as_ref().borrow().val;
        let mut cur = 0;
        let mut size = 1;
        while !q.is_empty() {
            let node = q.pop_front().unwrap();
            let node = node.as_ref().borrow();
            if node.left.is_some() {
                cur += node.left.as_ref().unwrap().as_ref().borrow().val;
                q.push_back(node.left.as_ref().unwrap().clone());
            }
            if node.right.is_some() {
                cur += node.right.as_ref().unwrap().as_ref().borrow().val;
                q.push_back(node.right.as_ref().unwrap().clone());
            }
            size -= 1;
            if size == 0 {
                size = q.len();
                if size != 0 {
                    ans = cur;
                }
                cur = 0;
            }
        }
        ans
    }
}
