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
    pub fn find_the_array_conc_val(nums: Vec<i32>) -> i64 {
        let mut i1 = 0;
        let mut i2 = nums.len() - 1;
        let mut res = 0i64;
        while i1 < i2 {
            res += (nums[i1] as i64) * 10i64.pow(nums[i2].to_string().len() as u32)
                + (nums[i2] as i64);
            i1 += 1;
            i2 -= 1;
        }
        if i1 == i2 {
            res += nums[i1] as i64;
        }
        res
    }
}
