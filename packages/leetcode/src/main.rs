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
    pub fn maximum_value(strs: Vec<String>) -> i32 {
        strs.into_iter()
            .map(|s| s.parse().unwrap_or(s.len() as i32))
            .max()
            .unwrap()
    }
}
