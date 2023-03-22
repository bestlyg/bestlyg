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
    pub fn best_team_score(scores: Vec<i32>, ages: Vec<i32>) -> i32 {
        let (n, mut res) = (scores.len(), 0);
        let mut idx = (0..n).collect::<Vec<usize>>();
        idx.sort_by(|a, b| {
            if ages[*a] != ages[*b] {
                ages[*a].cmp(&ages[*b])
            } else {
                scores[*a].cmp(&scores[*b])
            }
        });
        let mut dp = vec![0; n];
        for i in 0..n as i32 {
            for j in ((0i32)..=(i - 1)).rev() {
                let (i, j) = (i as usize, j as usize);
                if ages[idx[i]] == ages[idx[j]]
                    || ages[idx[i]] > ages[idx[j]] && scores[idx[i]] >= scores[idx[j]]
                {
                    dp[i] = dp[i].max(dp[j]);
                }
            }

            dp[i as usize] += scores[idx[i as usize]];
            res = res.max(dp[i as usize]);
        }
        res
    }
}
