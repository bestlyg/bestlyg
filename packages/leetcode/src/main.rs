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
    pub fn shortest_path_binary_matrix(grid: Vec<Vec<i32>>) -> i32 {
        if grid[0][0] == 1 {
            -1
        } else {
            let mut q = std::collections::VecDeque::<(i32, i32)>::new();
            q.push_back((0, 0));
            let n = grid.len() as i32;
            let mut size = 1;
            let mut step = 1;
            let mut used = vec![vec![false; n as usize]; n as usize];
            while let Some((x, y)) = q.pop_front() {
                if x == n - 1 && y == n - 1 {
                    return step;
                }
                for dir in dirs2 {
                    let nx = x + dir[0];
                    let ny = y + dir[1];
                    if nx >= 0
                        && nx < n
                        && ny >= 0
                        && ny < n
                        && grid[nx as usize][ny as usize] == 0
                        && !used[nx as usize][ny as usize]
                    {
                        used[nx as usize][ny as usize] = true;
                        q.push_back((nx, ny));
                    }
                }
                size -= 1;
                if size == 0 {
                    size = q.len();
                    step += 1;
                }
            }
            -1
        }
    }
}
