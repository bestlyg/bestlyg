mod preclude;

use std::char::MAX;

use preclude::*;
fn main() {
    let res =
        Solution::rearrange_characters("ilovecodingonleetcode".to_string(), "code".to_string());
    println!("res = {res:#?}");
}

impl Solution {
    pub fn rearrange_characters(s: String, target: String) -> i32 {
        let mut ans = i32::MAX;
        let (mut l1, mut l2) = ([0; 26], [0; 26]);
        s.chars().for_each(|c| {
            l1[c as usize - 'a' as usize] += 1;
        });
        target.chars().for_each(|c| {
            l2[c as usize - 'a' as usize] += 1;
        });
        for i in 0..26 {
            if l2[i] != 0 {
                ans = ans.min(l1[i] / l2[i]);
            }
        }
        ans
    }
}
