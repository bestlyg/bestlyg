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
    pub fn find_replace_string(
        mut s: String,
        indices: Vec<i32>,
        sources: Vec<String>,
        targets: Vec<String>,
    ) -> String {
        let indices = indices.into_iter().map(|i| i as usize).collect::<Vec<_>>();
        let n = indices.len();
        let mut idxs = (0..n).collect::<Vec<_>>();
        idxs.sort_by_key(|i| indices[*i]);
        idxs.reverse();
        for i in idxs {
                println!("=\n{i}");
            if indices[i] + sources[i].len() < s.len() && s[indices[i]..indices[i] + sources[i].len()] == sources[i] {
                println!("in , {i}");
                let mut ns = String::new();
                println!("{}|{}|{}",&s[0..indices[i]], &targets[i], &s[indices[i] + sources[i].len()..]);
                ns.push_str(&s[0..indices[i]]);
                ns.push_str(&targets[i]);
                ns.push_str(&s[indices[i] + sources[i].len()..]);
                s = ns;
            }
        }
        s
    }
}
