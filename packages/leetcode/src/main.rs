mod preclude;

use core::num;

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
    pub fn make_smallest_palindrome(s: String) -> String {
        let mut arr = s.chars().map(|c| c as u8).collect::<Vec<u8>>();
        let n = arr.len();
        for i in 0..n / 2 {
            arr[i] = arr[i].min(arr[n - 1 - i]);
            arr[n - 1 - i] = arr[i];
        }
        String::from_utf8(arr).unwrap()
    }
}
