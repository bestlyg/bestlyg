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

static NoVal: i32 = i32::MIN;
#[derive(Debug, Clone)]
struct Node {
    l: i32,
    r: i32,
    sum: i32,
}
impl Node {
    fn new(l: i32, r: i32, sum: i32) -> Node {
        Node { l, r, sum }
    }
    fn no() -> Node {
        Node {
            l: NoVal,
            r: 0,
            sum: 0,
        }
    }
}
use std::cell::RefCell;
use std::rc::Rc;
impl Solution {
    pub fn max_sum_bst(root: Option<Rc<RefCell<TreeNode>>>) -> i32 {
        let mut res = 0;
        dfs(&mut res, &root);
        res
    }
}
fn dfs(res: &mut i32, node: &Option<Rc<RefCell<TreeNode>>>) -> Node {
    match node {
        Some(node) => {
            let nodeRef = node.as_ref().borrow();
            let val = nodeRef.val;
            let (mut lv, mut rv) = (dfs(res, &nodeRef.left), dfs(res, &nodeRef.right));
            if nodeRef.left.is_none() && nodeRef.right.is_none() {
                *res = (*res).max(val);
                Node::new(val, val, val)
            } else if nodeRef.left.is_none() {
                if rv.l == NoVal {
                    Node::no()
                } else if val >= rv.l {
                    Node::no()
                } else {
                    rv.l = val;
                    rv.sum += val;
                    *res = (*res).max(rv.sum);
                    rv
                }
            } else if nodeRef.right.is_none() {
                if lv.l == NoVal {
                    Node::no()
                } else if lv.r >= val {
                    Node::no()
                } else {
                    lv.r = val;
                    lv.sum += val;
                    *res = (*res).max(lv.sum);
                    lv
                }
            } else {
                if lv.l == NoVal || rv.l == NoVal {
                    Node::no()
                } else if lv.r >= val {
                    Node::no()
                } else if val >= rv.l {
                    Node::no()
                } else {
                    let next = Node::new(lv.l, rv.r, lv.sum + rv.sum + val);
                    *res = (*res).max(next.sum);
                    next
                }
            }
        }
        None => Node::no(),
    }
}
