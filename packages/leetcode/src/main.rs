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
    pub fn balanced_string(s: String) -> i32 {
        let s = s.chars().collect::<Vec<char>>();
        let n = s.len();
        let m = (n / 4) as i32;
        let mut cnt = [0; 4];
        let id = |c| match c {
            'Q' => 0,
            'W' => 1,
            'E' => 2,
            'R' => 3,
            _ => 0,
        };
        let is_balance = |cnt: &[i32; 4]| cnt[0] <= m && cnt[1] <= m && cnt[2] <= m && cnt[3] <= m;
        for c in s.iter() {
            cnt[id(*c)] += 1;
        }
        if is_balance(&cnt) {
            0
        } else {
            let mut ans = 0x3f3f3f3f;
            let mut l = 0;
            for r in 0..n {
                cnt[id(s[r])] -= 1;
                while l < r && is_balance(&cnt) {
                    cnt[id(s[l])] += 1;
                    if is_balance(&cnt) {
                        l += 1;
                    } else {
                        cnt[id(s[l])] -= 1;
                        break;
                    }
                }
                if is_balance(&cnt) {
                    ans = ans.min(r - l + 1);
                }
            }
            ans as i32
        }
    }
}
