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
    pub fn trap(height: Vec<i32>) -> i32 {
        let mut sum = 0;
        let n = height.len();
        let mut cur = 0;
        let mut r = vec![0; n];
        for i in (0..n).rev() {
            r[i] = cur;
            cur = cur.max(height[i]);
        }
        cur = 0;
        for i in 0..n {
            cur = cur.max(height[i]);
            sum += 0.max(cur.min(r[i]) - height[i]);
        }
        sum
    }
}
