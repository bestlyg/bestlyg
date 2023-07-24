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
    pub fn num_jewels_in_stones(jewels: String, stones: String) -> i32 {
        let mut list = [false; 200];
        for c in jewels.bytes() {
            list[c as usize] = true;
        }
        stones
            .bytes()
            .into_iter()
            .filter(|c| list[*c as usize])
            .collect::<Vec<_>>()
            .len() as i32
    }
}
