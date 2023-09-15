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
    pub fn give_gem(mut gem: Vec<i32>, operations: Vec<Vec<i32>>) -> i32 {
        for item in operations {
            gem[item[1] as usize] += gem[item[0] as usize] / 2;
            gem[item[0] as usize] -= gem[item[0] as usize] / 2;
        }
        *gem.iter().max() - *gem.iter().min()
    }
}
