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
    pub fn max_satisfaction(mut satisfaction: Vec<i32>) -> i32 {
        satisfaction.sort();
        let m = satisfaction.len();
        let mut res = 0;
        let mut nsum = 0;
        let mut vsum = 0;
        for i in 0..n {
            nsum += (i as i32 + 1) * satisfaction[i];
            vsum += satisfaction[i]
        }
        res = res.max(nsum);
        for i in 1..n {
            if satisfaction[i] >= 0 {
                break;
            }
            nsum -= vsum;
            vsum -= satisfaction[i - 1];
            res = res.max(nsum);
        }
        res
    }
}
