mod preclude;

use std::borrow::Borrow;
use std::borrow::BorrowMut;
use std::char::MAX;

use preclude::*;
fn main() {
    let func = Solution::count_asterisks;
    let res = func("l|*e*et|c**o|*de|".to_string());
    println!("res = {res:#?}");
}
impl Solution {
    pub fn count_asterisks(s: String) -> i32 {
        let list = s.split('|').collect::<Vec<_>>();
        let mut ans = 0;
        for i in 0..list.len() {
            if i % 2 == 0 {
                for c in list[i].chars() {
                    if c == '*' {
                        ans += 1
                    }
                }
            }
        }
        ans
    }
}
