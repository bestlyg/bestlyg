mod preclude;

use core::num;

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
use std::rc::Rc;
impl Solution {
    pub fn bst_to_gst(mut root: Option<Rc<RefCell<TreeNode>>>) -> Option<Rc<RefCell<TreeNode>>> {
        let mut sums = 0;
        fn dfs(node: &mut Option<Rc<RefCell<TreeNode>>>, sums: &mut i32) {
            if let Some(node) = node {
                let mut node_ref = node.as_ref().borrow_mut();
                dfs(&mut node_ref.right, sums);
                *sums += node_ref.val;
                node_ref.val = *sums;
                dfs(&mut node_ref.left, sums);
            }
        }
        dfs(&mut root, &mut sums);
        root
    }
}
