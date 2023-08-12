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
use std::cmp::{Ord, Ordering, PartialOrd};
impl Ord for ListNode {
    fn cmp(&self, other: &Self) -> Ordering {
        self.val.cmp(&other.val)
    }
}
impl PartialOrd for ListNode {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        self.val.partial_cmp(&other.val)
    }
}

impl Solution {
    pub fn merge_k_lists(lists: Vec<Option<Box<ListNode>>>) -> Option<Box<ListNode>> {
        let mut head = Some(Box::new(ListNode::new(0)));
        let mut p = head.as_mut().unwrap();
        let mut q = std::collections::BinaryHeap::new();
        for node in lists {
            if let Some(node) = node {
                q.push(node);
            }
        }
        while let Some(mut node) = q.pop() {
            println!("{node:#?}");
            let next = node.next.take();
            p.next = Some(node);
            p = p.next.as_mut().unwrap();
            if let Some(next) = next {
                q.push(next);
            }
        }
        head.unwrap().next
    }
}
