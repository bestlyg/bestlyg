mod preclude;

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
fn dfs(node: &mut Option<Rc<RefCell<TreeNode>>>, limit: i32, mut sum: i32) -> bool {
    match node {
        None => true,
        Some(ref node) => {
            let mut nodeRef = node.as_ref().borrow_mut();
            sum += nodeRef.val;
            let l = dfs(&mut nodeRef.left, limit, sum);
            let r = dfs(&mut nodeRef.right, limit, sum);
            if nodeRef.left.is_none() && nodeRef.right.is_none() && sum < limit
                || nodeRef.left.is_none() && !r
                || nodeRef.right.is_none() && !l
                || !l && !r
            {
                false
            } else {
                if !l {
                    nodeRef.left = None;
                }
                if !r {
                    nodeRef.right = None;
                }
                true
            }
        }
    }
}
impl Solution {
    pub fn sufficient_subset(
        mut root: Option<Rc<RefCell<TreeNode>>>,
        limit: i32,
    ) -> Option<Rc<RefCell<TreeNode>>> {
        if dfs(&mut root, limit, 0) {
            root
        } else {
            None
        }
    }
}
