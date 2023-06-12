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

struct TreeAncestor {
    list: Vec<Vec<usize>>,
}
impl TreeAncestor {
    fn new(n: i32, parent: Vec<i32>) -> Self {
        let mut list = vec![vec![]; n as usize];
        for i in 1..parent.len() {
            list[i].push(parent[i] as usize);
            let mut res = 1;
            for j in 1.. {
                res = TreeAncestor::_get_kth_ancestor(&list, i as i32, 2i32.pow(j as u32));
                if res != -1 {
                    list[i].push(res as usize);
                } else {
                    break;
                }
            }
        }
        Self { list }
    }
    fn _get_kth_ancestor(list: &Vec<Vec<usize>>, node: i32, k: i32) -> i32 {
        if k == 0 {
            node
        } else {
            let mut l = -1 as i32;
            let mut r = (list[node as usize].len() - 1) as i32;
            while l < r {
                let m = (l + r + 1) / 2;
                if k >= 2i32.pow(m as u32) {
                    l = m;
                } else {
                    r = m - 1;
                }
            }
            if l == -1 {
                l
            } else {
                TreeAncestor::_get_kth_ancestor(list, list[node as usize][l as usize] as i32, k - (2i32.pow(l as u32)))
            }
        }
    }
    fn get_kth_ancestor(&self, node: i32, k: i32) -> i32 {
        TreeAncestor::_get_kth_ancestor(&self.list, node, k)
    }
}
