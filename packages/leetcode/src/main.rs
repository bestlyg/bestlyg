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
    pub fn maximum_tastiness(mut price: Vec<i32>, k: i32) -> i32 {
        price.sort();
        let n = price.len();
        let mut l = 0;
        let mut r = price[n - 1] - price[0];
        while l < r {
            let m = (l + r + 1) / 2;
            let mut cnt = 1;
            let mut prev = price[0];
            for i in 1..n {
                if price[i] - prev >= m {
                    cnt += 1;
                    prev = price[i];
                }
            }
            if cnt < k {
                r = m - 1;
            } else {
                l = m
            }
        }
        l
    }
}
