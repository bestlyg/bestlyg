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
    pub fn unique_paths_iii(grid: Vec<Vec<i32>>) -> i32 {
        let mut res = 0;
        let n = grid.len();
        let m = grid[0].len();
        let mut start = (0, 0);
        let mut end = (0, 0);
        let mut sum = n * m;
        for i in 0..n {
            for j in 0..m {
                if grid[i][j] == 1 {
                    start = (i, j);
                } else if grid[i][j] == 2 {
                    end = (i, j);
                } else if grid[i][j] == -1 {
                    sum -= 1;
                }
            }
        }
        let mut used: Vec<Vec<bool>> = vec![vec![false; m]; n];
        used[start.0][start.1] = true;
        fn dfs(
            res: &mut i32,
            sum: usize,
            grid: &Vec<Vec<i32>>,
            used: &mut Vec<Vec<bool>>,
            cur: (usize, usize),
            end: (usize, usize),
            cnt: usize,
        ) {
            if cur.0 == end.0 && cur.1 == end.1 {
                if cnt == sum {
                    *res += 1;
                }
            } else {
                for dir in DIRS {
                    let nx = (cur.0 as i32 + dir[0]) as usize;
                    let ny = (cur.1 as i32 + dir[1]) as usize;
                    if 0 <= nx
                        && nx < grid.len()
                        && 0 <= ny
                        && ny < grid[0].len()
                        && grid[nx][ny] != -1
                        && !used[nx][ny]
                    {
                        used[nx][ny] = true;
                        dfs(res, sum, grid, used, (nx, ny), end, cnt + 1);
                        used[nx][ny] = false;
                    }
                }
            }
        }
        dfs(&mut res, sum, &grid, &mut used, start, end, 1);
        res
    }
}
