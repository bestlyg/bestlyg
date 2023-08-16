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
    pub fn circular_game_losers(n: i32, k: i32) -> Vec<i32> {
        let n = n as usize;
        let k = k as usize;
        let mut list = vec![0; n];
        let mut cur = 0;
        list[cur] += 1;
        for i in 0.. {
            cur = (cur + i * k) % n;
            list[cur] += 1;
            if list[cur] > 1 {
                break;
            }
        }
        (0..n)
            .collect::<Vec<_>>()
            .into_iter()
            .filter(|i| list[*i] == 0)
            .map(|v| v as i32)
            .collect()
    }
}
