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
    pub fn remove_comments(source: Vec<String>) -> Vec<String> {
        let mut res = vec![];
        let mut check = false;
        let mut s = String::new();
        for line in source {
            let line = str_to_vec(&line);
            let mut i = 0;
            while i < line.len() {
                if line[i] == '*' && i + 1 < line.len() && line[i + 1] == '/' && check {
                    check = false;
                    i += 1
                } else if check {
                } else if line[i] == '/' && i + 1 < line.len() && line[i + 1] == '*' {
                    check = true;
                    i += 1;
                } else if line[i] == '/' && i + 1 < line.len() && line[i + 1] == '/' {
                    break;
                } else {
                    s.push(line[i]);
                }
                i += 1;
            }
            if !check && !s.is_empty() {
                res.push(s.clone());
                s = String::new();
            }
        }
        res
    }
}
