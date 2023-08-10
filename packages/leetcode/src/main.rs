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
    pub fn min_falling_path_sum(mut grid: Vec<Vec<i32>>) -> i32 {
        let n = grid.len();
        let mut min1 = 0;
        let mut min2 = 0;
        for row in 1..n {
            min1 = usize::MAX;
            min2 = usize::MAX;
            for j in 0..n {
                if min1 == usize::MAX || grid[row - 1][j] < grid[row - 1][min1] {
                    min2 = min1;
                    min1 = j;
                } else if min2 == usize::MAX || grid[row - 1][j] < grid[row - 1][min2] {
                    min2 = j;
                }
            }
            for j in 0..n {
                grid[row][j] += if j == min1 {
                    grid[row - 1][min2]
                } else {
                    grid[row - 1][min1]
                };
            }
        }
        *grid[n - 1].iter().min().unwrap()
    }
}
