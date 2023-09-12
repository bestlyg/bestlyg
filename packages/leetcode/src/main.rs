mod preclude;

use core::num;

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
    pub fn check_if_prerequisite(
        num_courses: i32,
        prerequisites: Vec<Vec<i32>>,
        queries: Vec<Vec<i32>>,
    ) -> Vec<bool> {
        use std::collections::{HashMap, HashSet};
        let num_courses = num_courses as usize;
        let mut parr = vec![HashSet::<usize>::new(); num_courses];
        for item in prerequisites {
            let (item1, item2) = (item[0] as usize, item[1] as usize);
            parr[item2].insert(item1);
        }
        let mut m = HashMap::new();
        fn dfs(m: &mut HashMap<usize, HashSet<usize>>, parr: &Vec<HashSet<usize>>, idx: usize) {
            if m.contains_key(&idx) {
                return;
            }
            let mut item = HashSet::new();
            for p in &parr[idx] {
                item.insert(*p);
                dfs(m, parr, *p);
                for p in m.get(p).unwrap() {
                    item.insert(*p);
                }
            }
            m.insert(idx, item);
        }
        for idx in 0..num_courses {
            dfs(&mut m, &parr, idx);
        }
        println!("m = {m:#?}");
        queries
            .into_iter()
            .map(|query| {
                m.get(&(query[1] as usize))
                    .unwrap()
                    .contains(&(query[0] as usize))
            })
            .collect()
    }
}
