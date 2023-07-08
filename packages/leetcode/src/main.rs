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
    pub fn two_sum(numbers: Vec<i32>, target: i32) -> Vec<i32> {
        let n = numbers.len();
        for i in 0..n {
            let mut l = i + 1;
            let mut r = n;
            while l < r {
                let m = (l + r) / 2;
                let val = numbers[i] + numbers[m];
                if val < target {
                    l = m + 1;
                } else {
                    r = m;
                }
            }
            if l != n && numbers[i] + numbers[l] == target {
                return vec![(i as i32) + 1, (l as i32) + 1];
            }
        }
        return vec![];
    }
}
