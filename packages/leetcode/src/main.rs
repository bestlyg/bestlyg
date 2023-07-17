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
    pub fn add_strings(num1: String, num2: String) -> String {
        let mut num1 = str_to_vec(&num1);
        let mut num2 = str_to_vec(&num2);
        num1.reverse();
        num2.reverse();
        if num1.len() < num2.len() {
            std::mem::swap(&mut num1, &mut num2);
        }
        let mut res = vec![];
        let mut i = 0;
        let mut add = 0;
        while i < num1.len() || i < num2.len() {
            let mut num = num1[i].to_digit(10).unwrap() as u8 + add;
            if i < num2.len() {
                num += num2[i].to_digit(10).unwrap() as u8;
            }
            if num >= 10 {
                num -= 10;
                add = 1;
            } else {
                add = 0;
            }
            res.push(num);
            i += 1;
        }
        String::from_utf8(res).unwrap()
    }
}
