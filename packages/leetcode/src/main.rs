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

use std::collections::HashMap;
struct AuthenticationManager {
    timeToLive: i32,
    m: HashMap<String, i32>,
}

/**
 * `&self` means the method takes an immutable reference.
 * If you need a mutable reference, change it to `&mut self` instead.
 */
impl AuthenticationManager {
    fn new(timeToLive: i32) -> Self {
        Self {
            timeToLive,
            m: HashMap::new(),
        }
    }
    fn generate(&self, token_id: String, current_time: i32) {
        if !self.m.contains_key(&token_id) {
            self.m.insert(token_id, current_time);
        } else {
            *self.m.get_mut(&token_id).unwrap() = current_time;
        }
    }

    fn renew(&self, token_id: String, current_time: i32) {
        if self.m.contains_key(&token_id) {
            let item = self.m.get_mut(&token_id).unwrap();
            if current_time - *item >= self.timeToLive {
                self.m.remove(&token_id);
            } else {
                *item = current_time;
            }
        }
    }

    fn count_unexpired_tokens(&self, current_time: i32) -> i32 {
        let mut ans = 0;
        self.m
            .iter()
            .map(|(_, v)| v)
            .filter(|v| current_time - *v < self.timeToLive)
            .collect::<Vec<&i32>>()
            .len() as i32
    }
}
