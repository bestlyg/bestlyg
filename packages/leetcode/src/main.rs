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
    pub fn max_area(h: i32, w: i32, horizontal_cuts: Vec<i32>, vertical_cuts: Vec<i32>) -> i32 {
        let mut horizontal_cuts = horizontal_cuts
            .into_iter()
            .map(|v| v as i64)
            .collect::<Vec<_>>();
        horizontal_cuts.sort();
        horizontal_cuts.insert(0, 0);
        horizontal_cuts.push(h as i64);
        let mut h = 0;
        for i in 1..horizontal_cuts.len() {
            h = h.max(horizontal_cuts[i] - horizontal_cuts[i - 1]);
        }
        let mut vertical_cuts = vertical_cuts
            .into_iter()
            .map(|v| v as i64)
            .collect::<Vec<_>>();
        vertical_cuts.sort();
        vertical_cuts.insert(0, 0);
        vertical_cuts.push(w as i64);
        let mut w = 0;
        for i in 1..vertical_cuts.len() {
            w = w.max(vertical_cuts[i] - vertical_cuts[i - 1]);
        }
        (h * w % (10i64.pow(9) + 7)) as i32
    }
}
