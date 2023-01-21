mod preclude;

use std::borrow::Borrow;
use std::borrow::BorrowMut;
use std::char::MAX;

use preclude::*;
fn main() {
    let func = Solution::strong_password_checker_ii;
    let res = func("IloveLe3tcode!".to_string());
    println!("res = {res:#?}");
}

impl Solution {
    pub fn min_side_jumps(obstacles: Vec<i32>) -> i32 {
        let n = obstacles.len();
        let mut dp = vec![vec![0x3f3f3f3f; 4]; n];
        dp[0][1] = 1;
        dp[0][2] = 0;
        dp[0][3] = 1;
        for i in 1..n {
            if obstacles[i] != 1 {
                dp[i][1] = dp[i - 1][1];
            }
            if obstacles[i] != 2 {
                dp[i][2] = dp[i - 1][2];
            }
            if obstacles[i] != 3 {
                dp[i][3] = dp[i - 1][3];
            }
            if obstacles[i - 1] == 1 {
                dp[i][1] = dp[i][2].min(dp[i][3]) + 1;
            }
            if obstacles[i - 1] == 2 {
                dp[i][2] = dp[i][1].min(dp[i][3]) + 1;
            }
            if obstacles[i - 1] == 3 {
                dp[i][3] = dp[i][1].min(dp[i][2]) + 1;
            }
        }
        dp[n - 1][1].min(dp[n - 1][2]).min(dp[n - 1][3])
    }
}
