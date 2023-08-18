mod preclude;

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
    pub fn max_size_slices(slices: Vec<i32>) -> i32 {
        use std::cmp::max;
        let m = slices.len() / 3;
        let check = |nums: &[i32]| -> i32 {
            let n = nums.len();
            let mut dp = vec![vec![0; m + 1]; n + 1];
            for i in 1..=n {
                for j in 1..m {
                    dp[i][j] = max(dp[i - 1][j], nums[i - 1]);
                    if i >= 2 {
                        dp[i][j] = max(dp[i][j], dp[i - 2][j - 1] + nums[i - 1])
                    }
                }
            }
            dp[n][m]
        };
        max(check(&slices[1..]), check(&slices[0..m - 1]))
    }
}
