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

use std::collections::HashMap;
fn dfs(
    m: &mut HashMap<usize, HashMap<usize, (i32, i32)>>,
    arr: &Vec<i32>,
    l: usize,
    r: usize,
) -> (i32, i32) {
    if m.entry(l).or_insert(Default::default()).contains_key(&r) {
        *m.get(&l).unwrap().get(&r).unwrap()
    } else if l == r {
        let res = (arr[l], 0);
        (*m.get_mut(&l).unwrap()).insert(r, res);
        res
    } else {
        let mut res = (arr[r], i32::MAX);
        for i in l..r {
            res.0 = res.0.max(arr[i]);
            let (left, right) = (dfs(m, arr, l, i), dfs(m, arr, i + 1, r));
            let sum = left.0 * right.0 + left.1 + right.1;
            res.1 = res.1.min(sum);
        }
        (*m.get_mut(&l).unwrap()).insert(r, res);
        res
    }
}
impl Solution {
    pub fn mct_from_leaf_values(arr: Vec<i32>) -> i32 {
        let mut m = HashMap::<usize, HashMap<usize, (i32, i32)>>::new();
        dfs(&mut m, &arr, 0, arr.len() - 1).1
    }
}
