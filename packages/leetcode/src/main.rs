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
    pub fn average_value(nums: Vec<i32>) -> i32 {
        let (mut sum, mut cnt) = (0, 0);
        for num in nums {
            if num % 6 == 0 {
                sum += num;
                cnt += 1;
            }
        }
        if cnt == 0 {
            0
        } else {
            sum / cnt
        }
    }
}
