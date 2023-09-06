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
    pub fn repair_cars(ranks: Vec<i32>, cars: i32) -> i64 {
        let mut l = 0;
        let mut r = i64::MAX;
        while l < r {
            let m = (r - l) / 2 + l;
            if ranks
                .iter()
                .map(|rank| (m as f64 / rank as f64).sqrt().floor() as i64)
                >= cars
            {
                r = m;
            } else {
                l = m + 1;
            }
        }
        l
    }
}
