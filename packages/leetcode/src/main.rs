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
    pub fn max_score(card_points: Vec<i32>, k: i32) -> i32 {
        let k = k as usize;
        let n = card_points.len();
        let mut l = card_points[0..k].iter().sum::<i32>();
        let mut r = 0;
        let mut ans = l;
        for i in 0..k {
            r += card_points[n - 1 - i];
            l -= card_points[k - 1 - i];
            ans = ans.max(l + r);
        }
        ans
    }
}
