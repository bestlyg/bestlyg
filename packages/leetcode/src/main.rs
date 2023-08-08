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
    pub fn max_absolute_sum(nums: Vec<i32>) -> i32 {
        let (mut nmin, mut nmax, mut res) = (0, 0, 0);
        for num in nums {
            nmin = num.min(nmin + num);
            nmax = 0.max(nmax + num);
            res = res.max(nmin.abs()).max(nmax.abs())
        }
        res
    }
}
