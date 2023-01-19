mod preclude;

use std::borrow::Borrow;
use std::borrow::BorrowMut;
use std::char::MAX;

use preclude::*;
fn main() {
    let func = Solution::strong_password_checker_ii;
    let res = func("IloveLe3tcode!".to_string());
    println!("res = {res:#?}");
}

impl Solution {
    pub fn strong_password_checker_ii(password: String) -> bool {
        let spec = "!@#$%^&*()-+";
        let s = password.chars().collect::<Vec<char>>();
        let mut f = [false; 4];
        for i in 0..s.len() {
            if s[i].is_lowercase() {
                f[0] = true;
            }
            if s[i].is_uppercase() {
                f[1] = true;
            }
            if s[i].is_digit(10) {
                f[2] = true;
            }
            if spec.contains(s[i]) {
                f[3] = true;
            }
            if i > 0 && s[i] == s[i - 1] {
                return false;
            }
        }
        s.len() >= 8 && f[0] && f[1] && f[2] && f[3]
    }
}
