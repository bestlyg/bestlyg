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
fn find(node: Option<&Rc<RefCell<TreeNode>>>) -> Vec<i32> {
    let mut res = vec![0, 0];
    if let Some(node) = node {
        let node_ref = node.as_ref().borrow();
        let l = find(node_ref.left.as_ref());
        let r = find(node_ref.right.as_ref());
        res[1] = l[0] + r[0] + node_ref.val;
        res[0] = l.into_iter().max().unwrap() + r.into_iter().max().unwrap();
    }
    res
}
impl Solution {
    pub fn rob(root: Option<Rc<RefCell<TreeNode>>>) -> i32 {
        let node = root.as_ref();
        find(root.as_ref()).into_iter().max().unwrap()
    }
}
