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
    pub fn count_subgraphs_for_each_diameter(n: i32, edges: Vec<Vec<i32>>) -> Vec<i32> {
        let n = n as usize;
        let mut nodes: Vec<Vec<usize>> = vec![vec![]; n];
        for edge in edges {
            let (n1, n2) = (edge[0] as usize, edge[1] as usize);
            nodes[n1 - 1].push(n2 - 1);
            nodes[n2 - 1].push(n1 - 1);
        }
        let mut res = vec![0; n - 1];
        for i in 1..(1 << n) {
            let i = i as usize;
            let (mut root, mut mask, mut last) = (0, i, 0);
            while ((1 << root) & i) == 0 {
                root += 1;
            }
            let mut q = std::collections::VecDeque::<usize>::new();
            q.push_back(root);
            mask &= !(1 << root);
            while !q.is_empty() {
                let cur = q.pop_front().unwrap();
                last = cur;
                for next in nodes[cur].iter() {
                    if (mask & (1 << next)) != 0 {
                        mask &= !(1 << next);
                        q.push_back(*next);
                    }
                }
            }
            if mask == 0 {
                let d = Solution::dfs(&nodes, last, i & !(1 << last));
                if d >= 1 {
                    res[d - 1] += 1;
                }
            }
        }
        res
    }
    fn dfs(nodes: &Vec<Vec<usize>>, root: usize, mask: usize) -> usize {
        if mask == 0 {
            0
        } else {
            let mut res = 0;
            for next in nodes[root].iter() {
                if (mask & (1 << next)) != 0 {
                    res = res.max(Solution::dfs(nodes, *next, mask & !(1 << *next)) + 1)
                }
            }
            res
        }
    }
}
