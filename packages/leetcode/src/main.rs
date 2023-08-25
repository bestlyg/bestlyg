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
    pub fn good_nodes(root: Option<Rc<RefCell<TreeNode>>>) -> i32 {
        let mut res = 0;
        fn dfs(res: &mut i32, node: &Option<Rc<RefCell<TreeNode>>>, mut max: i32) {
            if let Some(ref node) = node {
                let node_ref = node.as_ref().borrow();
                if node_ref.val >= max {
                    max = node_ref.val;
                    *res += 1;
                }
                dfs(res, &node_ref.left, max);
                dfs(res, &node_ref.right, max);
            }
        }
        dfs(&mut res, &root, i32::MIN);
        res
    }
}
