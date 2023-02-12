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

use std::cell::RefCell;
use std::collections::HashMap;
use std::rc::Rc;
#[derive(Clone)]
struct Node {
    end: bool,
    children: HashMap<String, Node>,
}
impl Node {
    fn new() -> Self {
        Self {
            end: false,
            children: HashMap::new(),
        }
    }
}

impl Solution {
    pub fn alphabet_board_path(target: String) -> String {
        let dirs: [[i32; 2]; 4] = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        let dir_str = "UDLR".chars().collect::<Vec<char>>();
        let l = vec!["abcde", "fghij", "klmno", "pqrst", "uvwxy", "z"]
            .into_iter()
            .map(|s| s.chars().collect::<Vec<char>>())
            .collect::<Vec<Vec<char>>>();
        let mut cache = vec![vec![String::new(); 26]; 26];
        let mut idxs = vec![(0, 0); 26];
        for i in 0..l.len() {
            for j in 0..l[i].len() {
                idxs[l[i][j] as usize - 'a' as usize] = (i, j)
            }
        }
        let mut prebuild = |idx: usize| {
            use std::collections::VecDeque;
            let mut q = VecDeque::<(usize, usize, String)>::new();
            q.push_back((idxs[idx].0, idxs[idx].1, String::new()));
            while !q.is_empty() {
                let (row, col, s) = q.pop_front().unwrap();
                for i in 0..4 {
                    let nrow = row as i32 + dirs[i][0];
                    let ncol = col as i32 + dirs[i][1];
                    if nrow < 0
                        || nrow as usize >= l.len()
                        || ncol < 0
                        || ncol as usize >= l[nrow as usize].len()
                    {
                        continue;
                    }
                    let nrow = nrow as usize;
                    let ncol = ncol as usize;
                    if l[nrow][ncol] as usize - 'a' as usize == idx
                        || cache[idx][l[nrow][ncol] as usize - 'a' as usize] != ""
                    {
                        continue;
                    }
                    let mut next_s = s.clone();
                    next_s.push(dir_str[i]);
                    q.push_back((nrow, ncol, next_s.clone()));
                    cache[idx][l[nrow][ncol] as usize - 'a' as usize] = next_s;
                }
            }
        };
        for i in 0..26 {
            prebuild(i)
        }

        let mut res = String::new();
        let mut prev = 'a';
        for cur in target.chars() {
            res.push_str(&cache[prev as usize - 'a' as usize][cur as usize - 'a' as usize]);
            res.push('!');
            prev = cur
        }
        res
    }
}
