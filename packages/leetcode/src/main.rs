mod preclude;

use std::borrow::Borrow;
use std::borrow::BorrowMut;
use std::char::MAX;

use preclude::*;
fn main() {
    let func = Solution::merge_in_between;
    // let res = func(55);
    // println!("res = {res:#?}");
}

impl Solution {
    pub fn decode_message(key: String, message: String) -> String {
        let message = message.chars().collect::<Vec<char>>();
        let key = key.chars().collect::<Vec<char>>();
        let mut list = ['\0'; 26];
        let mut ans = String::new();
        let mut p = 'a';
        for c in key {
            let i = c as usize - 'a' as usize;
            if c != ' ' && list[i] == '\0' {
                list[i] = p;
                p = (p as u8 + 1) as char;
            }
        }
        for c in message {
            if c == ' ' {
                ans.push(' ');
            } else {
                ans.push(list[c as usize - 'a' as usize]);
            }
        }
        ans
    }
}
