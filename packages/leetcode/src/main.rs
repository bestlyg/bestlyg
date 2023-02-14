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
    pub fn longest_wpi(hours: Vec<i32>) -> i32 {
        use std::collections::VecDeque;
        let n = hours.len();
        let mut ans = 0;
        let mut sums = vec![0; 1];
        for h in hours {
            let h: i32 = if h > 8 { 1 } else { -1 };
            sums.push(sums.last().unwrap() + h);
        }
        let mut s = VecDeque::<usize>::new();
        s.push_back(0);
        for i in 1..=n {
            if sums[*s.back().unwrap()] > sums[i] {
                println!("push {i}");
                s.push_back(i);
            }
        }
        let mut i = n;
        while i >= 1 {
            while !s.is_empty() && sums[*s.back().unwrap()] < sums[i] {
                println!("pop {}", *s.back().unwrap());
                println!("ans = {}, i = {}", ans, i);
                ans = ans.max(i as i32 - s.pop_back().unwrap() as i32);
            }
            i -= 1;
        }
        ans
    }
}