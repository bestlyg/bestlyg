mod preclude;

use core::num;

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

impl Solution {
    pub fn min_count(coins: Vec<i32>) -> i32 {
        coins
            .into_iter()
            .map(|coin| (coin as f64 / 2.0).ceil().into())
            .sum()
    }
}
