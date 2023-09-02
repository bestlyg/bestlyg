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
    pub fn capture_forts(forts: Vec<i32>) -> i32 {
        let mut res = 0i32;
        let (mut p0, mut p1) = (-1i32, -1i32);
        for i in 0..forts.len() {
            let fort = forts[i];
            if fort == 1 {
                if p0 != -1 && p0 > p1 {
                    res = res.max((i as i32) - 1 - p0);
                }
                p1 = i as i32;
            } else if fort == -1 {
                if p1 != -1 && p1 > p0 {
                    res = res.max((i as i32) - 1 - p1);
                }
                p0 = i as i32;
            }
        }
        res as i32
    }
}
