mod preclude;

use preclude::*;
fn main() {
    println!("Hello, world!");
}

impl Solution {
    pub fn reformat(s: String) -> String {
        let (mut list_num, mut list_char) = (Vec::new(), Vec::new());
        for c in s.chars().collect::<Vec<char>>() {
            if c.is_numeric() {
                list_num.push(c);
            } else {
                list_char.push(c);
            }
        }
        let mut ans = String::new();
        if (list_num.len() as i32 - list_char.len() as i32).abs() > 1 {
            return ans;
        }
        let (mut list1, mut list2) = if list_num.len() > list_char.len() {
            (list_num.into_iter(), list_char.into_iter())
        } else {
            (list_char.into_iter(), list_num.into_iter())
        };
        loop {
            let mut c;
            c = list1.next();
            if c.is_none() {
                break;
            };
            ans.push(c.unwrap());
            c = list2.next();
            if c.is_none() {
                break;
            };
            ans.push(c.unwrap());
        }
        ans
    }
}
