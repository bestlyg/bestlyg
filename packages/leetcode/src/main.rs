mod preclude;

use preclude::*;
fn main() {
    let res = Solution::digit_count("123".to_string());
    println!("res = {res:#?}");
}

impl Solution {
    pub fn digit_count(num: String) -> bool {
        let mut l = [0; 10];
        let n = num.len();
        let num = num.chars().collect::<Vec<char>>();
        for c in num.iter() {
            l[*c as usize - '0' as usize] += 1;
        }
        for i in 0..n {
            if num[i] as usize - '0' as usize != l[i] {
                return false;
            }
        }
        true
    }
}
