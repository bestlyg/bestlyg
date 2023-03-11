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
    pub fn find_longest_subarray(array: Vec<String>) -> Vec<String> {
        let (mut cur, mut resMax, mut resIdx) = (0, 0, -1);
        let mut m = std::collections::HashMap::<i32, i32>::new();
        m.insert(0, -1);
        for i in 0..array.len() {
            let s = array[i].chars().collect::<Vec<char>>();
            cur += if s[0].is_alphabetic() { 1 } else { -1 };
            if m.contains_key(&cur) && i as i32 - *m.get(&cur).unwrap() > resMax {
                resIdx = *m.get(&cur).unwrap() + 1;
                resMax = i as i32 - *m.get(&cur).unwrap();
            }
            if !m.contains_key(&cur) {
                m.insert(cur, i as i32);
            }
        }
        let resMax = resMax as usize;
        let resIdx = resIdx as usize;
        println!("{}, {}", resMax, resIdx);
        array[resIdx..resIdx + resMax].to_vec()
    }
}
