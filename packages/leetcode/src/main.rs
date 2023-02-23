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

use std::collections::HashSet;
impl Solution {
    pub fn circular_permutation(n: i32, start: i32) -> Vec<i32> {
        let n = n as u32;
        let mut ans = vec![0; 2usize.pow(n)];
        ans[0] = start;
        let mut used = HashSet::<i32>::new();
        used.insert(start);
        Solution::dfs(&mut ans, &mut used, n, start, 1);
        ans
    }
    fn dfs(ans: &mut Vec<i32>, used: &mut HashSet<i32>, n: u32, prev: i32, idx: usize) -> bool {
        println!(
            "===\nn = {n}, prev = {prev:b}, idx = {idx}, max = {}",
            2usize.pow(n)
        );
        print!("ans: ");
        for i in 0..2usize.pow(n) {
            print!("{}, ", ans[i]);
        }
        println!("");
        if idx == 2usize.pow(n) {
            Solution::compare(n, *ans.first().unwrap(), *ans.last().unwrap())
        } else {
            for i in 0..n {
                let v = prev & (1 << i);
                let mut next = prev;
                if v == 1 {
                    next &= !(1 << i);
                } else {
                    next |= 1 << i;
                }
                if used.contains(&next) {
                    continue;
                }
                used.insert(next);
                ans[idx] = next;
                if Solution::dfs(ans, used, n, next, idx + 1) {
                    return true;
                }
                used.remove(&next);
            }
            false
        }
    }
    fn compare(n: u32, num1: i32, num2: i32) -> bool {
        let mut cnt = 0;
        for i in 0..n {
            let v1 = num1 & (1 << i);
            let v2 = num2 & (1 << i);
            if v1 != v2 {
                cnt += 1;
            }
        }
        cnt == 1
    }
}
