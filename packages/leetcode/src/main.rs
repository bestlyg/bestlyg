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
    pub fn find_lex_smallest_string(s: String, a: i32, b: i32) -> String {
        let mut set = std::collections::BTreeSet::<String>::new();
        set.insert(s.clone());
        let mut q = std::collections::VecDeque::<String>::new();
        q.push_back(s.clone());
        let t1 = |s: String| -> String {
            let mut s = s.chars().map(|v| v as u8).collect::<Vec<u8>>();
            let mut i = 1;
            while i < s.len() {
                s[i] = (s[i] - '0' as u8 + a as u8) % 10 + '0' as u8;
                i += 2;
            }
            String::from_utf8(s).unwrap()
        };
        let t2 = |s: String| -> String {
            let s = s.chars().collect::<Vec<char>>();
            let s1 = &s[s.len() - b as usize..];
            let s2 = &s[0..s.len() - b as usize];
            let s1 = String::from_utf8(s1.iter().map(|v| *v as u8).collect::<Vec<u8>>()).unwrap();
            let s2 = String::from_utf8(s2.iter().map(|v| *v as u8).collect::<Vec<u8>>()).unwrap();
            [s1, s2].concat()
        };
        while !q.is_empty() {
            let cur = q.pop_front().unwrap();
            let (n1, n2) = (t1(cur.clone()), t2(cur.clone()));
            if !set.contains(&n1) {
                set.insert(n1.clone());
                q.push_front(n1.clone());
            }
            if !set.contains(&n2) {
                set.insert(n2.clone());
                q.push_front(n2.clone());
            }
        }
        set.into_iter().next().unwrap()
    }
}
