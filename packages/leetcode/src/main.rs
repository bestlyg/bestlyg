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
    pub fn max_dist_to_closest(seats: Vec<i32>) -> i32 {
        let mut prev = -1;
        let mut idx = 0;
        let mut res = i32::MIN;
        while idx < seats.len() {
            if seats[idx] == 1 {
                let idx = idx as i32;
                res = res.max(if prev == -1 { idx } else { (idx - prev) / 2 });
                prev = idx;
            }
            idx += 1;
        }
        res = res.max(seats.len() as i32 - 1 - prev);
        res
    }
}
