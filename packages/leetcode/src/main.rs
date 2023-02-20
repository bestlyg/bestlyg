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
    pub fn best_hand(ranks: Vec<i32>, suits: Vec<char>) -> String {
        use std::collections::HashMap;
        let mut m = HashMap::<i32, i32>::new();
        for v in suits {
            let v = v as i32;
            let item = m.entry(v).or_insert(0);
            *item += 1;
            if *item == 5 {
                return "Flush".to_string();
            }
        }
        m.clear();
        for v in ranks {
            let item = m.entry(v).or_insert(0);
            *item += 1;
            if *item >= 3 {
                return "Three of a Kind".to_string();
            }
        }
        for (_, v) in m {
            if v >= 2 {
                return "Pair".to_string();
            }
        }
        "High Card".to_string()
    }
}
