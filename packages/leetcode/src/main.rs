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
    pub fn remove_zero_sum_sublists(head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        let tmp = head.clone();
        let mut h = Box::new(ListNode::new(0));
        h.next = head;
        let mut sums = vec![1];
        let mut p = &mut h;
        let (mut start, mut end) = (usize::MAX, usize::MAX);
        let mut find = false;
        while p.next.is_some() && !find {
            let next = p.next.as_mut().unwrap();
            let sum = next.val + sums.last().unwrap();
            for i in 0..sums.len() - 1 {
                if sum - sums[i] == 0 {
                    start = i;
                    end = sums.len() - 1;
                    find = true;
                    break;
                }
            }
            p = next;
        }
        if start == usize::MAX {
            h.next
        } else {
            p = &mut h;
            for i in 0..start {
                p = p.next.as_mut().unwrap();
            }
            while end - start > 0 {
                let child = p.next.as_mut().unwrap().next.take();
                p.next = child;
                end -= 1;
            }
            Solution::remove_zero_sum_sublists(h.next)
        }
    }
}
