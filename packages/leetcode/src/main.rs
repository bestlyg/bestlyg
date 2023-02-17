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
    pub fn largest1_bordered_square(grid: Vec<Vec<i32>>) -> i32 {
        const MAX: usize = 105;
        let n = grid.len();
        let m = grid[0].len();
        let mut cnt = 0;
        let mut cache = [[[0; 4]; MAX]; MAX];
        for i in 0..n {
            cnt = 0;
            for j in 0..m {
                cache[i][j][0] = cnt;
                cnt = if grid[i][j] == 1 { cnt + 1 } else { 0 };
            }
            cnt = 0;
            for j in (0..m).rev() {
                cache[i][j][1] = cnt;
                cnt = if grid[i][j] == 1 { cnt + 1 } else { 0 };
            }
        }
        for j in 0..m {
            cnt = 0;
            for i in 0..n {
                cache[i][j][2] = cnt;
                cnt = if grid[i][j] == 1 { cnt + 1 } else { 0 };
            }
            cnt = 0;
            for i in (0..n).rev() {
                cache[i][j][3] = cnt;
                cnt = if grid[i][j] == 1 { cnt + 1 } else { 0 };
            }
        }
        cnt = 0;
        for i in 0..n {
            for j in 0..m {
                if grid[i][j] == 0 {
                    continue;
                }
                cnt = cnt.max(1);
                for k in 1..=cache[i][j][1].min(cache[i][j][3]) {
                    if cache[i + k][j][1] >= k && cache[i][j + k][3] >= k {
                        cnt = cnt.max((k + 1).pow(2));
                    }
                }
            }
        }
        cnt as i32
    }
}
