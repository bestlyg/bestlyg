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
    pub fn query_string(s: String, n: i32) -> bool {
        for num in 1..=n {
            let snum = format!("{:b}", num);
            println!("snum:{snum}");
            if !s.contains(&snum) {
                return false;
            }
        }
        true
    }
}
