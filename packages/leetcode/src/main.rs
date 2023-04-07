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
    pub fn num_moves_stones_ii(mut stones: Vec<i32>) -> Vec<i32> {
        use std::cmp::{max, min};
        let n = stones.len();
        stones.sort();
        if stones[n - 1] - stones[0] + 1 == n as i32 {
            vec![0, 0]
        } else {
            let (mut nmin, nmax) = (
                i32::MAX,
                max(
                    stones[n - 1] - stones[1] - 1 - (n as i32 - 3),
                    stones[n - 2] - stones[0] - 1 - (n as i32 - 3),
                ),
            );
            let (mut l, mut r, mut ec) = (0, 0, 0);
            while r < n {
                while r + 1 < n && n - (r - l + 1) > ec {
                    ec += (stones[r + 1] - stones[r] - 1) as usize;
                    r += 1;
                }
                if r + 1 == n && n - (r - l + 1) > ec {
                    break;
                }
                let cnt = n - (r - l + 1);
                let lc = ec - cnt;
                if cnt == 0 && lc > 0 {
                    nmin = min(nmin, lc as i32);
                }
                // eg: [1,2,4,8]如果lc没了说明刚好放完
                else if lc == 0 {
                    nmin = min(nmin, cnt as i32);
                }
                // eg: [1,2,4]如果lc还剩1个，剩下的1个不能直接放入空位，需要借助另一端的一个制造只剩生
                else if lc == 1 {
                    nmin = min(nmin, cnt as i32 + 2);
                } else {
                    nmin = min(nmin, cnt as i32 + 1);
                }
                ec -= (stones[l + 1] - stones[l] - 1) as usize;
                l += 1;
            }
            vec![nmin, nmax]
        }
    }
}
