mod preclude;

use std::borrow::Borrow;
use std::borrow::BorrowMut;
use std::char::MAX;
use std::hash::Hash;

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

use std::cell::RefCell;
use std::collections::HashMap;
use std::rc::Rc;
#[derive(Clone, PartialEq, Eq, Ord)]
struct Node {
    x: i32,
    y: i32,
}
impl Node {
    fn new(x: i32, y: i32) -> Self {
        Node { x, y }
    }
    fn val(&self) -> f64 {
        (self.x + 1) as f64 / (self.y + 1) as f64 - self.x as f64 / self.y as f64
    }
}
impl PartialOrd for Node {
    fn partial_cmp(&self, o: &Self) -> Option<std::cmp::Ordering> {
        self.val().partial_cmp(&o.val())
    }
}
impl Solution {
    pub fn find_the_string(lcp: Vec<Vec<i32>>) -> String {
        let n = lcp.len();
        let mut list = vec!['\0'; n];
        let mut c = 'a';
        let mut i = 0;
        while (c as u8) <= ('z' as u8) {
            while i < n && list[i] != '\0' {
                i += 1;
            }
            if i == n {
                break;
            }
            for j in i..n {
                if lcp[i][j] != 0 {
                    list[j] = c;
                }
            }
            c = ((c as u8) + 1) as char;
        }
        if list.contains(&'\0') {
            String::new()
        } else {
            for i in (0..n).rev() {
                for j in (0..n).rev() {
                    if list[i] == list[j] {
                        if i == n - 1 || j == n - 1 {
                            if lcp[i][j] != 1 {
                                return String::new();
                            }
                        } else if lcp[i][j] != lcp[i + 1][j + 1] + 1 {
                            return String::new();
                        }
                    } else if lcp[i][j] != 0 {
                        return String::new();
                    }
                }
            }
            String::from_utf8(list.into_iter().map(|c| c as u8).collect::<Vec<u8>>()).unwrap()
        }
    }
}
