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

fn get_len(l: &Option<Box<ListNode>>) -> usize {
    match l {
        Some(ref node) => get_len(&node.next),
        None => 0,
    }
}

fn dfs(
    mut l1: Option<Box<ListNode>>,
    mut l2: Option<Box<ListNode>>,
) -> (i32, Option<Box<ListNode>>) {
    if l1.is_none() {
        (0, l2)
    } else if l2.is_none() {
        (0, l1)
    } else {
        let node1 = l1.as_mut().unwrap();
        let node2 = l2.as_mut().unwrap();
        let (mut add, next) = dfs(node1.next.take(), node2.next.take());
        node1.val += node2.val + add;
        node1.next = next;
        add = 0;
        if node1.val >= 10 {
            node1.val -= 10;
            add = 1;
        }
        (add, l1)
    }
}

impl Solution {
    pub fn add_two_numbers(
        mut l1: Option<Box<ListNode>>,
        mut l2: Option<Box<ListNode>>,
    ) -> Option<Box<ListNode>> {
        let (mut len1, mut len2) = (get_len(&l1), get_len(&l2));
        if len2 > len1 {
            std::mem::swap(&mut len1, &mut len2);
            std::mem::swap(&mut l1, &mut l2);
        }
        while len1 > len2 {
            let mut head = Box::new(ListNode::new(0));
            head.next = l2.take();
            l2 = Some(head);
            len2 += 1;
        }

        let (add, mut node) = dfs(l1, l2);
        if add != 0 {
            let mut head = Box::new(ListNode::new(1));
            let next = node.take();
            head.next = next;
            node = Some(head);
        }
        node
    }
}
