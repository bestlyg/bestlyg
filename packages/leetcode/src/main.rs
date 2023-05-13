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
    pub fn find_max_k(nums: Vec<i32>) -> i32 {
        let mut list = [0; 2005];
        let mut res = -1;
        for num in nums {
            list[(num + 1000) as usize] += 1;
            if list[(-num + 1000) as usize] != 0 {
                res = res.max(num.abs());
            }
        }
        res
    }
}
