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
    pub fn num_times_all_blue(flips: Vec<i32>) -> i32 {
        let (mut nmax, mut res) = (0, 0);
        for i in 0..flips.len() {
            nmax = nmax.max(flips[i]);
            if nmax == i + 1 {
                res += 1
            }
        }
        res
    }
}
