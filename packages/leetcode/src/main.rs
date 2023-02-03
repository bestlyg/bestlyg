mod preclude;

use std::borrow::Borrow;
use std::borrow::BorrowMut;
use std::char::MAX;

use preclude::*;
fn main() {
    let func = Solution::btree_game_winning_move;
    // let res = func(3, vec![vec![0, 1], vec![0, 2]], vec![vec![1, 0]]);
    // println!("res = {res:#?}");
}


use std::cell::RefCell;
use std::rc::Rc;
#[derive(Clone)]
struct Node {
    cnt: i32,
    lcnt: i32,
    rcnt: i32,
    p: Option<Rc<RefCell<TreeNode>>>,
}
impl Node {
    fn new() -> Self {
        Self {
            cnt: 0,
            lcnt: 0,
            rcnt: 0,
            p: None,
        }
    }
}

impl Solution {
    pub fn btree_game_winning_move(root: Option<Rc<RefCell<TreeNode>>>, n: i32, x: i32) -> bool {
        let val = root.as_ref().unwrap().as_ref().borrow().val as usize;
        let x = x as usize;
        let n = n as usize;
        let list = vec![Node::new(); n + 1];
        let mut parent = -1;
        let (list, _) = Solution::dfs(list, root, &mut parent, -1, x as i32);
        let mut ans = false;
        if parent != -1 {
            ans |= list[val].cnt - list[x].cnt > list[x].cnt;
        }
        let child = &list[x].p.as_ref().unwrap().as_ref().borrow().left;
        if child.is_some() {
            let lval = child.as_ref().unwrap().as_ref().borrow().val as usize;
            ans |= list[val].cnt - list[lval].cnt < list[lval].cnt;
        }
        let child = &list[x].p.as_ref().unwrap().as_ref().borrow().right;
        if child.is_some() {
            let rval = child.as_ref().unwrap().as_ref().borrow().val as usize;
            ans |= list[val].cnt - list[rval].cnt < list[rval].cnt;
        }
        ans
    }
    fn dfs(
        list: Vec<Node>,
        root: Option<Rc<RefCell<TreeNode>>>,
        parent: *mut i32,
        cur_parent: i32,
        x: i32,
    ) -> (Vec<Node>, i32) {
        match root {
            Some(root) => {
                let mut list = list;
                let root_node = root.as_ref().borrow();
                if root_node.val == x {
                    unsafe {
                        *parent = cur_parent;
                    }
                }
                let val = root_node.val as usize;
                list[val].p = Some(root.clone());
                let (mut list, cnt) =
                    Solution::dfs(list, root_node.left.clone(), parent, root_node.val, x);
                list[val].lcnt = cnt;
                let (mut list, cnt) =
                    Solution::dfs(list, root_node.right.clone(), parent, root_node.val, x);
                list[val].rcnt = cnt;
                list[val].cnt = list[val].lcnt + list[val].rcnt + 1;
                let cnt = list[val].cnt;
                (list, cnt)
            }
            None => (list, 0),
        }
    }
}
