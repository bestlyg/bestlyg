mod preclude;

use core::num;

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

struct TrieNode {
    left: Option<Box<TrieNode>>,
    right: Option<Box<TrieNode>>,
}
impl TrieNode {
    fn new() -> Self {
        Self {
            left: None,
            right: None,
        }
    }
}

fn add(mut node: &mut Box<TrieNode>, num: i32) {
    let mut pos = 30;
    while pos >= 0 {
        let v = (num >> pos) & 1;
        if v != 0 {
            if node.left.is_none() {
                node.left = Some(Box::new(TrieNode::new()));
            }
            node = node.left.as_mut().unwrap()
        } else {
            if node.right.is_none() {
                node.right = Some(Box::new(TrieNode::new()));
            }
            node = node.right.as_mut().unwrap()
        }
        pos -= 1;
    }
}

fn find(mut node: &Box<TrieNode>, num: i32) -> i32 {
    let mut pos = 30;
    let mut ans = 0;
    let mut node = Some(node);
    while pos >= 0 && node.is_some() {
        let node_ref = node.unwrap();
        let v = (num >> pos) & 1;
        if v != 0 {
            if node_ref.right.is_some() {
                ans |= 1 << pos;
                node = Some(node_ref.right.as_ref().unwrap());
            } else if node_ref.left.is_some() {
                node = Some(node_ref.left.as_ref().unwrap());
            } else {
                node = None;
            }
        } else {
            if node_ref.left.is_some() {
                ans |= 1 << pos;
                node = Some(node_ref.left.as_ref().unwrap());
            } else if node_ref.right.is_some() {
                node = Some(node_ref.right.as_ref().unwrap());
            } else {
                node = None;
            }
        }
    }
    ans
}

impl Solution {
    pub fn find_maximum_xor(nums: Vec<i32>) -> i32 {
        let mut root = Box::new(TrieNode::new());
        let mut ans = 0;
        for num in &nums {
            add(&mut root, *num);
        }
        for num in &nums {
            ans = ans.max(find(&root, *num));
        }
        ans
    }
}
