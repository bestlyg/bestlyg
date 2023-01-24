mod preclude;

use std::borrow::Borrow;
use std::borrow::BorrowMut;
use std::char::MAX;

use preclude::*;
fn main() {
    let func = Solution::max_happy_groups;
    let res = func(4, vec![1, 3, 2, 5, 2, 2, 1, 6]);
    println!("res = {res:#?}");
}
impl Solution {
    pub fn count_points(points: Vec<Vec<i32>>, queries: Vec<Vec<i32>>) -> Vec<i32> {
        let d =
            |a: &Vec<i32>, b: &Vec<i32>| (a[0] - b[0]).abs().pow(2) + (a[1] - b[1]).abs().pow(2);
        let ans = vec![0; queries.len()];
        for i in 0..queries.len() {
            for p in points.iter() {
                if d(&queries[i], p) <= queries[i][2].pow(2) {
                    ans[i] += 1;
                }
            }
        }
        ans
    }
}
