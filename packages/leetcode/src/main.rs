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
    pub fn die_simulator(n: i32, roll_max: Vec<i32>) -> i32 {
        let n = n as usize;
        let MOD = 10i32.pow(9) + 7;
        let mut dp = vec![vec![vec![0; 16]; 6]; n + 1];
        for j in 0..6 {
            dp[1][j][1] = 1;
        }
        for i in 1..=n {
            for j in 0..6 {
                for k in 1..=roll_max[j] as usize {
                    for p in 0..6 {
                        if p != j {
                            dp[i][p][1] = (dp[i][p][1] + dp[i - 1][j][k]) % MOD;
                        } else if k + 1 <= roll_max[j] as usize {
                            dp[i][p][k + 1] = (dp[i][p][k + 1] + dp[i - 1][j][k]) % MOD;
                        }
                    }
                }
            }
        }
        let mut res = 0;
        for i in 0..6 {
            for j in 1..=roll_max[i] as usize {
                res = (res + dp[n][i][j]) % MOD;
            }
        }
        res
    }
}
