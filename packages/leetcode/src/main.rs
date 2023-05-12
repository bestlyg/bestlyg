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
    pub fn max_value_after_reverse(nums: Vec<i32>) -> i32 {
        use std::cmp::{max, min};
        let n = nums.len();
        let mut sums = 0;
        let mut nmax = i32::MIN;
        let mut nmin = i32::MAX;
        let mut val = 0;
        for i in 1..n {
            let num = (nums[i] - nums[i - 1]).abs();
            sums += num;
            nmax = max(nmax, min(nums[i], nums[i - 1]));
            nmin = min(nmin, max(nums[i], nums[i - 1]));
            val = max(
                val,
                max((nums[i] - nums[0]).abs(), (nums[i - 1] - nums[n - 1]).abs()) - num,
            );
        }
        sums + max(val, 2 * (nmax - nmin))
    }
}
