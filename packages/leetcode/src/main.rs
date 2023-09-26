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
    pub fn pass_the_pillow(n: i32, mut time: i32) -> i32 {
        let mut cur = 1;
        let mut d = 1;
        while time > 0 {
            cur += d;
            if cur == n || cur == 1 {
                d *= -1;
            }
            time -= 1;
        }
        cur
    }
}
