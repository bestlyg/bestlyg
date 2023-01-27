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
    pub fn greatest_letter(s: String) -> String {
        let s = s.chars().collect::<Vec<char>>();
        let mut ans = 0usize;
        let mut map = [0; 128];
        for c in s {
            map[c as usize] += 1;
            let upper_c = c.to_uppercase().next().unwrap() as usize;
            let lower_c = c.to_lowercase().next().unwrap() as usize;
            if map[upper_c] > 0 && map[lower_c] > 0 && ans < upper_c {
                ans = upper_c;
            }
        }
        if ans == 0 {
            "".to_string()
        } else {
            String::from(ans as u8 as char)
        }
    }
}
