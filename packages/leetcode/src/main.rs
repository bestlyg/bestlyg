mod preclude;

use std::char::MAX;

use preclude::*;
fn main() {
    let func = Solution::max_output;
    let res = func(
        6,
        vec![vec![0, 1], vec![1, 2], vec![1, 3], vec![3, 4], vec![3, 5]],
        vec![9, 8, 7, 6, 10, 5],
    );
    println!("res = {res:#?}");
}

impl Solution {
    pub fn max_output(n: i32, edges: Vec<Vec<i32>>, price: Vec<i32>) -> i64 {
        let n = n as usize;
        let mut nodes: Vec<Vec<i32>> = vec![vec![]; n];
        for e in edges {
            nodes[e[0] as usize].push(e[1]);
            nodes[e[1] as usize].push(e[0]);
        }
        Solution::dfs(&nodes, &price, &mut 0, 0, -1).0
    }
    fn dfs(
        nodes: &Vec<Vec<i32>>,
        price: &Vec<i32>,
        ans: &mut i64,
        cur: i32,
        parent: i32,
    ) -> (i64, i64, i64) {
        let p = price[cur as usize] as i64;
        let mut max1 = p;
        let mut max2 = 0;
        for child in (*nodes)[cur as usize].iter() {
            if *child != parent {
                let (_, res_max1, res_max2) = Solution::dfs(nodes, price, ans, *child, cur);
                *ans = *ans.max(&mut (res_max1 + max2)).max(&mut (res_max2 + max1));
                max1 = max1.max(res_max1 + p);
                max2 = max2.max(res_max2 + p);
            }
        }
        (*ans, max1, max2)
    }
}
