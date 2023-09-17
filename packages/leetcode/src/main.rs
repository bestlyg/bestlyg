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
    pub fn rob(nums: Vec<i32>) -> i32 {
        let n = nums.len();
        let mut dp = vec![vec![0; 2]; n];
        dp[1][1] = nums[0];
        let mut res = nums[0];
        for i in 2..n + 1 {
            dp[i][0] = dp[i - 1][0].max(dp[i - 2][0] + nums[i - 1]);
            if i != n {
                dp[i][1] = dp[i - 1][1].max(dp[i - 2][1] + nums[i - 1]);
            }
            res = res.max(dp[i][0].max(dp[i][1]))
        }
        res
    }
}
