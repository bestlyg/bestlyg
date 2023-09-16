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
        if n == 1 {
            nums[0]
        } else {
            let mut dp = vec![0; n];
            dp[0] = nums[0];
            dp[1] = nums[1].max(nums[0]);
            for i in 2..n {
                dp[i] = dp[i - 1].max(dp[i - 2] + nums[i]);
            }
            dp.into_iter().max()
        }
    }
}
