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
    pub fn delete_duplicates(head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        let mut tmp_head = Box::new(ListNode::new(0));
        tmp_head.next = head;
        let mut p = &tmp_head;
        let mut map = [0; 300];
        while let Some(ref next) = p.next {
            map[(next.val + 100) as usize] += 1;
            p = next;
        }
        let mut p = &mut tmp_head;
        while let Some(next) = p.next.take() {
            if map[(next.val + 100) as usize] > 1 {
                p.next = next.next;
            } else {
                p.next = Some(next);
                p = p.next.as_mut().unwrap();
            }
        }
        tmp_head.next.take()
    }
}
