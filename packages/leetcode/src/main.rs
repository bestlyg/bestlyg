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
    pub fn minimum_time(n: i32, relations: Vec<Vec<i32>>, time: Vec<i32>) -> i32 {
        use std::collections::HashMap;
        let n = n as usize;
        let mut list = vec![vec![]; n];
        for item in relations {
            let (i0, i1) = (item[0] as usize - 1, item[1] as usize - 1);
            list[i1].push(i0);
        }
        let mut cache = HashMap::<usize, i32>::new();
        fn dfs(
            cache: &mut HashMap<usize, i32>,
            list: &Vec<Vec<usize>>,
            time: &Vec<i32>,
            cur: usize,
        ) -> i32 {
            if cache.contains_key(&cur) {
                *cache.get(&cur).unwrap()
            } else {
                let res = list[cur]
                    .iter()
                    .map(|p| dfs(cache, list, time, *p))
                    .max()
                    .unwrap()
                    + time[cur];
                cache.insert(cur, res);
                res
            }
        }
        (0..n)
            .into_iter()
            .map(|i| dfs(&mut cache, &list, &time, i))
            .max()
            .unwrap()
    }
}
