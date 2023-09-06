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
impl Solution {
    pub fn lca_deepest_leaves(
        root: Option<Rc<RefCell<TreeNode>>>,
    ) -> Option<Rc<RefCell<TreeNode>>> {
        fn dfs(node: Rc<RefCell<TreeNode>>, level: usize) -> (usize, Rc<RefCell<TreeNode>>) {
            let mut res = (level, node.clone());
            let node_ref = node.as_ref().borrow();
            if let Some(ref left) = node_ref.left {
                res = dfs(left.clone(), level + 1);
            }
            if let Some(ref right) = node_ref.right {
                let rres = dfs(right.clone(), level + 1);
                if rres.0 > res.0 {
                    res = rres;
                } else if rres.0 == res.0 {
                    res.1 = node.clone();
                }
            }
            res
        }
        Some(dfs(root.unwrap().clone(), 0).1)
    }
}
