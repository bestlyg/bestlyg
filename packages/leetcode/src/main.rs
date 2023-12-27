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
    pub fn is_winner(player1: Vec<i32>, player2: Vec<i32>) -> i32 {
        fn getScore(player: &Vec<i32>) -> i32 {
            let mut cur = 0;
            let mut sum = 0;
            for v in player {
                sum += *v + *v * ((cur & 0b11) != 0) as i32;
                cur = cur << 1 | (*v == 10) as i32;
            }
            sum
        }
        let (s1, s2) = (getScore(&player1), getScore(&player2));
        if s1 > s2 {
            1
        } else if s2 > s1 {
            2
        } else {
            0
        }
    }
}
