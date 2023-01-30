mod preclude;

use std::borrow::Borrow;
use std::borrow::BorrowMut;
use std::char::MAX;

use preclude::*;
fn main() {
    let func = Solution::put_marbles;
    let res = func(55);
    println!("res = {res:#?}");
}

impl Solution {
    pub fn put_marbles(weights: Vec<i32>, k: i32) -> i64 {
        let mut list = Vec::new();
        for i in 1..weights.len() {
            list.push(weights[i - 1] + weights[i]);
        }
        list.sort();
        let fold = |sum, cur: &i32| sum + (*cur) as i64;
        list[list.len() - k as usize + 1..].iter().fold(0, fold)
            - list[..k as usize - 1].iter().fold(0, fold)
    }
}
