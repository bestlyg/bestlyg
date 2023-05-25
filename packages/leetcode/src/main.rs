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
    pub fn odd_string(words: Vec<String>) -> String {
        let mut m = std::collections::HashMap::<String, Vec<String>>::new();
        for w in words {
            let mut key = String::new();
            {
                let w: Vec<char> = str_to_vec(&w);
                for i in 0..w.len() - 1 {
                    // key.push(
                    // w[]
                    // )
                    key.push((w[i + 1] as u8 - w[i] as u8 + b'0') as char);
                }
            }
            m.entry(key).or_insert(vec![]).push(w);
        }
        for (_, list) in m.into_iter() {
            if list.len() == 1 {
                return list[0].clone();
            }
        }
        String::new()
    }
}
