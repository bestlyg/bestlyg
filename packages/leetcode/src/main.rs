mod preclude;

use std::borrow::Borrow;
use std::borrow::BorrowMut;
use std::char::MAX;
use std::cmp;
use std::cmp::Ordering;
use std::hash::Hash;
use std::mem::swap;
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

fn str_to_vec(s: &String) -> Vec<char> {
    s.chars().collect()
}

fn gcd(a: i32, b: i32) -> i32 {
    if a < b {
        gcd(b, a)
    } else if b == 0 {
        a
    } else {
        gcd(b, a % b)
    }
}

fn get_sums(arr: &Vec<i32>) -> Vec<i32> {
    let mut sums = vec![0];
    for num in arr {
        sums.push(sums.last().unwrap() + *num);
    }
    sums
}

// use std::cmp::Ordering;

#[derive(PartialEq)]
struct RevUnsize(usize);
impl Eq for RevUnsize {}

impl PartialOrd for RevUnsize {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        other.0.partial_cmp(&self.0)
    }
}
impl Ord for RevUnsize {
    fn cmp(&self, other: &RevUnsize) -> Ordering {
        other.0.partial_cmp(&self.0).unwrap()
    }
}

fn sort3(a: &mut i32, b: &mut i32, c: &mut i32) {
    use std::ptr::swap;
    unsafe {
        if a > c {
            swap(a, c);
        }
        if a > b {
            swap(a, b);
        }
        if b > c {
            swap(b, c);
        }
    };
}

impl Solution {
    pub fn min_increments(n: i32, cost: Vec<i32>) -> i32 {
        let level = (n as f32).log2() as u32;
        let mut res = 0;
        fn dfs(cost: &Vec<i32>, level: u32, res: &mut i32, root: usize, l: u32) -> i32 {
            if l == level {
                cost[root]
            } else {
                let left = dfs(cost, level, res, root * 2 + 1, l + 1);
                let right = dfs(cost, level, res, root * 2 + 2, l + 1);
                if left == right {
                    left + cost[root]
                } else {
                    *res += (right - left).abs();
                    left.max(right) + cost[root]
                }
            }
        }
        dfs(&cost, level, &mut res, 0, 1);
        res
    }
}
