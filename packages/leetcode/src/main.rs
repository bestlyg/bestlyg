mod preclude;

use std::borrow::Borrow;
use std::borrow::BorrowMut;
use std::char::MAX;

use preclude::*;
fn main() {
    let func = Solution::get_smallest_string;
    let res = func(5, 73);
    println!("res = {res:#?}");
}
impl Solution {
    pub fn get_smallest_string(n: i32, k: i32) -> String {
        let mut k = k;
        let mut ans = vec!['a'; n as usize];
        k -= n;
        let mut i = n as usize - 1;
        while k != 0 {
            if k >= 25 {
                ans[i] = 'z';
                k -= 25;
            } else {
                ans[i] = ('a' as i32 + k) as u8 as char;
                k = 0
            }
            i -= 1;
        }
        ans.into_iter().collect::<String>()
    }
}
