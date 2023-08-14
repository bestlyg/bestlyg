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
    pub fn merge_trees(
        root1: Option<Rc<RefCell<TreeNode>>>,
        root2: Option<Rc<RefCell<TreeNode>>>,
    ) -> Option<Rc<RefCell<TreeNode>>> {
        match root1 {
            None => root2,
            Some(mut root1) => match root2 {
                None => Some(root1),
                Some(root2) => {
                    {
                        let mut root1_ref = root1.as_ref().borrow_mut();
                        let mut root2_ref = root2.as_ref().borrow_mut();
                        root1_ref.val += root2_ref.val;
                        {
                            let child1 = root1_ref.left.take();
                            let child2 = root2_ref.left.take();
                            root1_ref.left = Self::merge_trees(child1, child2);
                        }
                        {
                            let child1 = root1_ref.right.take();
                            let child2 = root2_ref.right.take();
                            root1_ref.right = Self::merge_trees(child1, child2);
                        }
                    }
                    Some(root1)
                }
            },
        }
    }
}
