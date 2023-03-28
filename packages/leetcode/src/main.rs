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
    pub fn shortest_common_supersequence(str1: String, str2: String) -> String {
        let (str1, str2) = (
            str1.chars().collect::<Vec<char>>(),
            str2.chars().collect::<Vec<char>>(),
        );
        let (n1, n2) = (str1.len(), str2.len());
        let mut dp = vec![vec![0; n2 + 1]; n1 + 1];
        for i in 0..n1 {
            dp[i][0] = i;
        }
        for j in 0..n2 {
            dp[0][j] = j;
        }
        for i in 1..=n1 {
            for j in 1..=n2 {
                if str1[i - 1] == str2[j - 1] {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = dp[i - 1][j].min(dp[i][j - 1]) + 1;
                }
            }
        }
        let mut s = vec![];
        let (mut i, mut j) = (n1, n2);
        while i > 0 && j > 0 {
            if str1[i - 1] == str2[j - 1] {
                s.push(*&str1[i - 1]);
                i -= 1;
                j -= 1;
            } else {
                if dp[i - 1][j] < dp[i][j - 1] {
                    s.push(*&str1[i - 1]);
                    i -= 1;
                } else {
                    s.push(*&str2[j - 1]);
                    j -= 1;
                }
            }
        }
        s = s.into_iter().rev().collect();
        println!("{:#?}, {:#?}, {:#?}", &str1[0..i], &str2[0..j], &s[..]);
        String::from_utf8(
            [&str1[0..i], &str2[0..j], &s[..]]
                .concat()
                .into_iter()
                .map(|v| v as u8)
                .collect::<Vec<u8>>(),
        )
        .unwrap()
    }
}
