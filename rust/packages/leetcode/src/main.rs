mod preclude;
use rand::Rng;

use preclude::*;
fn main() {
    let res = Solution::crack_safe(2, 2);
    println!("res = {res:#?}");
}

use std::collections::HashSet;
impl Solution {
    pub fn crack_safe(n: i32, k: i32) -> String {
        let mut visit = HashSet::<String>::new();
        let cur = String::from_iter(vec!['0'; n as usize]);
        visit.insert(cur.clone());
        Solution::dfs(n, k, &mut visit, cur).1
    }
    fn dfs<'a>(n: i32, k: i32, visit: &mut HashSet<String>, cur: String) -> (bool, String) {
        if visit.len() == k.pow(n as u32) as usize {
            (true, cur)
        } else {
            let pre = &cur[(cur.len() as i32 - n + 1) as usize..cur.len()];
            for i in 0..k {
                let mut next = String::from(pre);
                next.push(char::from(i as u8 + '0' as u8));
                if visit.contains(&next) {
                    continue;
                }
                visit.insert(next.clone());
                let mut cur = cur.clone();
                cur.push(char::from(i as u8 + '0' as u8));
                let res = Solution::dfs(n, k, visit, cur);
                if res.0 {
                    return res;
                }
                visit.remove(&next);
            }

            (false, "".to_string())
        }
    }
}
