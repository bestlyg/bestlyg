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

fn gcd(a: i32, b: i32) -> i32 {
    if a < b {
        gcd(b, a)
    } else if b == 0 {
        a
    } else {
        gcd(b, a % b)
    }
}
impl Solution {
    pub fn insert_greatest_common_divisors(head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        let mut head = head.unwrap();
        let mut p = &mut head;
        while let Some(mut next) = p.next.take() {
            let mut new_next = Box::new(ListNode::new(gcd(p.val, next.val)));
            new_next.next = Some(next);
            p.next = Some(new_next);
            
            let next = p.next.as_mut().unwrap().next.as_mut().unwrap();
            p = next;
        }
        Some(head)
    }
}
