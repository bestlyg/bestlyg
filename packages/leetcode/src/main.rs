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
    pub fn is_circular_sentence(sentence: String) -> bool {
        let l = sentence
            .split(' ')
            .into_iter()
            .map(|v| v.as_bytes())
            .collect::<Vec<&[u8]>>();
        for i in 0..l.len() {
            if *l[i].last().unwrap() != l[(i + 1) % l.len()][0] {
                return false;
            }
        }
        true
    }
}
