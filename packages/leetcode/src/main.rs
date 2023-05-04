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
    pub fn max_total_fruits(fruits: Vec<Vec<i32>>, start_pos: i32, k: i32) -> i32 {
        let mut res = 0;
        let mut l: Vec<Vec<i32>> = vec![];
        let mut r: Vec<Vec<i32>> = vec![];
        r.push(vec![-1, 0]);
        for mut item in fruits {
            item[0] -= start_pos;
            if item[0] < 0 {
                item[0] = -item[0];
                l.push(item);
            } else if item[0] > 0 {
                r.push(item);
            } else {
                res += item[1]
            }
        }
        l.push(vec![-1, 0]);
        l.reverse();
        l.push(vec![i32::MAX, 0]);
        r.push(vec![i32::MAX, 0]);
        let mut suml = vec![0];
        let mut sumr = vec![0];
        for item in &l {
            suml.push(*suml.last().unwrap() + item[1]);
        }
        for item in &r {
            sumr.push(*sumr.last().unwrap() + item[1]);
        }
        res + std::cmp::max(f(&l, &suml, &r, &sumr, k), f(&r, &sumr, &l, &suml, k))
    }
}

fn f(left: &Vec<Vec<i32>>, suml: &Vec<i32>, right: &Vec<Vec<i32>>, sumr: &Vec<i32>, k: i32) -> i32 {
    let mut res = sumr[bs(right, k)];
    for i in 1..left.len() {
        if left[i][0] > k {
            break;
        }
        res = res.max(sumL[i + 1] + sumR[bs(right, k - left[i][0] * 2)]);
    }
    res
}
fn bs(list: &Vec<Vec<i32>>, target: i32) -> usize {
    if target <= 0 {
        0
    } else {
        let mut l = 0;
        let mut r = list.len();
        while l < r {
            let m = (l + r) / 2;
            if list[m][0] > target {
                r = m;
            } else {
                l = m + 1;
            }
        }
        l
    }
}
