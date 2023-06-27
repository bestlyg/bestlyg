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
    pub fn maximum_sum(arr: Vec<i32>) -> i32 {
        use std::cmp::max;
        let (mut dp0, mut dp1, mut res) = (-0x3f3f3f3f, -0x3f3f3f3f, -0x3f3f3f3f);
        for num in arr {
            dp1 = max(dp0, dp1 + num);
            dp0 = max(dp0, 0) + num;
            res = max(res, max(dp0, dp1));
        }
        res
    }
}
