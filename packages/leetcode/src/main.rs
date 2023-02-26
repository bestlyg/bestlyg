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
    pub fn minimum_time(grid: Vec<Vec<i32>>) -> i32 {
        let n = grid.len();
        let m = grid[0].len();
        if grid[0][1] > 1 && grid[1][0] > 1 {
            -1
        } else {
            let mut q = std::collections::BinaryHeap::<Node>::new();
            q.push(Node::new(0, 0, 0));
            let cache = [[false; 1005]; 1005];
            cache[0][0] = 1;
            loop {
                let cur = q.pop().unwrap();
                if cur.row == n - 1 && cur.col == m - 1 {
                    return cur.time;
                }
                for dir in dirs {
                    let nrow = cur.row as i32 + dir[0];
                    let ncol = cur.col as i32 + dir[1];
                    if nrow < 0 || nrow >= n as i32 || ncol < 0 || ncol >= m as i32 {
                        continue;
                    }
                    let mut time = cur.time + 1;
                    let nrow = nrow as usize;
                    let ncol = ncol as usize;
                    if grid[nrow][ncol] > time {
                        let minus = (grid[nrow][ncol] - time + 1) / 2;
                        time = cur.time + minus * 2 + 1;
                    }
                    if cache[nrow][ncol] {
                        continue;
                    }
                    cache[nrow][ncol] = true;
                    q.push(Node::new(nrow, ncol, time));
                }
            }
        }
    }
}
