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

fn find(nodes: &Vec<Vec<usize>>, cache: &mut Vec<(i32, i32)>, cur: usize, p: usize) -> (i32, i32) {
    let mut ans: (i32, i32) = (1, 1);
    if !(nodes[cur].len() == 1 && nodes[cur][0] == p) {
        for child in &nodes[cur] {
            if *child != p {
                let res = find(nodes, cache, *child, cur);
                ans.0 += res.0;
                ans.1 += res.0 + res.1;
            }
        }
    }
    cache[cur] = ans;
    ans
}
fn dfs(
    res: &mut Vec<i32>,
    nodes: &Vec<Vec<usize>>,
    cache: &Vec<(i32, i32)>,
    n: usize,
    cur: usize,
    p: usize,
    sum: i32,
) {
    res[cur] = sum + cache[cur].1 - cache[cur].0;
    for child in &nodes[cur] {
        if *child != p {
            dfs(
                res,
                nodes,
                cache,
                n,
                *child,
                cur,
                res[cur] - cache[*child].1 + (n as i32) - cache[*child].0,
            );
        }
    }
}
impl Solution {
    pub fn sum_of_distances_in_tree(n: i32, edges: Vec<Vec<i32>>) -> Vec<i32> {
        let n = n as usize;
        let mut res = vec![0; n];
        let mut nodes = vec![vec![]; n];
        for edge in edges {
            nodes[edge[0] as usize].push(edge[1] as usize);
            nodes[edge[1] as usize].push(edge[0] as usize);
        }
        let mut cache = vec![(0, 0); n];
        find(&nodes, &mut cache, 0, usize::MAX);
        dfs(&mut res, &nodes, &cache, n, 0, usize::MAX, 0);
        res
    }
}
