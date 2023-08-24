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
    pub fn count_servers(grid: Vec<Vec<i32>>) -> i32 {
        let n = grid.len();
        let m = grid[0].len();
        let mmap = vec![vec![false; m]; n];
        let mut prev = (usize::MAX, usize::MAX);
        for i in 0..n {
            prev = (usize::MAX, usize::MAX);
            for j in 0..m {
                if grid[i][j] == 1 {
                    if prev.0 == usize::MAX {
                        prev = (i, j);
                    } else {
                        mmap[prev.0][prev.1] = true;
                        mmap[i][j] = true;
                    }
                }
            }
        }
        for j in 0..m {
            prev = (usize::MAX, usize::MAX);
            for i in 0..n {
                if grid[i][j] == 1 {
                    if prev.0 == usize::MAX {
                        prev = (i, j);
                    } else {
                        mmap[prev.0][prev.1] = true;
                        mmap[i][j] = true;
                    }
                }
            }
        }
        let mut res = 0;
        for i in 0..n {
            for j in 0..m {
                if mmap[i][j] {
                    res += 1;
                }
            }
        }
        res
    }
}
