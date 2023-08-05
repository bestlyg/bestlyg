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
    pub fn merge_two_lists(
        mut list1: Option<Box<ListNode>>,
        mut list2: Option<Box<ListNode>>,
    ) -> Option<Box<ListNode>> {
        let mut head = ListNode::new(0);
        let mut p = &mut head;
        while list1.is_some() || list2.is_some() {
            println!("list1 = {}", list1.as_ref().unwrap_or_default().val);
            println!("list2 = {}", list1.as_ref().unwrap_or_default().val);
            if list2.is_none()
                || list1.is_some() && list1.as_ref().unwrap().val <= list2.as_ref().unwrap().val
            {
                let mut node = list1.take().unwrap();
                let next = node.next.take();
                p.next = list1;
                list1 = next;
            } else {
                let mut node = list2.take().unwrap();
                let next = node.next.take();
                p.next = list2;
                list2 = next;
            }
            p = p.next.as_mut().unwrap();
        }
        head.next
    }
}
