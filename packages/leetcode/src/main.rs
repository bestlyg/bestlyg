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
    pub fn collect_the_coins(coins: Vec<i32>, edges: Vec<Vec<i32>>) -> i32 {
        let n = coins.len();
        let mut list = vec![vec![]; n];
        let mut cnts = vec![0; n];
        for edge in edges {
            list[edge[0] as usize].push(edge[1]);
            list[edge[1] as usize].push(edge[0]);
            cnts[edge[0] as usize] += 1;
            cnts[edge[1] as usize] += 1;
        }
        let mut cur_edges = n - 1;
        let mut q = std::collections::VecDeque::<usize>::new();
        for i in 0..n {
            if cnts[i] == 1 && coins[i] == 0 {
                q.push_back(i);
            }
        }
        while !q.is_empty() {
            let idx = q.pop_front().unwrap();
            cur_edges -= 1;
            for next in list[idx].iter() {
                let next = *next as usize;
                cnts[next] -= 1;
                if cnts[next] == 1 && coins[next] == 0 {
                    q.push_back(next)
                }
            }
        }
        for i in 0..n {
            if cnts[i] == 1 && coins[i] == 1 {
                q.push_back(i);
            }
        }
        cur_edges -= q.len();
        while !q.is_empty() {
            let idx = q.pop_front().unwrap();
            for next in list[idx].iter() {
                let next = *next as usize;
                cnts[next] -= 1;
                if cnts[next] == 1 {
                    cnts[next] -= 1;
                    cur_edges -= 1;
                }
            }
        }
        0.max(2 * cur_edges as i32 )
    }
}
