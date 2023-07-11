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
    pub fn max_alternating_sum(nums: Vec<i32>) -> i64 {
        let mut odd = 0;
        let mut even = nums[0] as i64;
        for i in 1..nums.len() {
            even = even.max(odd - nums[i] as i64);
            odd = odd.max(even + nums[i] as i64);
        }
        even
    }
}
