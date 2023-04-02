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
    pub fn min_score_triangulation(values: Vec<i32>) -> i32 {
        use std::collections::HashMap;
        let mut m: HashMap<usize, HashMap<usize, i32>> = HashMap::new();
        let n = values.len();
        fn dfs(
            m: &mut HashMap<usize, HashMap<usize, i32>>,
            values: &Vec<i32>,
            n: usize,
            start: usize,
            end: usize,
        ) -> i32 {
            if start + 2 > end {
                0
            } else if start + 2 == end {
                values[start] * values[start + 1] * values[end]
            } else if m.contains_key(&start) && m.get(&start).unwrap().contains_key(&end) {
                *m.get(&start).unwrap().get(&end).unwrap()
            } else {
                let mut s = i32::MAX;
                for i in start + 1..end {
                    s = s.min(
                        values[start] * values[end] * values[i]
                            + dfs(m, values, n, start, i)
                            + dfs(m, values, n, i, end),
                    )
                }
                m.entry(start).or_insert(HashMap::new()).insert(end, s);
                s
            }
        }
        dfs(&mut m, &values, n, 0, n - 1)
    }
}
