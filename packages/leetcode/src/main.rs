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
    pub fn have_conflict(event1: Vec<String>, event2: Vec<String>) -> bool {
        let to_time =
            |s: &String| -> i32 { s[0..2].parse::<i32>().unwrap() * 60 + s[3..].parse::<i32>().unwrap() };
        let (mut s1, mut e1, mut s2, mut e2) = (
            to_time(&event1[0]),
            to_time(&event1[1]),
            to_time(&event2[0]),
            to_time(&event2[1]),
        );
        if s1 > s2 {
            unsafe {
                std::ptr::swap(&mut s1, &mut s2);
                std::ptr::swap(&mut e1, &mut e2);
            }
        }
        e1 >= s2
    }
}
