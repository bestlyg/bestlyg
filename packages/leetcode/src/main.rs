mod preclude;

use std::borrow::Borrow;
use std::borrow::BorrowMut;
use std::char::MAX;
use std::hash::Hash;
use std::ops::BitAnd;

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

fn get_primes(max: usize) -> Vec<usize> {
    let mut primes = vec![0; max];
    for i in 2..max {
        if primes[i] == 0 {
            primes[0] += 1;
            let idx = primes[0];
            primes[idx] = i;
        }
        for j in 1..=primes[0] {
            let idx = i * primes[j];
            if idx >= max {
                break;
            }
            primes[idx] = 1;
            if i % primes[j] == 0 {
                break;
            }
        }
    }
    primes
}

impl Solution {
    pub fn merge_stones(stones: Vec<i32>, k: i32) -> i32 {
        let n = stones.len();
        let k = k as usize;
        if (n - k) % (k - 1) != 0 {
            return -1;
        }
        let mut dp = vec![vec![-1; n]; n];
        let mut sums = vec![-1];
        for s in stones {
            sums.push(*sums.last().unwrap() + s);
        }

        fn dfs(dp: &mut Vec<Vec<i32>>, sums: &Vec<i32>, k: usize, start: usize, end: usize) -> i32 {
            if start == end {
                0
            } else if dp[start][end] != -1 {
                dp[start][end]
            } else {
                let mut res = i32::MAX;
                let mut m = start;
                while m < end {
                    res = res.min(dfs(dp, sums, k, start, m) + dfs(dp, sums, k, m + 1, end));
                    m += k - 1;
                }
                if (end - start) % (k - 1) == 0 {
                    res += sums[end + 1] - sums[start];
                }
                dp[start][end] = res;
                res
            }
        }
        return dfs(&mut dp, &sums, k, 0, n - 1);
    }
}
