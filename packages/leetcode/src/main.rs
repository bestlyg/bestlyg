mod preclude;

use std::borrow::Borrow;
use std::borrow::BorrowMut;
use std::char::MAX;

use preclude::*;
fn main() {
    let func = Solution::shortest_alternating_paths;
    let res = func(3, vec![vec![0, 1], vec![0, 2]], vec![vec![1, 0]]);
    println!("res = {res:#?}");
}

#[derive(Clone)]
struct Node {
    next: Vec<Vec<i32>>,
}
impl Node {
    fn new() -> Self {
        Self {
            next: vec![vec![]; 2],
        }
    }
}

impl Solution {
    pub fn shortest_alternating_paths(
        n: i32,
        red_edges: Vec<Vec<i32>>,
        blue_edges: Vec<Vec<i32>>,
    ) -> Vec<i32> {
        let n = n as usize;
        let mut ans = vec![-1; n];
        ans[0] = 0;
        let mut cache = vec![vec![false; n]; 2];
        let mut list = vec![Node::new(); n];
        for item in red_edges {
            list[item[0] as usize].next[0].push(item[1]);
        }
        for item in blue_edges {
            list[item[0] as usize].next[1].push(item[1]);
        }
        use std::collections::VecDeque;
        let mut q = VecDeque::<(usize, usize)>::new();
        q.push_back((0, 2));
        let (mut l, mut size) = (0, 1);
        while !q.is_empty() {
            let (node, color) = q.pop_front().unwrap();
            for i in 0..2 {
                if color == i {
                    continue;
                }
                for next in list[node].next[i].iter() {
                    let next = *next as usize;
                    if cache[i][next] {
                        continue;
                    }
                    cache[i][next] = true;
                    if ans[next] == -1 {
                        ans[next] = l + 1;
                    }
                    q.push_back((next, i));
                }
            }
            size -= 1;
            if size == 0 {
                size = q.len();
                l += 1
            }
        }
        ans
    }
}
