mod preclude;

use std::borrow::Borrow;
use std::borrow::BorrowMut;
use std::char::MAX;
use std::hash::Hash;

use preclude::*;
fn main() {
    let func = Solution::remove_subfolders;
    let res = func(
        vec!["/a", "/a/b", "/c/d", "/c/d/e", "/c/f"]
            .into_iter()
            .map(|v| v.to_string())
            .collect(),
    );
    println!("res = {res:#?}");
}

use std::cell::RefCell;
use std::rc::Rc;
use std::collections::HashMap;
#[derive(Clone)]
struct Node {
    end: bool,
    children: HashMap<String, Node>,
}
impl Node {
    fn new() -> Self {
        Self {
            end: false,
            children: HashMap::new(),
        }
    }
}

impl Solution {
    pub fn remove_subfolders(folder: Vec<String>) -> Vec<String> {
        let mut folder = folder;
        folder.sort();
        let mut root = Node::new();
        let mut ans = vec![];
        for path in folder {
            println!("===\npath: {path}");
            let mut next = &mut root;
            let l: Vec<&str> = path.split("/").collect();
            for i in 1..l.len() {
                println!("next: {}", l[i]);
                if !next.children.contains_key(l[i]) {
                    next.children.insert(l[i].to_string(), Node::new());
                }
                next = next.children.get_mut(l[i]).unwrap();
                if next.end {
                    break;
                }
            }
            if !next.end {
                ans.push(path);
            }
            next.end = true;
        }
        ans
    }
}
