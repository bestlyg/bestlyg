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

fn check(num: i32) -> bool {
    let s = num.to_string().chars().collect::<Vec<_>>();
    fn dfs(s: &Vec<char>, idx: usize, target: i32) -> bool {
        if idx == s.len() {
            target == 0
        } else {
            for cnt in 1..=(s.len() - idx) {
                let a = &s[idx..idx + cnt];
                if dfs(
                    s,
                    idx + cnt,
                    target - a.iter().collect::<String>().parse::<i32>().unwrap(),
                ) {
                    return true;
                }
            }
            false
        }
    }
    dfs(&s, 0, num)
}

impl Solution {
    pub fn punishment_number(n: i32) -> i32 {
        (1..=n).map(|i| if check(i) { i * i } else { 0 }).sum()
    }
}
