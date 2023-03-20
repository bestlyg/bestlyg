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
    pub fn num_dup_digits_at_most_n(n: i32) -> i32 {
        let sn = format!("{}", n).chars().collect::<Vec<char>>();
        let mut m = vec![vec![-1; 1 << 10]; sn.len()];
        fn dfs(
            sn: &Vec<char>,
            m: &mut Vec<Vec<i32>>,
            idx: usize,
            mask: usize,
            limit: bool,
            empty: bool,
        ) -> i32 {
            if idx == sn.len() {
                if empty {
                    0
                } else {
                    1
                }
            } else if !limit && !empty && m[idx][mask] != -1 {
                m[idx][mask]
            } else {
                let mut res = if empty {
                    dfs(sn, m, idx + 1, mask, false, true)
                } else {
                    0
                };
                let nmax = if limit {
                    sn[idx] as usize - '0' as usize
                } else {
                    9
                };
                for j in (if empty { 1 } else { 0 })..=nmax {
                    if (mask & (1 << j)) == 0 {
                        res += dfs(sn, m, idx + 1, mask | (1 << j), limit && j == nmax, false);
                    }
                }
                m[idx][mask] = res;
                res
            }
        }
        return n - dfs(&sn, &mut m, 0, 0, true, true);
    }
}
