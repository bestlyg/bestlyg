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
    pub fn min_number_of_hours(
        mut initial_energy: i32,
        mut initial_experience: i32,
        energy: Vec<i32>,
        experience: Vec<i32>,
    ) -> i32 {
        let mut res = 0;
        for i in 0..energy.len() {
            if initial_energy <= energy[i] {
                res += energy[i] - initial_energy + 1;
                initial_energy += energy[i] - initial_energy + 1;
            }
            initial_energy -= energy[i];
            if initial_experience <= experience[i] {
                res += experience[i] - initial_experience + 1;
                initial_experience += experience[i] - initial_experience + 1;
            }
            initial_experience += experience[i];
        }
        res
    }
}
