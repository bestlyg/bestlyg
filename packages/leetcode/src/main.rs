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

fn dfs(nodes: &Vec<Vec<usize>>, used: &mut Vec<bool>, target: usize, cur: usize, t: i32) -> f64 {
    let mut sum: f64 = 0.0;
    for next in &nodes[cur] {
        if !used[*next] {
            sum += 1.0;
        }
    }
    if cur == target || t == 0 {
        if cur == target && (t == 0 || sum == 0.0) {
            1.0
        } else {
            0.0
        }
    } else {
        for next in &nodes[cur] {
            if !used[*next] {
                used[*next] = true;
                let res = dfs(nodes, used, target, *next, t - 1);
                used[*next] = false;
                if res != 0.0 {
                    return res / sum;
                }
            }
        }
        0.0
    }
}

impl Solution {
    pub fn frog_position(n: i32, edges: Vec<Vec<i32>>, t: i32, target: i32) -> f64 {
        let n = n as usize;
        let mut nodes: Vec<Vec<usize>> = vec![vec![]; n + 1];
        for e in edges {
            let (e0, e1) = (e[0] as usize, e[1] as usize);
            nodes[e0].push(e1);
            nodes[e1].push(e0);
        }
        let mut used = vec![false; n + 1];
        used[1] = true;
        dfs(&nodes, &mut used, target as usize, 1, t)
    }
}
