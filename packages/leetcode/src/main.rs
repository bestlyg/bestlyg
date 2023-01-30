mod preclude;

use std::borrow::Borrow;
use std::borrow::BorrowMut;
use std::char::MAX;

use preclude::*;
fn main() {
    let func = Solution::merge_in_between;
    // let res = func(55);
    // println!("res = {res:#?}");
}

impl Solution {
    pub fn merge_in_between(
        list1: Option<Box<ListNode>>,
        a: i32,
        b: i32,
        list2: Option<Box<ListNode>>,
    ) -> Option<Box<ListNode>> {
        let mut list = Vec::<i32>::new();
        let mut p1 = &list1;
        let mut p2 = &list2;
        for _ in 0..a {
            list.push(p1.as_ref().unwrap().val);
            p1 = &p1.as_ref().unwrap().next;
        }
        while let Some(ref node) = p2 {
            list.push(node.val);
            p2 = &node.next;
        }
        for _ in a..=b {
            p1 = &p1.as_ref().unwrap().next;
        }
        while let Some(ref node) = p1 {
            list.push(node.val);
            p1 = &node.next;
        }
        let mut ans = Box::new(ListNode::new(0));
        let mut p = &mut ans;
        for num in list {
            let mut node = p.as_mut();
            node.next = Some(Box::new(ListNode::new(num)));
            p = node.next.as_mut().unwrap();
        }
        ans.next
    }
}
