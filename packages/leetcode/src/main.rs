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
    pub fn count_digits(num: i32) -> i32 {
        let mut res = 0;
        let mut v = num;
        while v > 0 {
            res += if num % (v % 10) == 0 { 1 } else { 0 };
        }
        res
    }
}
