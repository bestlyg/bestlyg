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
pub fn str_to_vec(s: &String) -> Vec<char> {
    s.chars().collect()
}
impl Solution {
    pub fn minimum_cost(s: String) -> i64 {
        let mut res = 0i64;
        let s = str_to_vec(&s);
        for i in 1..s.len() {
            if s[i] != s[i - 1] {
                res += min(i, s.len() - i) as i64;
            }
        }
        res
    }
}
