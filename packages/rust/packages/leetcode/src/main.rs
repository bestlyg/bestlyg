mod preclude;

use preclude::*;
fn main() {}

impl Solution {
    pub fn min_operations(logs: Vec<String>) -> i32 {
        let mut ans = 0_i32;
        for log in logs {
            if log.eq("../") {
                ans = (ans - 1).max(0);
            } else if log.ne("./") {
                ans += 1;
            }
        }
        ans
    }
}
