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
    pub fn delete_greatest_value(mut grid: Vec<Vec<i32>>) -> i32 {
        for row in &mut grid {
            row.sort();
        }
        let mut res = 0;
        for j in 0..grid[0].len() {
            let mut num = i32::MIN;
            for i in 0..grid.len() {
                num = num.max(grid[i][j]);
            }
            res += num;
        }
        res
    }
}
