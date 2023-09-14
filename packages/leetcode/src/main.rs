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

pub const DIRS2: [[i32; 2]; 8] = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
];

impl Solution {
    pub fn queens_attackthe_king(queens: Vec<Vec<i32>>, king: Vec<i32>) -> Vec<Vec<i32>> {
        let mut board = vec![vec![false; 8]; 8];
        for queen in queens {
            board[queen[0] as usize][queen[0] as usize] = true;
        }
        let mut res = vec![];
        let mut check = |mut pos: Vec<usize>, dir: &[i32]| {
            for _ in 1..8 {
                let x = pos[0] as i32 + dir[0];
                let y = pos[1] as i32 + dir[1];
                if 0 <= x && x < 8 && 0 <= y && y < 8 {
                    if board[x as usize][y as usize] {
                        res.push(vec![x, y]);
                    }
                } else {
                    return;
                }
            }
        };
        for d in &DIRS2 {
            check(king.iter().map(|v| *v as usize).collect(), d);
        }
        res
    }
}
