mod preclude;

use std::borrow::Borrow;
use std::borrow::BorrowMut;
use std::char::MAX;
use std::cmp;
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
    pub fn smallest_sufficient_team(req_skills: Vec<String>, people: Vec<Vec<String>>) -> Vec<i32> {
        use std::collections::HashMap;
        let (n, m) = (req_skills.len(), people.len());
        let nmask = (1 << n) - 1;
        let mut keym = HashMap::<String, usize>::new();
        let mut i = 0;
        for key in req_skills {
            keym.insert(key, i);
            i += 1;
        }
        let mut dp: Vec<Vec<i32>> = vec![vec![]; 1 << n];
        for i in 0..m {
            let mut mask = 0;
            for key in people[i].iter() {
                mask |= 1 << keym.get(key).unwrap();
            }
            for pmask in 0..=nmask {
                let merged = mask | pmask;
                if merged == pmask
                    || pmask > 0 && dp[pmask].is_empty()
                    || !dp[merged].is_empty() && dp[merged].len() <= dp[pmask].len() + 1
                {
                    continue;
                }
                dp[merged] = dp[pmask].clone();
                dp[merged].push(i as i32);
            }
        }
        dp[nmask].clone()
    }
}
