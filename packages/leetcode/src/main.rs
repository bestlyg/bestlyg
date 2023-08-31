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
    pub fn min_trio_degree(n: i32, edges: Vec<Vec<i32>>) -> i32 {
        let n = n as usize;
        let mut nodes = vec![std::collections::HashSet::new(); n];
        for edge in edges {
            let (n0, n1) = (edge[0] as usize - 1, edge[1] as usize - 1);
            nodes[n0].insert(n1);
            nodes[n1].insert(n0);
        }
        let mut res = i32::MAX;
        unsafe {
            for i in 0..n {
                for j in i + 1..n {
                    if nodes.get_unchecked(i).contains(&j) {
                        for k in j + 1..n {
                            if nodes.get_unchecked(i).contains(&k)
                                && nodes.get_unchecked(j).contains(&k)
                            {
                                res = res.min(
                                    (nodes.get_unchecked(i).len()
                                        + nodes.get_unchecked(j).len()
                                        + nodes.get_unchecked(k).len()
                                        - 6) as i32,
                                )
                            }
                        }
                    }
                }
            }
        }
        if res == i32::MAX {
            -1
        } else {
            res
        }
    }
}
