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

fn swap(
    node: Option<Box<ListNode>>,
    cnt: usize,
    max_cnt: usize,
) -> (Option<Box<ListNode>>, Option<Box<ListNode>>) {
    match node {
        None => (None, None),
        Some(mut node) => {
            if cnt == max_cnt {
                let next = node.next.take();
                node.next = swap(next, 1, max_cnt).0;
            }
        }
    }
}

impl Solution {
    pub fn swap_pairs(head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        swap(head, 1, 2).0
    }
}
