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
    pub fn check_palindrome_formation(a: String, b: String) -> bool {
        let check = |s: &[char]| {
            let (mut l, mut r) = (0, s.len() - 1);
            while l < r {
                if s[l] != s[r] {
                    return false;
                }
                l += 1;
                r -= 1;
            }
            true
        };
        let a = a.chars().collect::<Vec<char>>();
        let b = b.chars().collect::<Vec<char>>();
        let (n, mut cnt) = (a.len(), 0);
        while cnt < n && a[cnt] == b[n - 1 - cnt] {
            cnt += 1;
        }
        if cnt >= n / 2 || check(&a[cnt..n - cnt]) || check(&b[cnt..n - cnt]) {
            return true;
        }
        cnt = 0;
        while cnt < n && b[cnt] == a[n - 1 - cnt] {
            cnt += 1;
        }
        if cnt >= n / 2 || check(&a[cnt..n - cnt]) || check(&b[cnt..n - cnt]) {
            return true;
        }
        false
    }
}
