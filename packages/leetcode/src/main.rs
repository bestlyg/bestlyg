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

impl Solution {
    pub fn remove_nodes(head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        let mut max = 0;
        fn dfs(node: Option<Box<ListNode>>, max: &mut i32) -> Option<Box<ListNode>> {
            match node {
                None => None,
                Some(mut node) => {
                    node.next = dfs(node.next.take(), max);
                    if *max > node.val {
                        node.next.take()
                    } else {
                        *max = node.val;
                        Some(node)
                    }
                }
            }
        }
        dfs(head, &mut max)
    }
}
