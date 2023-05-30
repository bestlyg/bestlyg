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
use std::collections::HashSet;
use std::ops::RangeBounds;
use std::rc::Rc;
type Res = Vec<Option<Rc<RefCell<TreeNode>>>>;
fn dfs(
    res: &mut Res,
    s: &HashSet<i32>,
    node: &mut Option<Rc<RefCell<TreeNode>>>,
    pd: bool,
) -> Option<Rc<RefCell<TreeNode>>> {
    match node {
        None => None,
        Some(ref node) => {
            let mut nodeRef = node.as_ref().borrow_mut();
            let d = s.contains(&nodeRef.val);
            if !d && pd {
                res.push(Some(node.clone()));
            }
            nodeRef.left = dfs(res, s, &mut nodeRef.left, d);
            nodeRef.right = dfs(res, s, &mut nodeRef.right, d);
            if pd || d {
                None
            } else {
                Some(node.clone())
            }
        }
    }
}

impl Solution {
    pub fn del_nodes(mut root: Option<Rc<RefCell<TreeNode>>>, to_delete: Vec<i32>) -> Res {
        let mut s = std::collections::HashSet::<i32>::new();
        for v in to_delete {
            s.insert(v);
        }
        let mut res: Res = vec![];
        dfs(&mut res, &s, &mut root, true);
        res
    }
}
