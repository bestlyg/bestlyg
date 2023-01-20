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
    pub fn finding_users_active_minutes(logs: Vec<Vec<i32>>, k: i32) -> Vec<i32> {
        use std::collections::{HashMap, HashSet};
        let mut ans = vec![0; k as usize];
        let mut m = HashMap::<i32, HashSet<i32>>::new();
        for log in logs {
            let s = m.entry(log[0]).or_insert(HashSet::new());
            s.insert(log[1]);
        }
        for (_, v) in m {
            ans[v.len() - 1] += 1;
        }
        ans
    }
}
