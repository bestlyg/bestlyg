mod preclude;

use std::borrow::Borrow;
use std::borrow::BorrowMut;
use std::char::MAX;
use std::hash::Hash;

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

const dirs: [[i32; 2]; 4] = [[0, 1], [0, -1], [1, 0], [-1, 0]];

use std::cell::RefCell;
use std::collections::HashMap;
use std::rc::Rc;
#[derive(Clone, PartialEq, Eq, Ord)]
struct Node {
    row: usize,
    col: usize,
    time: i32,
}
impl Node {
    fn new(row: usize, col: usize, time: i32) -> Self {
        Node { row, col, time }
    }
}
impl PartialOrd for Node {
    fn partial_cmp(&self, o: &Self) -> Option<std::cmp::Ordering> {
        self.time.partial_cmp(&o.time)
    }
}

impl Solution {
    pub fn check_arithmetic_subarrays(nums: Vec<i32>, l: Vec<i32>, r: Vec<i32>) -> Vec<bool> {
        let check = |i| -> bool {
            let (left, right) = (l[i] as usize, r[i] as usize);
            let size = right - left;
            let (nmax, nmin) = (
                *nums[left..=right].iter().max().unwrap(),
                *nums[left..=right].iter().min().unwrap(),
            );
            if (nmax - nmin) % (size as i32) != 0 {
                false
            } else if nmax == nmin {
                true
            } else {
                let step = (nmax - nmin) / (size as i32);
                println!("l = {left}, r = {right}, min = {nmin}, max=  {nmax}, size= {size}, step = {step}");
                let mut arr = vec![false; (size + 1) as usize];
                for i in left..=right {
                    let val = ((nums[i] - nmin) / step) as usize;
                    println!("i={i},step={step},val={val}");
                    if (nums[i] - nmin) % step != 0 || arr[val] {
                        return false;
                    }
                    arr[val] = true;
                }
                true
            }
        };
        (0..l.len()).map(|i| check(i)).collect::<Vec<bool>>()
    }
}

// pub use std::{cell::RefCell, rc::Rc}
struct TrieNode {
    end: bool,
    fail: Option<Rc<RefCell<TrieNode>>>,
    children: Vec<Option<Rc<RefCell<TrieNode>>>>,
}
impl TrieNode {
    fn new() -> Rc<RefCell<Self>> {
        Rc::new(RefCell::new(Self {
            end: false,
            fail: None,
            children: vec![None; 26],
        }))
    }
}
struct StreamChecker {
    root: Rc<RefCell<TrieNode>>,
    current: Rc<RefCell<TrieNode>>,
}
impl StreamChecker {
    fn new(words: Vec<String>) -> Self {
        let root = TrieNode::new();
        let current = root.clone();
        for word in words {
            let mut node = root.clone();
            for c in word.chars() {
                let idx = c as usize - 'a' as usize;
                let node_ref = node.as_ref();
                {
                    let mut node = node_ref.borrow_mut();
                    if node.children[idx].is_none() {
                        node.children[idx] = Some(TrieNode::new());
                    }
                }
                let next_node = node_ref.borrow().children[idx].clone().unwrap();
                node = next_node;
            }
            node.as_ref().borrow_mut().end = true;
        }
        let mut q = std::collections::VecDeque::<Rc<RefCell<TrieNode>>>::new();
        {
            let mut root_ref = root.as_ref().borrow_mut();
            for i in 0..26 {
                if root_ref.children[i].is_some() {
                    q.push_back(root_ref.children[i].clone().unwrap());
                    root_ref.children[i]
                        .clone()
                        .unwrap()
                        .as_ref()
                        .borrow_mut()
                        .fail = Some(root.clone());
                } else {
                    root_ref.children[i] = Some(root.clone());
                }
            }
        }
        while !q.is_empty() {
            let node = q.pop_front().unwrap();
            {
                let node = node.as_ref();
                let end = node.borrow().end;
                node.borrow_mut().end =
                    end || node.borrow().fail.as_ref().unwrap().as_ref().borrow().end;
            }
            for i in 0..26 {
                let node = node.as_ref();
                let fail_node = node
                    .borrow()
                    .fail
                    .as_ref()
                    .unwrap()
                    .as_ref()
                    .borrow()
                    .children[i]
                    .clone();
                if node.borrow().children[i].is_some() {
                    q.push_back(node.borrow().children[i].clone().unwrap());
                    let child = node.borrow().children[i].clone().unwrap();
                    child.as_ref().borrow_mut().fail = fail_node.clone();
                } else {
                    node.borrow_mut().children[i] = fail_node.clone();
                }
            }
        }
        Self { root, current }
    }

    fn query(&mut self, letter: char) -> bool {
        let current = self.current.as_ref();
        let next = current.borrow().children[letter as usize - 'a' as usize]
            .as_ref()
            .unwrap()
            .clone();
        self.current = next;
        self.current.as_ref().borrow().end
    }
}
