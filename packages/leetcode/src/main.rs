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
    pub fn pond_sizes(land: Vec<Vec<i32>>) -> Vec<i32> {
        let n = land.len();
        let m = land[0].len();
        let mut used = vec![vec![false; m]; n];
        let mut res = vec![];
        for i in 0..n {
            for j in 0..m {
                if !used[i][j] && land[i][j] == 0 {
                    used[i][j] = true;
                    let mut q = std::collections::VecDeque::<(usize, usize)>::new();
                    let mut cnt = 1;
                    while !q.is_empty() {
                        let (i, j) = q.pop_front().unwrap();
                        for dir in dirs2 {
                            let ni = i as i32 + dir[0];
                            let nj = j as i32 + dir[1];
                            if 0 <= ni
                                && ni < n as i32
                                && 0 <= nj
                                && nj < m as i32
                                && land[ni as usize][nj as usize] == 0
                                && !used[ni as usize][nj as usize]
                            {
                                let ni = ni as usize;
                                let nj = nj as usize;
                                cnt += 1;
                                used[ni][nj] = true;
                                q.push_back((ni, nj));
                            }
                        }
                    }
                    res.push(cnt);
                }
            }
        }
        res.sort();
        res
    }
}
