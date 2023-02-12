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

use std::cell::RefCell;
use std::collections::HashMap;
use std::rc::Rc;
#[derive(Clone)]
struct Node {
    end: bool,
    children: HashMap<String, Node>,
}
impl Node {
    fn new() -> Self {
        Self {
            end: false,
            children: HashMap::new(),
        }
    }
}
impl Solution {
    pub fn minimum_score(s: String, t: String) -> i32 {
        let (s, t) = (
            s.chars().collect::<Vec<char>>(),
            t.chars().collect::<Vec<char>>(),
        );
        let (n, m) = (s.len(), t.len());
        let (mut pre, mut suf) = (vec![0; n], vec![m; n + 1]);
        let (mut i, mut p) = (0, 0);
        while i < n && p < m {
            if s[i] == t[p] {
                p += 1;
            }
            pre[i] = p;
            i += 1;
        }
        let (mut i, mut p) = ((n - 1) as i32, (m - 1) as i32);
        while i >= 0 && p >= 0 {
            if s[i as usize] == t[p as usize] {
                p -= 1;
            }
            suf[i as usize] = p as usize + 1;
            i -= 1;
        }
        let mut res = suf[0];
        for i in 0..n {
            if suf[i + 1] < pre[i] {
                return 0;
            }
            res = res.min(suf[i + 1] - pre[i]);
        }
        res as i32
    }
}
