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

impl Solution {
    pub fn add_two_numbers(
        mut l1: Option<Box<ListNode>>,
        mut l2: Option<Box<ListNode>>,
    ) -> Option<Box<ListNode>> {
        let mut head = Box::new(ListNode::new(0));
        let mut p = &mut head;
        let mut p1 = &mut l1;
        let mut p2 = &mut l2;
        let mut add = 0;
        while p1.is_some() || p2.is_some() {
            let mut val = match p1 {
                Some(ref mut node) => {
                    p1 = &mut node.next;
                    node.val
                }
                None => 0,
            } + match p2 {
                Some(ref mut node) => {
                    p2 = &mut node.next;
                    node.val
                }
                None => 0,
            } + add;
            if val >= 10 {
                val -= 10;
                add = 1;
            } else {
                add = 0;
            }
            p.next = Some(Box::new(ListNode::new(val)));
            p = p.next.as_mut().unwrap();
        }
        if add != 0 {
            p.next = Some(Box::new(ListNode::new(1)));
        }
        head.next
    }
}
